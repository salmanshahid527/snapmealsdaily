import { HeroParallax } from "./HeroParallax";
import { CategoryGrid } from "./CategoryGrid";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategorySections } from "./CategorySections";
import AdUnit from "@/components/ads/AdUnit";
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
      <div className="my-4 flex justify-center">
        <AdUnit type="leaderboard" className="hidden md:block" />
        <AdUnit type="mobileBanner" className="md:hidden" />
      </div>
      <CategoryGrid categories={categories} postImages={postImages} />
      <FeaturedPosts posts={featuredPosts} />
      <AdUnit type="nativeBanner" className="my-6" />
      <CategorySections
        categories={categories}
        postsByCategoryId={postsByCategoryId}
      />
    </>
  );
}
