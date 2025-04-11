import type { NextConfig } from "next";

const images = {
    domains: ["www.pinterest.com", "www.freepik.com"],
};

const nextConfig: NextConfig = {
  /* config options here */
    // devIndicators: false
    images,
};


export default nextConfig;
