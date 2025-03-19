import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { stripeSubscriptionId, additionalWebsiteProductId, quantity } =
      await req.json();
    console.log("stripeSubscriptionId", stripeSubscriptionId);
    console.log("additionalWebsiteProductId", additionalWebsiteProductId);
    console.log("quantity", quantity);
    if (!stripeSubscriptionId || !additionalWebsiteProductId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Step 1: Retrieve the price ID associated with the product
    const productPrices = await stripe.prices.list({
      product: additionalWebsiteProductId,
    });

    if (!productPrices.data.length) {
      return NextResponse.json(
        { error: "No price found for this product" },
        { status: 404 }
      );
    }

    const additionalWebsitePriceId = productPrices.data[0].id; // Take the first price

    // Step 2: Retrieve current subscription details
    const subscription = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    );

    // Step 3: Prepare the updated subscription items (merge quantities if price IDs match)
    const updatedItems = subscription.items.data.map((item) => {
      if (item.price.id === additionalWebsitePriceId) {
        // Merge quantities if the price ID matches
        return {
          id: item.id,
          quantity: (item.quantity || 1) + (quantity || 1), // Add new quantity to existing
        };
      }
      // Preserve other items unchanged
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    // If no matching price ID exists, append the new item
    const hasMatchingPrice = subscription.items.data.some(
      (item) => item.price.id === additionalWebsitePriceId
    );
    if (!hasMatchingPrice) {
      updatedItems.push({
        price: additionalWebsitePriceId,
        quantity: quantity || 1, // Default to 1 if quantity not provided
      });
    }

    // Step 4: Update the subscription
    const updatedSubscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        items: updatedItems,
        proration_behavior: "create_prorations",
      }
    );

    return NextResponse.json({ success: true, updatedSubscription });
  } catch (error) {
    console.error("❌ Failed to add additional website:", error);
    return NextResponse.json(
      { error: "Could not update subscription" },
      { status: 500 }
    );
  }
}
