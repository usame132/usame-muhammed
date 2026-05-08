import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: true, // Enable Turbopack
  },
};

export default nextConfig;