import { useState } from "react";
import {
  Button,
  Card,
  Text,
  SegmentedControl,
  Group,
  NumberInput,
} from "@mantine/core";
import { additionalWebsite } from "@/app/utils/subscriptions";

function AdditionalWebsite({ session, currentProduct }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Per Month");
  const [quantity, setQuantity] = useState(1);

  // Find the selected plan based on the selectedPeriod
  const currentPlan = additionalWebsite.find(
    (plan) => plan.period === selectedPeriod
  );
console.log("current", currentProduct)
  const createCheckoutSession = async () => {
    if (!session || !currentPlan) return;

    const res = await fetch("/api/stripe/subscription/addon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeSubscriptionId: currentProduct?.stripe_subscription_id,
        additionalWebsiteProductId: currentPlan.productId,
        quantity:quantity, // Pass quantity to Stripe
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

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Text size="lg" fw={500} mb="md">
        Need an additional website?
      </Text>
      <Text c="gray" size="sm" mb="md">
        You can add more websites to your subscription plan.
      </Text>

      {/* Toggle Between Monthly & Yearly */}
      <Group position="center" mt="md">
        <SegmentedControl
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          data={[
            { label: "Monthly", value: "Per Month" },
            { label: "Yearly", value: "Per Year" },
          ]}
        />
      </Group>

      {/* Quantity Selector */}
      <NumberInput
        value={quantity}
        onChange={(value) => setQuantity(value)}
        min={1}
        max={10} // Limit max quantity to 10 to avoid over-purchasing
        step={1}
        label="Number of additional websites"
        className="mt-4"
      />

      {/* Display Pricing Info */}
      {currentPlan && (
        <>
          <Text size="xl" fw={700} c="orange" align="center" mt="md">
            {currentPlan.price} / {currentPlan.period} per website
          </Text>

          {/* Checkout Button */}
          <Button
            color="orange"
            variant="light"
            fullWidth
            mt="md"
            onClick={createCheckoutSession}
          >
            Add {quantity} {quantity > 1 ? "Websites" : "Website"}
          </Button>
        </>
      )}
    </Card>
  );
}

export default AdditionalWebsite;
