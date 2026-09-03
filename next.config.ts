import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/port",
  assetPrefix: "/port/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
