// next.config.js hoặc next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bochu.store",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
