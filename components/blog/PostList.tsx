"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { PostGrid } from "./PostGrid";
import { PostMasonry } from "./PostMasonry";
import { LayoutGrid, Columns } from "lucide-react";
import type { Post, Category } from "@/types";
import { cn } from "@/lib/utils";

interface PostListProps {
  initialPosts?: Post[];
  initialCategories?: Category[];
}

export function PostList({ initialPosts, initialCategories }: PostListProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const { data: allPosts = [] } = usePosts({ initialData: initialPosts });
  const { data: categories = [] } = useCategories(initialCategories);

  const filtered = activeCategorySlug
    ? allPosts.filter((p) => p.category?.slug === activeCategorySlug)
    : allPosts;

  return (
    <div>
      {/* Filter + view toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategorySlug(null)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              !activeCategorySlug
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground-muted hover:border-primary hover:text-primary"
            )}
          >
            All Recipes
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() =>
                setActiveCategorySlug(
                  activeCategorySlug === cat.slug ? null : cat.slug
                )
              }
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                activeCategorySlug === cat.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground-muted hover:border-primary hover:text-primary"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg border border-border">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
            aria-label="Grid view"
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("masonry")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "masonry"
                ? "bg-primary text-primary-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
            aria-label="Masonry view"
            title="Masonry View"
          >
            <Columns size={18} />
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-foreground-muted">
          {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"} {activeCategorySlug && `in ${categories.find(c => c.slug === activeCategorySlug)?.title}`}
        </p>
      </div>

      {/* Posts grid/masonry */}
      {filtered.length > 0 ? (
        viewMode === "grid" ? (
          <PostGrid posts={filtered} />
        ) : (
          <PostMasonry posts={filtered} />
        )
      ) : (
        <div className="py-16 text-center">
          <p className="text-2xl mb-3">🔍</p>
          <p className="text-foreground font-medium mb-2">No recipes found</p>
          <p className="text-foreground-muted text-sm">
            Try selecting a different category or browse all recipes
          </p>
        </div>
      )}
    </div>
  );
}
