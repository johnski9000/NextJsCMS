import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { stripeCustomerId } = await req.json();

  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "Missing Stripe Customer ID" },
      { status: 400 }
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard/subscriptions`,
  });

  return NextResponse.json({ url: session.url });
}
