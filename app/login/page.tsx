"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Anchor,
  Alert,
  Divider,
  Container,
  Box,
} from "@mantine/core";
import { FaGoogle, FaSignInAlt } from "react-icons/fa";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
        <form onSubmit={handleLogin}>
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
          {/* <Checkbox label="Remember me" mt="md" c="orange" /> */}
          <Anchor href="#" size="sm" align="right" mt={5} c="orange">
            Forgot password?
          </Anchor>
          <Button
            type="submit"
            fullWidth
            color="orange"
            loading={loading}
            leftSection={<FaSignInAlt />}
            mt="md"
            className="bg-orange-500 hover:bg-orange-600 text-black"
          >
            Login
          </Button>
        </form>
        <Divider
          my="md"
          label="Or continue with"
          labelPosition="center"
          c="orange"
        />
        <Button
          fullWidth
          color="gray"
          onClick={() => signIn("google")}
          leftSection={<FaGoogle />}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          Sign in with Google
        </Button>
        <Text align="center" size="sm" mt="md" c="white">
          Don’t have an account yet?{" "}
          <Anchor href="/signup" c="orange">
            Sign up here
          </Anchor>
        </Text>
      </Paper>
    </Box>
  );
}
