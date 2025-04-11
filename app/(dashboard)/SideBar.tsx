"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiGrid,
  FiMail,
  FiUsers,
  FiShoppingBag,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiFileText,
  FiGlobe,
  FiLayout,
  FiSearch,
  FiLink,
  FiBarChart2,
  FiImage,
  FiSettings,
} from "react-icons/fi";
import UserAvatar from "./UserAvatar";

interface SideBarProps {
  children: React.ReactNode;
}

interface MenuItem {
  title: string;
  href: string;
  icon: JSX.Element;
  badge?: {
    text: string;
    variant:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info";
  };
}

interface UserMenuItem {
  title: string;
  href: string;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Menu items as constants for better maintainability
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <FiHome className="w-5 h-5" />,
    },
    {
      title: "Websites",
      href: "/websites",
      icon: <FiGlobe className="w-5 h-5" />,
    },
    {
      title: "Pages",
      href: "/pages",
      icon: <FiFileText className="w-5 h-5" />,
    },
    {
      title: "Templates",
      href: "/templates",
      icon: <FiLayout className="w-5 h-5" />,
    },
    {
      title: "SEO",
      href: "/seo",
      icon: <FiSearch className="w-5 h-5" />,
      badge: {
        text: "Pro",
        variant: "secondary",
      },
    },
    {
      title: "Domains",
      href: "/domains",
      icon: <FiLink className="w-5 h-5" />,
      badge: {
        text: "Pro",
        variant: "secondary",
      },
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <FiBarChart2 className="w-5 h-5" />,
    },
    {
      title: "Media",
      href: "/media",
      icon: <FiImage className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <FiSettings className="w-5 h-5" />,
    }
  ];



  const renderBadge = (badge: MenuItem["badge"]) => {
    if (!badge) return null;

    const badgeClasses = {
      primary: "text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
      secondary:
        "text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300",
      success:
        "text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300",
      danger: "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300",
      warning:
        "text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
      info: "text-indigo-800 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300",
    };

    const classes = badgeClasses[badge.variant];

    return (
      <span
        className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${classes}`}
      >
        {badge.text}
      </span>
    );
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b  bg-black border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/" className="flex ms-2 md:me-24">
                <img src="/desktopLogo.png" className="h-12 me-3" alt="Logo" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex gap-2 items-center ms-3">
                <UserAvatar/>
                <button
                  onClick={toggleMobileMenu}
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open sidebar</span>
                  <FiMenu className="w-6 h-6" />
                </button> 
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-52 h-screen pt-20 transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }  border-r  sm:translate-x-0 bg-black border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto overflow-x-hidden bg-black">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={`sidebar-item-${index}`}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <span className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    {item.icon}
                  </span>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.title}
                  </span>
                  {item.badge && renderBadge(item.badge)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="lg:pl-56 pt-20 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default SideBar;
