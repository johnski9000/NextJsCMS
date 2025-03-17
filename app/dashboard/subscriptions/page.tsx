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
import PricingPackages from "@/app/PricingPackages";
import React from "react";

// Dummy subscription data (null represents no subscription)
const dummySubscription = null; // Change to the previous object for active subscription example
/* const dummySubscription = {
  planName: "Pro Plan",
  status: "Active",
  price: "$29",
  billingCycle: "monthly",
  nextBillingDate: "April 17, 2025",
  features: ["Unlimited projects", "Priority support", "Advanced analytics"],
}; */

function Subscriptions() {
  const hasSubscription = !!dummySubscription;

  const scrollDown = () => {
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-white">
      <Container size="lg" py="xl">
        {/* Current Subscription Section */}
        <Title order={2} mb="lg" className="text-black">
          Your Subscription
        </Title>

        {hasSubscription ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
            <Group justify="space-between" mb="md">
              <Group>
                <Text fw={700} size="xl">
                  {dummySubscription.planName}
                </Text>
                <Badge
                  color={
                    dummySubscription.status === "Active" ? "green" : "gray"
                  }
                  variant="light"
                >
                  {dummySubscription.status}
                </Badge>
              </Group>
              <Text size="lg" c="gray">
                {dummySubscription.price}/{dummySubscription.billingCycle}
              </Text>
            </Group>

            <Text c="gray" size="sm" mb="md">
              Next billing: {dummySubscription.nextBillingDate}
            </Text>

            <Text c="gray" size="sm" fw={500} mb="xs">
              Included Features:
            </Text>
            {dummySubscription.features.map((feature, index) => (
              <Text key={index} size="sm" c="dimmed">
                • {feature}
              </Text>
            ))}
          </Card>
        ) : (
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
            <Text size="lg" fw={500} mb="md">
              No Active Subscription
            </Text>
            <Text c="gray" size="sm" mb="md">
              You currently don&apos;t have an active subscription plan.
            </Text>
            <Button color="blue" variant="light" onClick={scrollDown}>
              Choose a Plan Below
            </Button>
          </Card>
        )}

        {/* Pricing Packages Section */}
        <Title order={2} mb="lg" className="text-black">
          Available Plans
        </Title>
        <PricingPackages userPage={true} />
      </Container>
    </div>
  );
}

export default Subscriptions;
