import type { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import { getAllPagesForSitemap } from "@/lib/wp/pages";
import { SITE_URL, SLUG_TO_PATH } from "@/lib/constants";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, wpPages] = await Promise.all([
    getAllPostsForSitemap(),
    getCategories(),
    getAllPagesForSitemap(),
  ]);

  const now = new Date();

  const homepage: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const pageEntries: MetadataRoute.Sitemap = wpPages.map((p) => {
    const path = SLUG_TO_PATH[p.slug] ?? `/${p.slug}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: p.modified ? new Date(p.modified) : now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
  });

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...homepage, ...blogIndex, ...pageEntries, ...categoryEntries, ...postEntries];
}
