import type { NextConfig } from "next";

// A fully static site: every route is prerendered at build time, so Cache Components is left off.
const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
