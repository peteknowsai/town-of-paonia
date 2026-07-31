import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // /budget serves the standalone finance narrative from public/budget.html
    return [{ source: "/budget", destination: "/budget.html" }];
  },
};

export default nextConfig;
