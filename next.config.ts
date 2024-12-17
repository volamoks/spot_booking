import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    return config;
  },
};

export default nextConfig;
