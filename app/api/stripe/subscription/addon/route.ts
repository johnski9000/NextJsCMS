import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { stripeSubscriptionId, additionalWebsiteProductId, quantity } = await req.json();

    if (!stripeSubscriptionId || !additionalWebsiteProductId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Step 1: Retrieve the price ID associated with the product
    const productPrices = await stripe.prices.list({ product: additionalWebsiteProductId });

    if (!productPrices.data.length) {
      return NextResponse.json({ error: "No price found for this product" }, { status: 404 });
    }

    const additionalWebsitePriceId = productPrices.data[0].id; // Take the first price

    // Step 2: Retrieve current subscription details
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    // Step 3: Prepare the updated subscription items (existing items + new add-on)
    const updatedItems = [
      ...subscription.items.data.map((item) => ({
        id: item.id, // Preserve existing subscription items
        quantity: item.quantity,
      })),
      {
        price: additionalWebsitePriceId, // The new price ID for additional website
        quantity: quantity, // Modify if needed for multiple website add-ons
      },
    ];

    // Step 4: Update the subscription
    const updatedSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
      items: updatedItems,
      proration_behavior: "create_prorations", // Ensures correct billing mid-cycle
    });

    return NextResponse.json({ success: true, updatedSubscription });
  } catch (error) {
    console.error("❌ Failed to add additional website:", error);
    return NextResponse.json({ error: "Could not update subscription" }, { status: 500 });
  }
}
