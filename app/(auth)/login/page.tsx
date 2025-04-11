"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TextInput,
  Button,
  PasswordInput,
  LoadingOverlay,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithEmail } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleEmailLogin = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await signInWithEmail(values.email, values.password);
      if (!response) {
        notifications.show({
          title: "Login failed",
          message: "Invalid email or password",
          color: "red",
        });
      }
      console.log("Login response:", response);
      // Simulate successful login (in real app, check response status)
      notifications.show({
        title: "Login successful",
        message: "Redirecting to dashboard...",
        color: "green",
      });
      router.push("/dashboard"); // Redirect to dashboard

      // Redirect would happen here
    } catch (error) {
      notifications.show({
        title: "Login failed",
        message: error.message || "Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-inter h-full  text-white">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="flex items-center justify-center lg:mb-0 mb-14 relative">
            <div className="max-w-md w-full p-8 z-10">
              <div className="flex justify-center mb-7 lg:mb-11">
                <Image
                  src="/mobileLogo.png"
                  alt="Pagedone logo"
                  width={100}
                  height={50}
                  className="object-contain " // Invert colors for dark theme
                />
              </div>

              <h2 className="text-white text-center text-2xl font-bold font-manrope leading-9 mb-3">
                Welcome Back
              </h2>

              <p className="text-gray-400 text-center text-base font-medium leading-6 mb-11">
                Let's get started with your 30 days free trial
              </p>

              <AnimatePresence mode="wait">
                {!showEmailForm ? (
                  <motion.div
                    key="socialButtons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 mb-11"
                  >
                    <Button
                      fullWidth
                      size="md"
                      variant="outline"
                      color="gray"
                      radius="xl"
                      leftSection={<FcGoogle size={20} />}
                      className="hover:bg-gray-800"
                    >
                      Sign in with Google
                    </Button>

                    <Button
                      fullWidth
                      size="md"
                      variant="outline"
                      color="gray"
                      radius="xl"
                      leftSection={<FaFacebook size={20} color="#1877F2" />}
                      className="hover:bg-gray-800"
                    >
                      Sign in with Facebook
                    </Button>

                    <Button
                      fullWidth
                      size="md"
                      variant="outline"
                      color="gray"
                      radius="xl"
                      leftSection={<MdEmail size={20} />}
                      className="hover:bg-gray-800"
                      onClick={() => setShowEmailForm(true)}
                    >
                      Sign in with Email
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="emailForm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 relative"
                  >
                    <LoadingOverlay
                      visible={loading}
                      overlayProps={{ blur: 2 }}
                    />
                    <form onSubmit={form.onSubmit(handleEmailLogin)}>
                      <TextInput
                        label="Email"
                        placeholder="your@email.com"
                        className="mb-4"
                        radius="md"
                        {...form.getInputProps("email")}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        className="mb-6"
                        radius="md"
                        {...form.getInputProps("password")}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        size="md"
                        radius="xl"
                        color="indigo"
                        className="mb-4"
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="subtle"
                        fullWidth
                        size="md"
                        onClick={() => setShowEmailForm(false)}
                      >
                        Back to sign in options
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center">
                <p className="text-gray-300 text-base font-medium leading-6">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-indigo-400 font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side image with fade effect */}
          <div className="hidden lg:block relative min-h-screen">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
            <Image
              src="/login-bg.webp"
              alt="Curve design image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
    </main>
  );
};

export default LoginPage;
