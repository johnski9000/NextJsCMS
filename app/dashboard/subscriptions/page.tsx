import React from "react";
import Subscriptions from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Stripe from "stripe";
import axios from "axios";

// Initialize Stripe with type safety
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Specify Stripe API version
});

// Define types for better type safety
interface PriceDetails {
  id: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: string;
    interval_count: number;
  };
}

// Function to fetch price details from Stripe
async function getPriceDetails(priceId: string): Promise<PriceDetails | null> {
  try {
    const price = await stripe.prices.retrieve(priceId);
    console.log("Price Details:", price);
    return price as PriceDetails;
  } catch (error) {
    console.error("❌ Error fetching price:", error);
    return null;
  }
}

// Main page component
async function Page() {
  // Get user session
  const session = await getServerSession(authOptions);

  try {
    // Fetch subscription details
    const checkSubscriptionResponse = await axios.post(
      "http://localhost:3000/api/subscription/current",
      {
        userId: session?.user.id,
      }
    );

    const checkSubscription = checkSubscriptionResponse.data; // Use .data instead of .json()

    // Fetch price details if price_id exists
    const { product } = checkSubscription?.price_id
      ? await getPriceDetails(checkSubscription.price_id)
      : null;

    // Log for debugging
    console.log("Subscription:", checkSubscription);

    // Render component
    return (
      <div>
        <Subscriptions session={session} currentProduct={product} />
      </div>
    );
  } catch (error) {
    console.error("❌ Error in page component:", error);
    return (
      <div>
        <Subscriptions session={session} currentProduct={null} />
        <p>Error loading subscription details</p>
      </div>
    );
  }
}

export default Page;
