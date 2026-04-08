"use client";

import { HeroParallax } from "./HeroParallax";
import { CategoryGrid } from "./CategoryGrid";
import { FeaturedPosts } from "./FeaturedPosts";
import { TrendingStrip } from "./TrendingStrip";
import { CategorySections } from "./CategorySections";
import { NewsletterCTA } from "./NewsletterCTA";
import type { Post, Category } from "@/types";

interface HomeSectionsProps {
  initialData: {
    categories: Category[];
    featuredPosts: Post[];
    postsByCategoryId: Record<number, Post[]>;
  };
}

export function HomeSections({ initialData }: HomeSectionsProps) {
  const { categories, featuredPosts, postsByCategoryId } = initialData;

  const postImages: Record<string, string> = {};
  for (const cat of categories) {
    const firstPost = postsByCategoryId[cat.id]?.[0];
    if (firstPost?.featuredImage) {
      postImages[cat.slug] = firstPost.featuredImage;
    }
  }

  return (
    <>
      <HeroParallax featuredPosts={featuredPosts} />
      <CategoryGrid categories={categories} postImages={postImages} />
      <FeaturedPosts posts={featuredPosts} />
      <TrendingStrip posts={featuredPosts.slice(0, 4)} />
      <CategorySections
        categories={categories}
        postsByCategoryId={postsByCategoryId}
      />
      <NewsletterCTA />
    </>
  );
}
