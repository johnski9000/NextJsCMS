"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Anchor,
  Alert,
  Box,
} from "@mantine/core";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard"); // Changed to /dashboard to match login flow
  };

  return (
    <Box className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <Title align="center" c="orange">
        <Image src="/mobileLogo.png" alt="Logo" width={100} height={100} />
      </Title>
      {error && (
        <Alert color="red" mt={10} radius="md">
          {error}
        </Alert>
      )}
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={20}
        radius="md"
        className="!bg-gray-900 border-orange-500"
      >
        <form onSubmit={handleSignup}>
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-white"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
            className="text-white"
          />
          <Button
            type="submit"
            fullWidth
            color="orange"
            loading={loading}
            mt="md"
            className="bg-orange-500 hover:bg-orange-600 text-black"
          >
            Sign Up
          </Button>
        </form>
        <Text align="center" size="sm" mt="md" c="white">
          Already have an account?{" "}
          <Anchor href="/login" c="orange">
            Log in here
          </Anchor>
        </Text>
      </Paper>
    </Box>
  );
}
