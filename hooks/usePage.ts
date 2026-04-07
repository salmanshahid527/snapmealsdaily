"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Page } from "@/types";
import { fetchWpClient } from "@/lib/wp/client";
import { WpPage } from "@/lib/wp/types";
import { processPostBody } from "@/lib/html";

/**
 * Fetch single page by slug
 */
export function usePage(
  slug: string | null,
  initialData?: Page | null
): UseQueryResult<Page | null> {
  return useQuery({
    queryKey: ["page", slug],
    queryFn: async () => {
      if (!slug) return null;
      const pages = await fetchWpClient<WpPage[]>("/pages", {
        slug,
        number: 1,
      });
      if (!pages || pages.length === 0) return null;

      const page = pages[0];
      return {
        _id: String(page.id),
        title: page.title.rendered,
        slug: page.slug,
        content: processPostBody(page.content.rendered),
        excerpt: page.excerpt.rendered,
      };
    },
    enabled: !!slug,
    staleTime: initialData ? Infinity : 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData: initialData || undefined,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
