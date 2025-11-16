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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.erotikshoptoptan.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "toptanerotikshop.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.toptanerotikshop.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
