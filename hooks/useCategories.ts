"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "@/types";
import { fetchWpClient } from "@/lib/wp/client";
import { WpCategory } from "@/lib/wp/types";
import { mapWpCategoryToCategory } from "@/lib/wp/map";

/**
 * Fetch all categories
 */
export function useCategories(
  initialData?: Category[]
): UseQueryResult<Category[]> {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await fetchWpClient<WpCategory[]>("/categories", {
        per_page: 100,
        orderby: "count",
        order: "desc",
      });
      return categories?.map(mapWpCategoryToCategory) || [];
    },
    staleTime: initialData ? Infinity : 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
