import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // If you still hit TS type errors later and need to ship fast, uncomment:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
