"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { formatProps } from "@/app/utils/formatProps";
import Image from "next/image";
import { Button, Drawer } from "@mantine/core";

interface NavItem {
  label: {
    type: string;
    value: string;
    active: boolean;
  };
  href: {
    type: string;
    value: string;
    active: boolean;
  };
}

interface NavProps {
  id: {
    type: string;
    value: string;
    active: boolean;
  };
  logo: {
    type: string;
    format: string;
    value: string;
    active: boolean;
  };
  menuItems: {
    type: string;
    value: NavItem[];
    active: boolean;
  };
  cta_1: {
    type: string;
    value: string;
    active: boolean;
  };
  ctaUrl_1: {
    type: string;
    value: string;
    active: boolean;
  };
  cta_2: {
    type: string;
    value: string;
    active: boolean;
  };
  ctaUrl_2: {
    type: string;
    value: string;
    active: boolean;
  };
}

const defaultNav: NavProps = {
  id: { type: "string", value: "modern-nav", active: true },
  logo: {
    type: "image",
    format: "image",
    value: "/logo.webp",
    active: true,
  },
  menuItems: {
    type: "array",
    value: [
      {
        label: {
          type: "string",
          value: "Home",
          active: true,
        },
        href: {
          type: "string",
          value: "/",
          active: true,
        },
      },
      {
        label: {
          type: "string",
          value: "About Us",
          active: true,
        },
        href: {
          type: "string",
          value: "/about",
          active: true,
        },
      },
      {
        label: {
          type: "string",
          value: "Products",
          active: true,
        },
        href: {
          type: "string",
          value: "/products",
          active: true,
        },
      },
      {
        label: {
          type: "string",
          value: "Features",
          active: true,
        },
        href: {
          type: "string",
          value: "/features",
          active: true,
        },
      },
    ],
    active: true,
  },
  cta_1: { type: "string", value: "Log In", active: true },
  ctaUrl_1: { type: "string", value: "/login", active: true },
  cta_2: { type: "string", value: "Sign Up", active: true },
  ctaUrl_2: { type: "string", value: "/signup", active: true },
};

const ModernNav: React.FC<NavProps & { isPreview?: boolean }> = (props) => {
  const { isPreview } = props;
  console.log(props);
  const mergedProps = { ...defaultNav, props };
  console.log(mergedProps);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`px-4 border-b-default border-solid border-gray-200 z-40 fixed top-0 ${
        session && !isPreview ? "left-[250px] w-[calc(100%-250px)]" : "w-full"
      } ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      } transition-all duration-300`}
      id="topnav"
    >
      <div className="mx-auto w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex justify-between lg:hidden px-4">
            <Link href="/" className="flex items-center">
              <Image
                src={mergedProps.logo.value}
                alt="logo"
                width={84}
                height={33}
              />
            </Link>
            <button
              type="button"
              className="lg:hidden  hover:text-white p-2 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
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
            {/* Mobile Drawer Navigation */}
            <Drawer
              position="right"
              size={200}
              opened={menuOpen}
              onClose={() => setMenuOpen(false)}
              title={
                <img src={mergedProps.logo.value} className="h-24" alt="Logo" />
              }
              styles={{
                content: { backgroundColor: "#161a1d", color: "white" },
                header: { backgroundColor: "#161a1d", color: "white" },
              }}
            >
              <ul className="flex flex-col items-center space-y-4">
                {mergedProps.menuItems?.value.map((item, index) => (
                  <li key={index} className="w-full text-center text-sm">
                    <Link
                      href={item.href.value}
                      className={` block py-2 px-4 rounded-sm transition-all duration-300 ${
                        item.label.value === "Contact"
                          ? "bg-[rgba(209,159,78,1)]  font-bold rounded-md hover:bg-opacity-80"
                          : "text-white hover:text-[rgba(209,159,78,1)]"
                      }`}
                    >
                      {item.label.value}
                    </Link>
                  </li>
                ))}
                <Link href={mergedProps.ctaUrl_1.value}>
                  {" "}
                  <button className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                    {mergedProps.cta_1.value}
                  </button>
                </Link>
                <Link href={mergedProps.ctaUrl_2.value}>
                  <button className="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700">
                    {mergedProps.cta_2.value}
                  </button>
                </Link>
              </ul>
            </Drawer>
          </div>
          <div
            className="hidden w-full lg:flex justify-between max-lg:bg-white py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200 "
            id="navbar"
          >
            <ul className="flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row gap-4">
              {mergedProps.menuItems.value.map((item, index) => {
                return (
                  <li key={index} className={`flex items-center`}>
                    <Link
                      href={item.href.value}
                      className={`${isPreview && "!text-black"} ${
                        scrolled
                          ? "text-gray-900 hover:text-gray-900 hover:font-[500]"
                          : "text-white hover:text-white hover:font-[500]"
                      }  text-sm `}
                    >
                      {item.label.value}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/" className="hidden lg:flex items-center">
              <Image
                src={mergedProps.logo.value}
                alt="logo"
                width={84}
                height={33}
              />
            </Link>
            <div className="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 lg:flex-1 lg:justify-end">
              <Link href={mergedProps.ctaUrl_1.value}>
                {" "}
                <button className="bg-indigo-50 text-indigo-600 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm hover:bg-indigo-100">
                  {mergedProps.cta_1.value}
                </button>
              </Link>
              <Link href={mergedProps.ctaUrl_2.value}>
                <button className="bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700">
                  {mergedProps.cta_2.value}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNav;
