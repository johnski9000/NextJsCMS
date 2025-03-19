import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { stripeSubscriptionId, newMainProductId } = await req.json();
    console.log("Subscription ID:", stripeSubscriptionId);
    console.log("New Main Product ID:", newMainProductId);
    if (!stripeSubscriptionId || !newMainProductId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Step 1: Retrieve the price ID associated with the new main product
    const productPrices = await stripe.prices.list({
      product: newMainProductId,
    });

    if (!productPrices.data.length) {
      return NextResponse.json(
        { error: "No price found for this product" },
        { status: 404 }
      );
    }

    const newMainPriceId = productPrices.data[0].id; // Take the first price (assumes one active price per product)

    // Step 2: Retrieve current subscription details
    const subscription = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    );

    // Step 3: Prepare the updated subscription items (new main plan + existing add-ons)
    const updatedItems = [
      {
        id: subscription.items.data[0].id, // Main plan is assumed to be the first item
        price: newMainPriceId, // Swap to the new main plan price
      },
      ...subscription.items.data.slice(1).map((item) => ({
        id: item.id, // Preserve existing add-ons
        quantity: item.quantity,
      })),
    ];

    // Step 4: Update the subscription
    const updatedSubscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        items: updatedItems,
        proration_behavior: "create_prorations", // Ensures correct billing mid-cycle
      }
    );

    return NextResponse.json({ success: true, updatedSubscription });
  } catch (error) {
    console.error("❌ Failed to update main subscription:", error);
    return NextResponse.json(
      { error: "Could not update subscription" },
      { status: 500 }
    );
  }
}
