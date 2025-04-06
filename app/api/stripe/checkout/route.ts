import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId, productId, stripeId, quantity } = await req.json();
    console.log("Stripe Checkout Params:", { userId, productId, stripeId });

    // Validate inputs
    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );
    }

    // Fetch user from Supabase
    const { data: user, error } = await supabase.auth.admin.getUserById(userId);
    console.log("Fetched user:", user);
    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get or create Stripe customer ID
    let customerId = stripeId || user.user.user_metadata?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.user.email,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;

      // Update Supabase with customer ID
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { stripe_customer_id: customerId },
      });
    }

    // Check for an existing active Price for the Product
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1, // Get the first active price
    });

    let priceId;
    if (prices.data.length > 0) {
      // Use existing Price ID
      priceId = prices.data[0].id;
    } else {
      // Create a new Price if none exists
      const newPrice = await stripe.prices.create({
        unit_amount: 1000, // e.g., $10.00 (adjust as needed)
        currency: "usd",
        recurring: { interval: "month" }, // Adjust for your needs
        product: productId,
      });
      priceId = newPrice.id;
    }

    // Create Stripe Checkout Session with the Price ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: quantity ? quantity : 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
