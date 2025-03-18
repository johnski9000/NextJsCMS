"use client";
import React, { useState } from "react";
import {
  Container,
  Title,
  Card,
  TextInput,
  Textarea,
  Button,
  Group,
  Text,
  Paper,
  Stack,
  Anchor,
  Accordion,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showToast } from "@/app/utils/toast";

function SupportPage() {
  // Form management with Mantine useForm hook
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value.length > 0 && !/^\+?\d{10,15}$/.test(value)
          ? "Invalid phone number"
          : null,
      message: (value) => (value.length < 10 ? "Message is too short" : null),
    },
  });

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    showToast.success("Message sent!");
    form.reset();
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <Container size="lg" py="xl">

        <Box
          align="flex-start"
          spacing="xl"
          className="flex flex-col items-start md:flex-row md:justify-between gap-4"
        >
          {/* Contact Form */}
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ width: "100%" }} // Ensure full width on mobile
          >
            <Title order={2} size="h3" mb="md">
              Send Us a Message
            </Title>
            <Text c="gray" size="sm" mb="lg">
              Our team will respond within 24-48 hours
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack spacing="md">
                <Group
                  direction={{ base: "column", sm: "row" }} // Stack inputs vertically on mobile
                >
                  <TextInput
                    label="First Name"
                    placeholder="John"
                    withAsterisk
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    withAsterisk
                    {...form.getInputProps("lastName")}
                  />
                </Group>

                <Group
                  grow
                  direction={{ base: "column", sm: "row" }} // Stack inputs vertically on mobile
                >
                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    type="email"
                    withAsterisk
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="+1234567890"
                    {...form.getInputProps("phone")}
                  />
                </Group>

                <Textarea
                  label="Message"
                  placeholder="How can we assist you today?"
                  minRows={4}
                  withAsterisk
                  {...form.getInputProps("message")}
                />

                <Button type="submit" color="blue" fullWidth mt="md">
                  Submit Message
                </Button>
              </Stack>
            </form>
          </Card>

          {/* Additional Support Info */}
          <Paper
            p="lg"
            radius="md"
            withBorder
            style={{ width: "100%" }} // Ensure full width on mobile
          >
            <Title order={2} size="h3" mb="md">
              Need Help?
            </Title>
            <Stack spacing="md">
              <div>
                <Text fw={500}>Email Us</Text>
                <Anchor href="mailto:support@example.com" c="blue">
                  support@example.com
                </Anchor>
              </div>
              <div>
                <Text fw={500}>Call Us</Text>
                <Text c="gray">+1 800-555-1234</Text>
                <Text size="sm" c="dimmed">
                  Mon-Fri, 9AM-5PM EST
                </Text>
              </div>
              <div>
                <Text fw={500}>FAQ</Text>
                <Anchor href="#faq" c="blue">
                  Scroll to our FAQ section
                </Anchor>
              </div>
            </Stack>
          </Paper>
        </Box>

        {/* FAQ Section */}
        <Paper shadow="sm" p="lg" radius="md" withBorder mt="md" id="faq">
          <Title order={2} size="h3" mb="md">
            Frequently Asked Questions
          </Title>
          <Accordion variant="contained" radius="md">
            <Accordion.Item value="q1">
              <Accordion.Control>How do I reset my password?</Accordion.Control>
              <Accordion.Panel>
                To reset your password, go to the login page and click "Forgot
                Password." Enter your email address, and we'll send you a link
                to reset it. Follow the instructions in the email to set a new
                password.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q2">
              <Accordion.Control>
                What are your support hours?
              </Accordion.Control>
              <Accordion.Panel>
                Our support team is available Monday through Friday, 9 AM to 5
                PM EST. For urgent issues outside these hours, please email us,
                and we'll respond as soon as possible.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q3">
              <Accordion.Control>How can I track my order?</Accordion.Control>
              <Accordion.Panel>
                Once your order is shipped, you'll receive a tracking number via
                email. You can use this number on our website's "Track Order"
                page or directly on the carrier's site to monitor your shipment.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q4">
              <Accordion.Control>Do you offer refunds?</Accordion.Control>
              <Accordion.Panel>
                Yes, we offer refunds within 30 days of purchase if the product
                is unused and in its original condition. Please contact support
                to initiate a return and receive further instructions.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q5">
              <Accordion.Control>
                How do I contact a live agent?
              </Accordion.Control>
              <Accordion.Panel>
                You can reach a live agent by calling +1 800-555-1234 during our
                support hours (Mon-Fri, 9 AM-5 PM EST) or by submitting a
                message through this page for a callback request.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Paper>
      </Container>
    </div>
  );
}

export default SupportPage;
