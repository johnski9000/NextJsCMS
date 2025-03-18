"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to get current URL
import React from "react";
import { FaGlobe, FaCreditCard, FaCog, FaHeadset } from "react-icons/fa";

function MenuItems({ session }) {
  const pathname = usePathname(); // Get current route


  const dashboardItems = [
    {
      icon: <FaGlobe className="w-5 h-5" />,
      label: "My Websites",
      link: "/dashboard",
    },
    {
      icon: <FaCreditCard className="w-5 h-5" />,
      label: "Subscriptions",
      link: "/dashboard/subscriptions",
    },
    {
      icon: <FaCog className="w-5 h-5" />,
      label: "Account",
      link: "/dashboard/account",
    },
    {
      icon: <FaHeadset className="w-5 h-5" />,
      label: "Support",
      link: "/dashboard/support",
    },
  ];

  return (
    <ul className="space-y-2 font-medium p-4">
      {dashboardItems.map((item, index) => {
        const isActive = pathname === item.link; // Check if the current page matches the menu item

        return (
          <li
            key={index}
            className={`group flex items-center relative px-2 py-3 rounded-lg transition ${
              isActive
                ? "bg-orange-500 text-white" // Active state styling
                : "text-gray-500 hover:bg-orange-300 dark:hover:bg-gray-700"
            }`}
          >
            <Link
              href={item.link}
              className="inline-flex items-center w-full text-xs font-semibold transition-colors duration-150"
            >
              {item.icon}
              <span className="ml-4">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MenuItems;
