import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Allow any HTTPS image domain (WordPress, CDNs, Unsplash, Gravatar, etc.)
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
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
