import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "snapmealsdaily.com",
      },
      {
        protocol: "https",
        hostname: "www.snapmealsdaily.com",
      },
      {
        protocol: "https",
        hostname: "api.snapmealsdaily.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  rewrites: async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    // Strip /wp-json suffix to get origin for wp-content rewrite
    const wpOrigin = apiUrl ? apiUrl.replace(/\/wp-json$/i, "") : "";
    const beforeFiles =
      wpOrigin &&
      (wpOrigin.startsWith("http://") || wpOrigin.startsWith("https://"))
        ? [
            {
              source: "/wp-content/:path*",
              destination: `${wpOrigin}/wp-content/:path*`,
            },
          ]
        : [];
    return { beforeFiles };
  },
};

export default nextConfig;
