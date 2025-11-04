import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  } /* config options here */,
  images: {
    domains: ["images.unsplash.com"], // ← Unsplash images को domain allow गरियो
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*", // Node.js API server
      },
    ];
  },
};

export default nextConfig;
