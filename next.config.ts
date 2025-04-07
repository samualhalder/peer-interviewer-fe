import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Corrected hostname
        port: "",
        pathname: "/**", // Allows all paths; adjust if you need specific subdirectories
      },
    ],
  },
};

export default nextConfig;
