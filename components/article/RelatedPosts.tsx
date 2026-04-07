"use client";

import { PostGrid } from "@/components/blog/PostGrid";
import type { Post } from "@/types";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-orange-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2 font-display">
          More Recipes Like This
        </h3>
        <p className="text-foreground-muted">
          Check out these similar recipes you might enjoy
        </p>
      </div>
      <PostGrid posts={posts} />
    </section>
  );
}
