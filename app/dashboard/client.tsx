"use client";
import {
  Container,
  Grid,
  Card,
  Button,
  Text,
  Title,
  Skeleton,
  Modal,
} from "@mantine/core";
import { FaPlus, FaGlobe, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { showToast } from "../utils/toast";
import { subscriptions } from "../utils/subscriptions";

export default function MyWebsitesDashboard({
  session,
  currentSubscription,
  websites = [],
}) {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(session);
  console.log(currentSubscription);
  console.log("Websites:", websites);
  const AddWebsiteModal = () => {
    const [loading, setLoading] = useState(false);
    const plan = subscriptions.find(
      (item) => item.productId === currentSubscription.product_id
    );
    const submitForm = async (e) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.target);
      const subdomain = formData.get("subdomain");
      const customDomain = formData.get("customDomain");

      try {
        const response = await fetch("/api/website/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session?.user?.id,
            subdomain,
            customDomain: customDomain || null,
            plan: plan,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create website");
        }

        // Handle success (e.g., close modal, show success message, refresh data)
        showToast.success("Website created successfully");
      } catch (error) {
        console.error("Error creating website:", error);
        showToast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        opened={opened}
        onClose={close}
        centered
        shadow="lg"
        classNames={{
          inner: "animate-fadeUp",
          content: "p-4 rounded-lg shadow-xl",
          body: "space-y-4",
        }}
      >
        <Container size="md" className="text-center py-4">
          <Card shadow="sm" padding="lg" radius="lg">
            <Title order={2} className="text-black mb-2">
              Add Your New Website
            </Title>
            <Text size="md" color="dimmed" className="mb-4">
              Choose a name for your new website. We&apos;ll create a subdomain
              (e.g. <strong>yourname.ignitecms.com</strong>). You can also
              optionally provide your own custom domain later.
            </Text>
            <form onSubmit={submitForm}>
              <div className="text-left mb-4">
                <label
                  htmlFor="subdomain"
                  className="block font-semibold mb-1 text-gray-700"
                >
                  Choose a subdomain (required)
                </label>
                <input
                  type="text"
                  name="subdomain"
                  id="subdomain"
                  placeholder="yourname"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <small className="text-gray-500">
                  This will become your site address:{" "}
                  <strong>yourname.ignitecms.com</strong>
                </small>
              </div>
              <div className="text-left mb-4">
                <label
                  htmlFor="customDomain"
                  className="block font-semibold mb-1 text-gray-700"
                >
                  Custom domain (optional)
                </label>
                <input
                  type="text"
                  name="customDomain"
                  id="customDomain"
                  placeholder="www.yourdomain.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <small className="text-gray-500">
                  If you have your own domain, enter it here (you can set this
                  up later).
                </small>
              </div>
              <Button
                variant="filled"
                color="orange"
                className="mt-4 w-full"
                type="submit"
                loading={loading}
              >
                Create Website
              </Button>
            </form>
          </Card>
        </Container>
      </Modal>
    );
  };
  if (currentSubscription.status !== "active") {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-black">
            Upgrade to access this feature
          </Title>
          <Text size="lg" color="dimmed">
            You need an active subscription to manage websites.
          </Text>
          <Link href="/dashboard/subscriptions">
            <Button variant="light" color="blue" className="mt-4">
              Upgrade Now
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  if (currentSubscription.status === "active")
    return (
      <div className="bg-gray-100 min-h-screen">
        <AddWebsiteModal />
        <Container size="lg" className="py-8">
          <Title order={2} className="text-black">
            My Websites
          </Title>
          <Text size="sm" color="dimmed">
            Manage your websites, view their status, and add new ones.
          </Text>

          {/* Website Grid */}
          <Grid gutter="lg" className="mt-6">
            {/* Add New Website Card */}
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                className="border border-dashed border-gray-400 min-h-[208px] flex items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <FaPlus className="text-gray-500 w-10 h-10 mb-3" />
                  <Text size="sm" color="dimmed">
                    Add a new website
                  </Text>
                  <Button
                    variant="outline"
                    color="orange"
                    mt="md"
                    onClick={open}
                  >
                    Add Website
                  </Button>
                </div>
              </Card>
            </Grid.Col>
            {websites.length > 0 &&
              websites.map((website) => (
                <Grid.Col key={website.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <Card
                    shadow="md"
                    padding="lg"
                    radius="md"
                    className="border border-gray-300 flex items-center justify-center"
                  >
                    <FaGlobe className="text-orange-500 w-8 h-8 mb-4" />

                    <Title order={4}>{website.subdomain}</Title>

                    <Text size="sm" color="dimmed">
                      {website.custom_domain
                        ? website.custom_domain
                        : `${website.subdomain}.ignitecms.com`}
                    </Text>

                    <Text size="sm" className="font-semibold text-green-500">
                      {website.plan.title}
                    </Text>

                    <div className="mt-4 flex justify-between items-center">
                      <Link
                        href={`https://${
                          website.custom_domain ||
                          `${website.subdomain}.ignitecms.com`
                        }`}
                        target="_blank"
                      >
                        <Button
                          variant="light"
                          leftSection={<FaExternalLinkAlt />}
                        >
                          Visit
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Grid.Col>
              ))}
          </Grid>
        </Container>
      </div>
    );
}
