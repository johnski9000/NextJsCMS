import React from "react";

import { getServerSession } from "next-auth";

import axios from "axios";
import AvailableSubscriptions from "./client";

// Initialize Stripe with type safety

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

  try {
    // Fetch subscription details
    const checkSubscriptionResponse = await axios
      .post("http://localhost:3000/api/subscription/current", {
        userId: session?.user.id,
      })
      .catch((error) => {
        console.log("❌ Error fetching subscription details:", error);
        return null;
      });

    const checkSubscription = checkSubscriptionResponse?.data; // Use .data instead of .json()

    // Render component
    return (
      <div className="bg-white min-h-screen">
        <AvailableSubscriptions
          session={session}
          currentProduct={checkSubscription}
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Error in page component:", error);
    return (
      <div className="bg-white min-h-screen">
        <p>Error loading subscription details</p>
      </div>
    );
  }
}

export default Page;
