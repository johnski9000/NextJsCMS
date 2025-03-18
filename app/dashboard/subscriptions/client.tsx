"use client";
import {
  Card,
  Text,
  Badge,
  Group,
  Title,
  Container,
  Button,
} from "@mantine/core";
import React from "react";
import { subscriptions } from "@/app/utils/subscriptions";
import { format } from "date-fns";
import AdditionalWebsite from "./AdditionalWebsite";
function Subscriptions({ session, currentProduct }) {
  const stripeId = session?.stripeCustomerId || "";

  const handleManageSubscription = async () => {
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stripeCustomerId: stripeId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };
  console.log("Current Product:", currentProduct);
  const hasSubscription = currentProduct?.status === "active" ? true : false;

  const scrollDown = () => {
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  const currentSubscription = subscriptions.find(
    (sub) => sub.productId === currentProduct?.product_id
  );

  return (
    <div className="bg-white min-h-screen">
      <Container size="lg" py="xl">
        {/* Current Subscription Section */}
        <Title order={2} mb="lg" className="text-black">
          Your Subscription
        </Title>

        {hasSubscription ? (
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
              <Group justify="space-between" mb="md">
                <Group>
                  <Text fw={700} size="xl">
                    {currentSubscription?.title}
                  </Text>
                  <Badge
                    color={
                      currentProduct?.status === "active" ? "green" : "gray"
                    }
                    variant="light"
                  >
                    {currentProduct?.status}
                  </Badge>
                </Group>
                <Text size="lg" c="gray">
                  {currentSubscription?.price}/{currentSubscription?.period}
                </Text>
              </Group>

              <Text c="gray" size="sm" mb="md">
                Next billing:{" "}
                {currentProduct?.current_period_end
                  ? format(
                      new Date(currentProduct?.current_period_end),
                      "MMMM dd, yyyy"
                    )
                  : "N/A"}
              </Text>

              <Text c="gray" size="sm" fw={500} mb="xs">
                Included Features:
              </Text>
              {currentSubscription?.features.map((feature, index) => (
                <Text key={index} size="sm" c="dimmed">
                  • {feature}
                </Text>
              ))}
              <Button
                color="blue"
                variant="light"
                mt={20}
                onClick={() => handleManageSubscription()}
              >
                Manage Subscription
              </Button>
              <Button
                color="green"
                variant="light"
                mt={20}
                onClick={() => handleManageSubscription()}
              >
                Need an upgrade?
              </Button>
            </Card>
            <AdditionalWebsite session={session} />
          </div>
        ) : (
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
            <Text size="lg" fw={500} mb="md">
              No Active Subscription
            </Text>
            <Text c="gray" size="sm" mb="md">
              You currently don&apos;t have an active subscription plan.
            </Text>
            <Button
              color="blue"
              variant="light"
              onClick={() => handleManageSubscription()}
            >
              Choose a Plan Below
            </Button>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default Subscriptions;
