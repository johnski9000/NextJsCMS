"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage({ session }) {
  console.log("passed down", session);
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); // Get plan from URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session.user) return;

    const createCheckoutSession = async () => {
      setLoading(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          productId: plan,
          stripeId: session?.stripeCustomerId,
        }),
      });

      const data = await res.json();

      if (data.error) {
        console.error("Checkout Error:", data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    };

    createCheckoutSession();
  }, [session, status, plan]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      {loading ? (
        <p>Redirecting to Stripe Checkout...</p>
      ) : (
        <p>Processing...</p>
      )}
    </div>
  );
}
