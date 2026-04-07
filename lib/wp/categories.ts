import { cache } from "react";
import { Category } from "@/types";
import { fetchWp } from "./client";
import { WpCategory } from "./types";
import { mapWpCategoryToCategory } from "./map";

/**
 * Get all categories sorted by post count
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  const categories = await fetchWp<WpCategory[]>("/categories", {
    per_page: 100,
    orderby: "count",
    order: "desc",
  });

  return categories?.map(mapWpCategoryToCategory) || [];
});

/**
 * Get single category by slug
 */
export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const categories = await fetchWp<WpCategory[]>("/categories", {
      slug,
      number: 1,
    });

    if (!categories || categories.length === 0) {
      return null;
    }

    return mapWpCategoryToCategory(categories[0]);
  }
);
