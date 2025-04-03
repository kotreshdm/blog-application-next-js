import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Ensure TypeScript enforces types
  },
};

export default nextConfig;
