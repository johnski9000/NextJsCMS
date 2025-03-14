import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores all TypeScript errors during build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readymadeui.com",
        pathname: "**", // This allows all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "pub-174bad6a4f964482a3d0bb9a06f5f778.r2.dev",
        pathname: "**", // This allows all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "pagedone.io",
        pathname: "**", // This allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
