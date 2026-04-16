import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { getCategories } from "@/lib/wp/categories";
import { getFeaturedPosts, getPostsForMultipleCategories } from "@/lib/wp/post";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  POSTS_PER_CATEGORY_HOME,
} from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} — Recipes & Food Inspiration`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default async function HomePage() {
  const [categories, featuredPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(),
  ]);

  const categoryIds = categories.map((c) => c.id);
  const postsByCategoryId = await getPostsForMultipleCategories(
    categoryIds,
    POSTS_PER_CATEGORY_HOME
  );

  return (
    <HomeSections
      initialData={{ categories, featuredPosts, postsByCategoryId }}
    />
  );
}
