import React from "react";
import {
  Container,
  Title,
  Card,
  Text,
  TextInput,
  Group,
  Button,
  Select,
  PasswordInput,
} from "@mantine/core";

// Dummy user data
const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 555-0123",
  language: "English",
};

function SettingsPage() {
  return (
    <div className="bg-white">
      <Container size="lg" py="xl">
        <Title order={1} mb="xl" className="text-black text-center">
          Settings
        </Title>

        {/* Profile Settings */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Title order={2} size="h3" mb="md">
            Profile Information
          </Title>
          <TextInput
            label="Full Name"
            value={dummyUser.name}
            mb="md"
            readOnly
          />
          <TextInput label="Email" value={dummyUser.email} mb="md" readOnly />
          <TextInput
            label="Phone Number"
            value={dummyUser.phone}
            mb="md"
            readOnly
          />
          <Button variant="outline">Edit Profile</Button>
        </Card>

        {/* Account Preferences */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Title order={2} size="h3" mb="md">
            Preferences
          </Title>
          <Select
            label="Language"
            value={dummyUser.language}
            data={["English", "Spanish", "French", "German"]}
            mb="md"
          />
          <Text size="sm" c="gray" mb="md">
            Choose your preferred language for the interface
          </Text>
          <Button variant="outline">Save Preferences</Button>
        </Card>

        {/* Update Password */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Title order={2} size="h3" mb="md">
            Update Password
          </Title>
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            mb="md"
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            mb="md"
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            mb="md"
          />
          <Button variant="outline">Update Password</Button>
        </Card>

        {/* Forgot Password */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">
            Forgot Password
          </Title>
          <Text size="sm" c="gray" mb="md">
            Reset your password using your email address
          </Text>
          <TextInput label="Email" value={dummyUser.email} mb="md" readOnly />
          <Button variant="outline">Send Reset Link</Button>
        </Card>
      </Container>
    </div>
  );
}

export default SettingsPage;
