"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGlobe,
  FaFileAlt,
  FaPalette,
  FaSearch,
  FaCog,
  FaCreditCard,
  FaUsers,
  FaServer,
  FaChartLine,
  FaLifeRing,
} from "react-icons/fa";

function MenuItems() {
  const pathname = usePathname();

  const menuItems = [
    // Core CMS Functionality
    {
      icon: <FaGlobe className="w-5 h-5" />,
      label: "Sites",
      link: "/dashboard/sites",
      slug: "sites",
    },
    {
      icon: <FaFileAlt className="w-5 h-5" />,
      label: "Pages",
      link: "/dashboard/pages",
      slug: "pages",
    },
    {
      icon: <FaPalette className="w-5 h-5" />,
      label: "Templates",
      link: "/dashboard/templates",
      slug: "templates",
    },

    // SEO & Analytics
    {
      icon: <FaSearch className="w-5 h-5" />,
      label: "SEO Tools",
      link: "/dashboard/seo",
      slug: "seo",
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      label: "Analytics",
      link: "/dashboard/analytics",
      slug: "analytics",
    },

    // System
    {
      icon: <FaServer className="w-5 h-5" />,
      label: "Hosting",
      link: "/dashboard/hosting",
      slug: "hosting",
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      label: "Team",
      link: "/dashboard/team",
      slug: "team",
    },

    // Account
    {
      icon: <FaCreditCard className="w-5 h-5" />,
      label: "Billing",
      link: "/dashboard/billing",
      slug: "billing",
    },
    {
      icon: <FaCog className="w-5 h-5" />,
      label: "Settings",
      link: "/dashboard/settings",
      slug: "settings",
    },
    {
      icon: <FaLifeRing className="w-5 h-5" />,
      label: "Support",
      link: "/dashboard/support",
      slug: "support",
    },
  ];

  return (
    <ul className="space-y-1 font-medium p-2">
      {menuItems.map((item, index) => {
        const isActive =
          pathname === item.link ||
          (item.slug && pathname.startsWith(`/dashboard/${item.slug}`));

        return (
          <li key={index}>
            <Link
              href={item.link}
              className={`flex items-center p-3 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-orange-100 text-orange-700 font-semibold"
                  : "text-gray-200 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MenuItems;
