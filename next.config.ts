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
        hostname: "cozydecortip.com",
      },
      {
        protocol: "https",
        hostname: "api.cozydecortip.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.snapmealsdaily.com",
      },
    ],
  },
  rewrites: async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    const beforeFiles =
      apiUrl &&
      (apiUrl.startsWith("http://") || apiUrl.startsWith("https://"))
        ? [
            {
              source: "/wp-content/:path*",
              destination: `${apiUrl}/wp-content/:path*`,
            },
          ]
        : [];
    return { beforeFiles };
  },
};

export default nextConfig;
