"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { formatProps } from "@/app/utils/formatProps";

interface CenteredNavProps {
  id: { value: string; active: boolean };
  logo?: { value: string; active: boolean };
  menuItems?: Array<{
    label: { value: string; active: boolean };
    href: { value: string; active: boolean };
  }>;
  cta?: { value: string; active: boolean };
  ctaUrl?: { value: string; active: boolean };
}

const defaultNav: CenteredNavProps = {
  id: { value: "centered-nav", active: true },
  logo: { value: "/logo.webp", active: true },
  menuItems: [
    {
      label: { value: "Home", active: true },
      href: { value: "/", active: true },
    },
    {
      label: { value: "About", active: true },
      href: { value: "/about", active: true },
    },
    {
      label: { value: "Contact", active: true },
      href: { value: "/contact", active: true },
    },
  ],
  cta: { value: "Get Started", active: true },
  ctaUrl: { value: "/get-started", active: true },
};

const CenteredNav: React.FC<CenteredNavProps> = (props) => {
  const formattedProps = formatProps(props);

  const mergedProps = { ...defaultNav, ...formattedProps };
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      id={mergedProps.id.value}
    >
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        {mergedProps.logo?.active && (
          <Link href="/" className="flex items-center space-x-3">
            <img src={mergedProps.logo.value} className="h-24" alt="Logo" />
          </Link>
        )}

        {/* CTA Button + Mobile Toggle */}
        <div className="flex md:order-2 space-x-3">
          <Link href={mergedProps.ctaUrl.value}>
            <Button
              className="!hidden md:!block ! font-medium text-sm px-4 py-2 !text-black !bg-[rgba(209,159,78,1)]"
              style={{
                backgroundColor: "rgba(209,159,78,1)",
                borderRadius: "8px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(161, 156, 76)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(209,159,78,1)")
              }
            >
              {mergedProps.cta.value}
            </Button>
          </Link>
          {/* Mobile menu toggle button */}
          <button
            type="button"
            className="md:hidden  hover:text-white p-2 focus:outline-none"
            onClick={open}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
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

        {/* Mobile Drawer Navigation */}
        <Drawer
          position="right"
          size={200}
          opened={opened}
          onClose={close}
          title={<img src="/logo.webp" className="h-24" alt="Logo" />}
          styles={{
            content: { backgroundColor: "#161a1d", color: "white" },
            header: { backgroundColor: "#161a1d", color: "white" },
          }}
        >
          <ul className="flex flex-col items-center space-y-4">
            {mergedProps.menuItems?.value?.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href.value}
                  className={`block py-2 px-4 rounded-sm transition-all duration-300 ${
                    item.label === "Contact"
                      ? "bg-[rgba(209,159,78,1)]  font-bold rounded-md hover:bg-opacity-80"
                      : "text-white hover:text-[rgba(209,159,78,1)]"
                  }`}
                >
                  {item.label.value}
                </Link>
              </li>
            ))}
            <Link href={mergedProps.ctaUrl.value}>
              <Button
                className=" ! font-medium text-sm px-4 py-2 !text-black !bg-[rgba(209,159,78,1)]"
                style={{
                  backgroundColor: "rgba(209,159,78,1)",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(161, 156, 76)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(209,159,78,1)")
                }
              >
                {mergedProps.cta.value}
              </Button>
            </Link>
          </ul>
        </Drawer>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex flex-col md:flex-row md:space-x-8">
            {mergedProps.menuItems?.value?.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href.value}
                  className="block py-2 px-4 text-white rounded-sm transition-all duration-300 hover:text-[rgba(209,159,78,1)]"
                >
                  {item.label.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CenteredNav;
