import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // static HTML export — required for Cloudflare Pages
  trailingSlash: true,    // wikima.pages.dev/booking/ instead of /booking
  images: {
    unoptimized: true,    // Cloudflare Pages doesn't support Next.js image optimisation
  },
};

export default nextConfig;
