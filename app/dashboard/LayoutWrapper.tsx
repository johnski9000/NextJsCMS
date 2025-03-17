"use client"; // Mark as client-side

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mantine/core";
import { Drawer } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface LayoutWrapperProps {
  children: React.ReactNode;
  session: any; // Use your session type from next-auth.d.ts
}

export default function LayoutWrapper({
  children,
  session: initialSession,
}: LayoutWrapperProps) {
  const { data: session, status } = useSession(); // Still use useSession for client-side updates
  const [loading, setLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [scrolled] = useState(false); // Add scroll logic if needed
  const [opened, { open, close }] = useDisclosure(false);

  // Use initialSession from server if client-side session isn’t ready
  const effectiveSession = session || initialSession;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");
    // Add your Stripe checkout logic here if needed
    setLoading(false);
  };

  const handleSignOut = async () => {
    setSignOutLoading(true);
    setError("");
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (err) {
      setError("Sign-out failed: " + (err as Error).message);
      setSignOutLoading(false);
    }
  };

  if (status === "loading" && !effectiveSession) {
    return <div className="text-white">Loading...</div>;
  }

  const menuItems = [
    { href: "/dashboard/websites", label: "My Websites" },
    { href: "/dashboard/subscriptions", label: "Subscriptions" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/support", label: "Support" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-black"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/newLogo.png" alt="Logo" width={120} height={40} />
          </Link>

          <div className="flex md:order-2 space-x-3">
            <Button
              onClick={handleStripeCheckout}
              className="!hidden md:!block !font-medium text-sm px-4 py-2 !text-black !bg-orange-500"
              color="orange"
              variant="filled"
              leftSection={<IoMdAdd className="mr-2" size={20} />}
              disabled={loading || signOutLoading}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ea580c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f97316")
              }
            >
              {loading ? "Processing..." : "Add A Website"}
            </Button>
            {effectiveSession && (
              <Button color="red" variant="filled" onClick={handleSignOut}>
                Log Out
              </Button>
            )}
            <button
              type="button"
              className="md:hidden hover:text-orange-500 p-2 focus:outline-none"
              onClick={open}
            >
              <svg
                className="w-6 h-6 text-orange-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {opened ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          <Drawer
            position="right"
            size={200}
            opened={opened}
            onClose={close}
            title={<img src="/logo.png" className="h-24" alt="Logo" />}
            styles={{
              content: { backgroundColor: "#0a0a0a", color: "white" },
              header: { backgroundColor: "#0a0a0a", color: "white" },
            }}
          >
            <ul className="flex flex-col items-center space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-4 rounded-sm transition-all duration-300 text-white hover:text-orange-500`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <Button
                onClick={handleSignOut}
                className="!font-medium text-sm px-4 py-2 !text-black !bg-orange-500"
                style={{
                  backgroundColor: "#f97316",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                disabled={signOutLoading}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ea580c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f97316")
                }
              >
                {signOutLoading ? "Signing Out..." : "Logout"}
              </Button>
            </ul>
          </Drawer>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex flex-col md:flex-row md:space-x-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block py-2 px-4 text-white rounded-sm transition-all duration-300 hover:text-orange-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="pt-28">{children}</div>
    </>
  );
}
