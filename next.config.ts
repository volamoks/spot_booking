import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@services'] = path.join(__dirname, 'services');
    return config;
  },
};

export default nextConfig;
