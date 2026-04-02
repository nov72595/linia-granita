import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mcpServer: false,
    browserDebugInfoInTerminal: false,
  },
};

export default nextConfig;
