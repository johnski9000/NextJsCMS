// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = async (req: Request) => {
  const sig = req.headers.get("stripe-signature") as string;
  const rawBody = await req.arrayBuffer();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error(
      `Webhook signature verification failed: ${(err as Error).message}`
    );
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const { type, data } = event;

  if (type === "checkout.session.completed") {
    const session = data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (!customerEmail || !customerId || !subscriptionId) {
      console.error("Missing customerEmail, customerId, or subscriptionId");
      return NextResponse.json(
        { error: "Incomplete session data" },
        { status: 400 }
      );
    }

    // Find user by email and update with Stripe customer ID and subscription status
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", customerEmail)
      .single();

    if (userError || !user) {
      console.error("User not found:", userError?.message);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        stripe_customer_id: customerId,
        subscription_status: "active",
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update user:", updateError.message);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }

  if (type === "customer.subscription.updated") {
    const subscription = data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const status = subscription.status;

    const subscriptionStatus =
      status === "active" || status === "trialing"
        ? "active"
        : status === "canceled" || status === "unpaid" || status === "past_due"
        ? "inactive"
        : null;

    if (!subscriptionStatus) {
      return NextResponse.json({ message: "No status update needed" });
    }

    const { error } = await supabase
      .from("users")
      .update({ subscription_status: subscriptionStatus })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Failed to update subscription status:", error.message);
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }

  if (type === "customer.subscription.deleted") {
    const subscription = data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { error } = await supabase
      .from("users")
      .update({ subscription_status: "canceled" })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Failed to update subscription status:", error.message);
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }

  if (type === "invoice.payment_succeeded") {
    const invoice = data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;

    const { error } = await supabase
      .from("users")
      .update({ subscription_status: "active" })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Failed to update subscription status:", error.message);
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }

  if (type === "invoice.payment_failed") {
    const invoice = data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;

    const { error } = await supabase
      .from("users")
      .update({ subscription_status: "inactive" })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Failed to update subscription status:", error.message);
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
};

// Disable body parsing for raw webhook payload
export const config = {
  api: { bodyParser: false },
};
