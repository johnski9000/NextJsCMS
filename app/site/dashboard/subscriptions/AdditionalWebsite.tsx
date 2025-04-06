import { useState } from "react";
import { Button, Card, Text, NumberInput, Loader } from "@mantine/core";
import { additionalWebsite } from "@/app/utils/subscriptions";
import { showToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";

function AdditionalWebsite({ session, currentProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createCheckoutSession = async () => {
    if (!session || !additionalWebsite) return;
    setLoading(true);
    const res = await fetch("/api/stripe/subscription/addon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeSubscriptionId: currentProduct?.stripe_subscription_id,
        additionalWebsiteProductId: additionalWebsite.productId,
        quantity: quantity, // Pass quantity to Stripe
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Checkout Error:", data.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    showToast.success("Website added successfully!");
    router.refresh();
    return;
  };

  const currentWebsiteAddon = currentProduct?.addons.find(
    (item) => item.product_id === additionalWebsite.productId
  )
    ? {
        ...currentProduct.addons.find(
          (item) => item.product_id === additionalWebsite.productId
        ),
        ...additionalWebsite,
      }
    : null;

  console.log("currentlAmountOfWebsites", currentWebsiteAddon);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Text size="lg" fw={500} mb="md">
        Need an additional website?
      </Text>
      <Text c="gray" size="sm" mb="md">
        You can add more websites to your subscription plan.
      </Text>

      {/* current amount of website  */}

      <Text size="md" fw={500} mb="md">
        Current amount of additional websites: {currentWebsiteAddon?.quantity}
      </Text>

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
      {additionalWebsite && (
        <>
          <Text size="xl" fw={700} c="orange" align="center" mt="md">
            {additionalWebsite.price} / {additionalWebsite.period} per website
          </Text>

          {/* Checkout Button */}
          {loading ? (
            <Loader className="mx-auto my-4" />
          ) : (
            <Button
              color="orange"
              variant="light"
              fullWidth
              mt="md"
              onClick={createCheckoutSession}
            >
              Add {quantity} {quantity > 1 ? "Websites" : "Website"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}

export default AdditionalWebsite;
