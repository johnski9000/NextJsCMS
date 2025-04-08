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
} from "react-icons/fi";

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
      title: "Kanban",
      href: "/kanban",
      icon: <FiGrid className="w-5 h-5" />,
      badge: {
        text: "Pro",
        variant: "secondary",
      },
    },
    {
      title: "Inbox",
      href: "/inbox",
      icon: <FiMail className="w-5 h-5" />,
      badge: {
        text: "3",
        variant: "primary",
      },
    },
    {
      title: "Users",
      href: "/users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      title: "Products",
      href: "/products",
      icon: <FiShoppingBag className="w-5 h-5" />,
    },
    {
      title: "Sign In",
      href: "/signin",
      icon: <FiLogIn className="w-5 h-5" />,
    },
    {
      title: "Sign Up",
      href: "/signup",
      icon: <FiUserPlus className="w-5 h-5" />,
    },
  ];

  // User dropdown menu items
  const userMenuItems: UserMenuItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Settings", href: "/settings" },
    { title: "Earnings", href: "/earnings" },
    { title: "Sign out", href: "/signout" },
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
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/" className="flex ms-2 md:me-24">
                <img
                  src="/api/placeholder/150/50"
                  className="h-8 me-3"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex gap-2 items-center ms-3">
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/api/placeholder/32/32"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      User Name
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      user.email@example.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    {userMenuItems.map((item, index) => (
                      <li key={`user-menu-${index}`}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={`sidebar-item-${index}`}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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

      <div className="lg:pl-64 pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default SideBar;
