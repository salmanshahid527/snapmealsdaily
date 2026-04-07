import { cache } from "react";
import { Post, PostDetail, Page } from "@/types";
import { fetchWp, fetchWpPaginated, fetchWpClient } from "./client";
import { WpPost, WpPage } from "./types";
import { mapWpPostToPost, mapWpPostToPostDetail } from "./map";
import { stripHtml, removeFeaturedImageFromBody, extractFAQFromHtml } from "@/lib/html";

/**
 * Get single post by slug
 */
export const getPostBySlug = cache(
  async (slug: string): Promise<PostDetail | null> => {
    const posts = await fetchWp<WpPost[]>("/posts", {
      slug,
      _embed: true,
    });

    if (!posts || posts.length === 0) {
      return null;
    }

    const post = mapWpPostToPostDetail(posts[0]);

    // Remove featured image from body to prevent duplication
    if (post.body && post.featuredImage) {
      post.body = removeFeaturedImageFromBody(post.body, post.featuredImage);
    }

    return post;
  }
);

/**
 * Get all posts for blog listing
 */
export const getPostsForBlog = cache(async (): Promise<Post[]> => {
  const posts = await fetchWp<WpPost[]>("/posts", {
    per_page: 50,
    _embed: true,
    orderby: "date",
    order: "desc",
  });

  return posts?.map(mapWpPostToPost) || [];
});

/**
 * Get featured posts (latest 6)
 */
export const getFeaturedPosts = cache(async (): Promise<Post[]> => {
  const posts = await fetchWp<WpPost[]>("/posts", {
    per_page: 6,
    _embed: true,
    orderby: "date",
    order: "desc",
  });

  return posts?.map(mapWpPostToPost) || [];
});

/**
 * Get posts for a specific category by slug
 */
export const getPostsForCategoryBySlug = cache(
  async (categorySlug: string): Promise<Post[]> => {
    // First, get the category to get its ID
    const categories = await fetchWp<WpPost[]>("/categories", {
      slug: categorySlug,
      number: 1,
    });

    if (!categories || categories.length === 0) {
      return [];
    }

    const categoryId = (categories[0] as any).id;

    // Then fetch posts for that category
    const posts = await fetchWp<WpPost[]>("/posts", {
      categories: categoryId,
      per_page: 50,
      _embed: true,
      orderby: "date",
      order: "desc",
    });

    return posts?.map(mapWpPostToPost) || [];
  }
);

/**
 * Get posts for multiple categories
 */
export const getPostsForMultipleCategories = cache(
  async (
    categoryIds: number[],
    limitPerCategory: number = 4
  ): Promise<Record<number, Post[]>> => {
    const result: Record<number, Post[]> = {};

    for (const categoryId of categoryIds) {
      const posts = await fetchWp<WpPost[]>("/posts", {
        categories: categoryId,
        per_page: limitPerCategory,
        _embed: true,
        orderby: "date",
        order: "desc",
      });

      result[categoryId] = posts?.map(mapWpPostToPost) || [];
    }

    return result;
  }
);

/**
 * Get related posts by category
 */
export const getRelatedPostsByCategory = cache(
  async (
    categoryId: number,
    currentPostSlug: string,
    limit: number = 4
  ): Promise<Post[]> => {
    const posts = await fetchWp<WpPost[]>("/posts", {
      categories: categoryId,
      per_page: limit + 1,
      _embed: true,
      orderby: "date",
      order: "desc",
    });

    return (
      posts
        ?.filter((p) => p.slug !== currentPostSlug)
        .slice(0, limit)
        .map(mapWpPostToPost) || []
    );
  }
);

/**
 * Search posts by query
 */
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await fetchWpClient<WpPost[]>("/posts", {
    search: query,
    per_page: 20,
    _embed: true,
  });

  return posts?.map(mapWpPostToPost) || [];
}

/**
 * Get all posts for sitemap (paginated)
 */
export async function getAllPostsForSitemap(): Promise<
  Array<{ slug: string; modified?: string }>
> {
  const items: Array<{ slug: string; modified?: string }> = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const { data, totalPages: tp } = await fetchWpPaginated<WpPost[]>(
      "/posts",
      {
        per_page: 100,
        page,
      }
    );

    if (data) {
      data.forEach((post) => {
        items.push({
          slug: post.slug,
          modified: post.modified,
        });
      });
    }

    totalPages = tp;
    page++;
  }

  return items;
}
