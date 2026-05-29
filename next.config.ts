import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.coolstay.co.kr" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "http", hostname: "cdn.coolstay.co.kr" },
    ],
  },
};

export default nextConfig;
