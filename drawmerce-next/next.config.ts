import type { NextConfig } from "next";


import {ImageConfig} from "next/dist/server/image-config";

/** @type {ImageConfig} Allow images sourced from the correct paths **/
const images = {
    domains: ["www.pinterest.com", "www.freepik.com"],
};

const nextConfig: NextConfig = {
  /* config options here */
    // devIndicators: false
    images,
};


export default nextConfig;
