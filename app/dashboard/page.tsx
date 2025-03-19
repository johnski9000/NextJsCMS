import React from "react";
import MyWebsitesDashboard from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import axios from "axios";
import Link from "next/link";

async function page() {
  const session = await getServerSession(authOptions);
  const checkSubscriptionResponse = await axios
    .post("http://localhost:3000/api/subscription/current", {
      userId: session?.user.id,
    })
    .catch((error) => {
      console.log("❌ Error fetching subscription details:", error);
      return null;
    });

  const userWebsites = await axios
    .post("http://localhost:3000/api/website/get", {
      userId: session?.user.id,
    })
    .catch((error) => {
      console.log("❌ Error fetching subscription details:", error);
      return null;
    });
  const websites = userWebsites?.data.websites;
  const currentSubscription = checkSubscriptionResponse?.data; // Use .data instead of .json()
  if (checkSubscriptionResponse?.data.status !== "active") {
    return (
      <div>
        <h1>Your subscription is not active</h1>
        <p>
          Please{" "}
          <Link href="/dashboard/subscriptions">
            update your billing information
          </Link>{" "}
          to continue using the service.
        </p>
      </div>
    );
  }
  return (
    <div>
      <MyWebsitesDashboard
        session={session}
        currentSubscription={currentSubscription}
        websites={websites}
      />
    </div>
  );
}

export default page;
