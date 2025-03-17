"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
import Link from "next/link";

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
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Automatically log in user with NextAuth
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (user?.error) {
      setError(user.error);
      setLoading(false);
      return;
    }

    // Redirect user based on plan selection
    if (selectedPlan) {
      router.push(`/dashboard/checkout?plan=${selectedPlan}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <Title c="orange">
        <Link href="/">
          <Image src="/mobileLogo.png" alt="Logo" width={100} height={100} />
        </Link>
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
        <Text className="text-center" size="sm" mt="md" c="white">
          Already have an account?{" "}
          <Anchor href="/login" c="orange">
            Log in here
          </Anchor>
        </Text>
      </Paper>
    </Box>
  );
}
