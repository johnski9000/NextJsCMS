import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionCancel(event.data.object as Stripe.Subscription);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Get the associated user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (error || !user) {
    console.error("User not found for Stripe customer ID:", customerId);
    return;
  }

  // Update the user's subscription details in Supabase
  const { error: updateError } = await supabase.from("subscriptions").upsert(
    [
      {
        user_id: user.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        current_period_end: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
      },
    ],
    { onConflict: ["user_id"] }
  );

  if (updateError) {
    console.error("Failed to update subscription in Supabase:", updateError);
  }
}

async function handleSubscriptionCancel(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find the associated user
  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (error || !user) {
    console.error("User not found for Stripe customer ID:", customerId);
    return;
  }

  // Mark the subscription as canceled in Supabase
  const { error: updateError } = await supabase
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Failed to cancel subscription in Supabase:", updateError);
  }
}
