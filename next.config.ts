import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.coverr.co",
      },
      {
        protocol: "https",
        hostname: "erotikshoptoptan.com",
      },
      {
        protocol: "https",
        hostname: "www.erotikshoptoptan.com",
      },
      {
        protocol: "https",
        hostname: "toptanerotikshop.com",
      },
      {
        protocol: "https",
        hostname: "www.toptanerotikshop.com",
      },
    ],
  },
};

export default nextConfig;
