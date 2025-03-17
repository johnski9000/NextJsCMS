// auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Sign in user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          throw new Error(error?.message || "Authentication failed");
        }

        let stripeCustomerId = data.user.user_metadata?.stripe_customer_id;

        // If no Stripe customer exists, create one
        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: credentials.email,
            metadata: { supabase_user_id: data.user.id },
          });
          stripeCustomerId = customer.id;

          // Store Stripe customer ID in Supabase user metadata
          await supabase.auth.admin.updateUserById(data.user.id, {
            user_metadata: { stripe_customer_id: stripeCustomerId },
          });
        }

        // Populate the `users` table if not already there
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", data.user.id)
          .single();

        if (!existingUser) {
          await supabase.from("users").insert([
            {
              id: data.user.id,
              email: data.user.email,
              name:
                data.user.user_metadata?.name ||
                credentials.email.split("@")[0],
              stripe_customer_id: stripeCustomerId,
              created_at: new Date().toISOString(),
            },
          ]);
        }

        // Ensure the `subscriptions` entry exists (Webhook updates details later)
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", data.user.id)
          .single();

        if (!existingSubscription) {
          await supabase.from("subscriptions").insert([
            {
              user_id: data.user.id,
              stripe_subscription_id: null, // Will be updated by webhook
              status: "inactive",
              created_at: new Date().toISOString(),
            },
          ]);
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name:
            data.user.user_metadata?.name || credentials.email.split("@")[0],
          stripe_customer_id: stripeCustomerId,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.stripeCustomerId = user.stripe_customer_id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string | null,
      };
      session.stripeCustomerId = token.stripeCustomerId as string;
      return session;
    },
  },
};
