import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";
import { Providers } from "@/components/providers/Providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { getNavLinks } from "@/lib/wp/nav";
import { getCategories } from "@/lib/wp/categories";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Delicious Recipes & Food Inspiration`,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navLinks, categories] = await Promise.all([
    getNavLinks(),
    getCategories(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.snapmealsdaily.com" />
        <link rel="preconnect" href="https://secure.gravatar.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#FF8C42" />
      </head>
      <body>
        <Providers>
          <SiteHeader initialNavLinks={navLinks} initialCategories={categories} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
