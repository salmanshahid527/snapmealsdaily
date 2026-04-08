import { cache } from "react";
import { Category } from "@/types";
import { fetchWp } from "./client";
import { WpCategory } from "./types";
import { mapWpCategoryToCategory } from "./map";

const CATEGORY_FIELDS = "id,name,slug,description,count";

export const getCategories = cache(async (): Promise<Category[]> => {
  const categories = await fetchWp<WpCategory[]>("/categories", {
    per_page: 100,
    orderby: "count",
    order: "desc",
    hide_empty: true,
    _fields: CATEGORY_FIELDS,
  });
  return categories.map(mapWpCategoryToCategory);
});

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const categories = await fetchWp<WpCategory[]>("/categories", {
      slug,
      _fields: CATEGORY_FIELDS,
    });
    if (!categories[0]) return null;
    return mapWpCategoryToCategory(categories[0]);
  }
);
