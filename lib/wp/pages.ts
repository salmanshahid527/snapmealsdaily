import { cache } from "react";
import { Page } from "@/types";
import { fetchWp, fetchWpPaginated } from "./client";
import { WpPage } from "./types";
import { SLUG_FALLBACKS } from "@/lib/constants";
import { processPostBody } from "@/lib/html";

/**
 * Get single page by slug with fallback slugs
 */
export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    // Try primary slug first
    let pages = await fetchWp<WpPage[]>("/pages", {
      slug,
      number: 1,
    });

    // If not found, try fallback slugs
    if (!pages || pages.length === 0) {
      const fallbacks = SLUG_FALLBACKS[slug] || [];

      for (const fallback of fallbacks) {
        pages = await fetchWp<WpPage[]>("/pages", {
          slug: fallback,
          number: 1,
        });

        if (pages && pages.length > 0) {
          break;
        }
      }
    }

    if (!pages || pages.length === 0) {
      return null;
    }

    const page = pages[0];

    return {
      _id: String(page.id),
      title: page.title.rendered,
      slug: page.slug,
      content: processPostBody(page.content.rendered),
      excerpt: page.excerpt.rendered,
    };
  }
);

/**
 * Get all pages
 */
export const getAllPages = cache(async (): Promise<Page[]> => {
  const pages = await fetchWp<WpPage[]>("/pages", {
    per_page: 100,
    orderby: "menu_order",
    order: "asc",
  });

  return (
    pages?.map((page) => ({
      _id: String(page.id),
      title: page.title.rendered,
      slug: page.slug,
      content: processPostBody(page.content.rendered),
      excerpt: page.excerpt.rendered,
    })) || []
  );
});

/**
 * Get all pages for sitemap (paginated)
 */
export async function getAllPagesForSitemap(): Promise<
  Array<{ slug: string; modified?: string }>
> {
  const items: Array<{ slug: string; modified?: string }> = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const { data, totalPages: tp } = await fetchWpPaginated<WpPage[]>(
      "/pages",
      {
        per_page: 100,
        page,
      }
    );

    if (data) {
      data.forEach((p) => {
        items.push({
          slug: p.slug,
        });
      });
    }

    totalPages = tp;
    page++;
  }

  return items;
}
