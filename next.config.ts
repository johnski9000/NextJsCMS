import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readymadeui.com",
        pathname: "**", // This allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
