import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`✅ Received Stripe event: ${event.type}`);

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionCancel(event.data.object as Stripe.Subscription);
      break;
    default:
      console.warn(`⚠️ Unhandled Stripe event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

/**
 * Handles subscription creation and updates.
 * Ensures Supabase syncs with Stripe subscription data.
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  console.log(`🔄 Handling subscription update for customer: ${customerId}`);

  // Get the associated user from Supabase
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (userError || !user) {
    console.error("❌ User not found in Supabase for customer ID:", customerId);
    return;
  }

  // Ensure correct plan selection
  const priceId = subscription.items.data[0]?.price.id;
  const status = subscription.status;
  const currentPeriodEnd = new Date(
    subscription.current_period_end * 1000
  ).toISOString();

  console.log(
    `📌 Updating subscription: ${subscription.id}, Status: ${status}`
  );

  // Check if subscription already exists
  const { data: existingSubscription, error: fetchError } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", subscription.id)
    .single();

  if (fetchError) {
    console.error("⚠️ Error fetching subscription:", fetchError);
  }

  if (existingSubscription) {
    // ✅ Update existing subscription
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        status,
        price_id: priceId,
        current_period_end: currentPeriodEnd,
      })
      .eq("stripe_subscription_id", subscription.id);

    if (updateError) {
      console.error(
        "❌ Failed to update subscription in Supabase:",
        updateError
      );
    } else {
      console.log("✅ Subscription successfully updated in Supabase");
    }
  } else {
    // ✅ Insert new subscription
    const { error: insertError } = await supabase.from("subscriptions").insert([
      {
        user_id: user.id,
        stripe_subscription_id: subscription.id,
        status,
        price_id: priceId,
        current_period_start: new Date().toISOString(),
        current_period_end: currentPeriodEnd,
      },
    ]);

    if (insertError) {
      console.error(
        "❌ Failed to insert new subscription in Supabase:",
        insertError
      );
    } else {
      console.log("✅ New subscription successfully added to Supabase");
    }
  }
}

/**
 * Handles subscription cancellation.
 * Updates user status in Supabase.
 */
async function handleSubscriptionCancel(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  console.log(`🚨 Cancelling subscription for customer: ${customerId}`);

  // Find the associated user
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (userError || !user) {
    console.error(
      "❌ User not found in Supabase for canceled subscription:",
      customerId
    );
    return;
  }

  // Mark the subscription as canceled
  const { error: cancelError } = await supabase
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("user_id", user.id);

  if (cancelError) {
    console.error(
      "❌ Failed to update canceled subscription in Supabase:",
      cancelError
    );
  } else {
    console.log("✅ Subscription successfully marked as canceled in Supabase");
  }
}
