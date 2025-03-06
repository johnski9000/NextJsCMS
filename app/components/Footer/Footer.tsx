import { formatProps } from "@/app/utils/formatProps";
import Link from "next/link";
import React from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

interface FooterProps {
  id: { value: string; active: boolean };
  logo?: { value: string; active: boolean };
  links?: Array<{
    label: { type: "string"; value: string; active: boolean };
    href: { type: "string"; value: string; active: boolean };
    active: boolean;
  }>;
  socialLinks?: Array<{
    platform: { type: "string"; value: string; active: boolean };
    href: { type: "string"; value: string; active: boolean };
    active: boolean;
  }>;
  copyrightText?: { value: string; active: boolean };
}

// Default props following structured format
const defaultFooter: FooterProps = {
  id: { value: "footer", active: true },
  logo: { value: "/logo.webp", active: true },
  links: [
    {
      label: { type: "string", value: "Pagedone", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      label: { type: "string", value: "Products", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      label: { type: "string", value: "Resources", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      label: { type: "string", value: "Blogs", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      label: { type: "string", value: "Support", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
  ],
  socialLinks: [
    {
      platform: { type: "string", value: "Twitter", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      platform: { type: "string", value: "Instagram", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      platform: { type: "string", value: "Facebook", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
    {
      platform: { type: "string", value: "YouTube", active: true },
      href: { type: "string", value: "/", active: true },
      active: true,
    },
  ],
  copyrightText: {
    value: "Setoria Security Ltd © YYYY, All rights reserved.",
    active: true,
  },
};

// Social Media Icon Mapping
const socialIcons: Record<string, JSX.Element> = {
  Twitter: <FaTwitter className="w-6 h-6" />,
  Instagram: <FaInstagram className="w-6 h-6" />,
  Facebook: <FaFacebook className="w-6 h-6" />,
  YouTube: <FaYoutube className="w-6 h-6" />,
};

const Footer: React.FC<FooterProps> = (props) => {
  // Merge default and passed props
  const formattedProps = formatProps(props);
  const mergedProps: FooterProps = {
    ...defaultFooter,
    ...formattedProps,
  };

  // Dynamically update copyright year
  const currentYear = new Date().getFullYear();
  const copyrightText = mergedProps.copyrightText?.active
    ? mergedProps.copyrightText.value.replace("YYYY", currentYear.toString())
    : "";

  return (
    <footer className="w-full py-20" id={mergedProps.id.value}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          {mergedProps.logo?.active && (
            <Link href="/">
              <img
                src={mergedProps.logo.value}
                alt="Company Logo"
                className="mx-auto"
              />
            </Link>
          )}

          {/* Navigation Links */}
          <ul className="text-lg flex flex-col gap-7 md:flex-row md:gap-12 justify-center transition-all duration-500 py-10 mb-10 border-b border-gray-200">
            {mergedProps.links?.value.map(
              (link, index) =>
                link.active &&
                link.label.active &&
                link.href.active && (
                  <li key={index}>
                    <Link href={link.href.value} className=" hover:">
                      {link.label.value}
                    </Link>
                  </li>
                )
            )}
          </ul>

          {/* Social Media Links with Icons */}
          <div className="flex space-x-6 justify-center items-center mb-10">
            {mergedProps.socialLinks?.value.map(
              (social, index) =>
                social.active &&
                social.platform.active &&
                social.href.active &&
                socialIcons[social.platform.value] && (
                  <Link
                    key={index}
                    href={social.href.value}
                    className=" hover:text-indigo-600 transition-all duration-300"
                    aria-label={social.platform.value}
                  >
                    {socialIcons[social.platform.value]}
                  </Link>
                )
            )}
          </div>

          {/* Copyright */}
          {copyrightText && (
            <span className="text-lg  text-center block">{copyrightText}</span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
