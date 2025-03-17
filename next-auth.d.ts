import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
    };
    stripeCustomerId?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    stripe_customer_id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    stripeCustomerId?: string;
  }
}
