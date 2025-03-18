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

// Main page component
async function Page() {
  // Get user session
  const session = await getServerSession(authOptions);
  console.log("User session:", session);
  try {
    // Fetch subscription details
    const checkSubscriptionResponse = await axios.post(
      "http://localhost:3000/api/subscription/current",
      {
        userId: session?.user.id,
      }
    );

    const checkSubscription = checkSubscriptionResponse.data; // Use .data instead of .json()

    console.log("Subscription details:", checkSubscription);

    // Log for debugging

    // Render component
    return (
      <div>
        <Subscriptions session={session} currentProduct={checkSubscription} />
      </div>
    );
  } catch (error) {
    console.error("❌ Error in page component:", error);
    return (
      <div className="bg-white min-h-screen">
        <Subscriptions session={session} currentProduct={null} />
        <p>Error loading subscription details</p>
      </div>
    );
  }
}

export default Page;
