// auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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

        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          throw new Error(error?.message || "Authentication failed");
        }

        // Return user object for NextAuth
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || null,
          stripe_customer_id:
            data.user.user_metadata?.stripe_customer_id || null, // If stored in user_metadata
        };
      },
    }),
  ],
  // Remove the adapter since we're using Supabase Auth directly
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      // Populate token with user data on initial sign-in
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        // Handle Stripe customer ID
        let stripeCustomerId = user.stripe_customer_id;
        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: { supabase_user_id: user.id },
          });
          stripeCustomerId = customer.id;

          // Update Supabase user_metadata with Stripe customer ID
          await supabase.auth.updateUser({
            data: { stripe_customer_id: stripeCustomerId },
          });
        }
        token.stripeCustomerId = stripeCustomerId;
      }

      // For OAuth providers, link account to Supabase Auth
      if (account && account.provider === "google") {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            access_token: account.access_token,
          },
        });

        if (error || !data.user) {
          console.error("Failed to link Google account:", error?.message);
        } else {
          token.user = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || null,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.stripeCustomerId = token.stripeCustomerId;
      }

      // Generate Supabase JWT for client-side use
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret && token.user?.id) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.user.id,
          email: token.user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
