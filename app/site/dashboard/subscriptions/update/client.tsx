"use client";
import PricingPackages from "@/app/PricingPackages";
import { Container, ActionIcon } from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa"; // Import FaArrowLeft from react-icons
import React from "react";
import Link from "next/link";

function AvailableSubscriptions({ session, currentProduct }) {
  return (
    <Container size="lg" py="xl">
      {/* Go Back Arrow with Link */}
      <Link href="/dashboard/subscriptions">
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          aria-label="Go back"
          mb="md"
        >
          <FaArrowLeft size={24} />
        </ActionIcon>
      </Link>

      <PricingPackages session={session} currentProduct={currentProduct} />
    </Container>
  );
}

export default AvailableSubscriptions;
