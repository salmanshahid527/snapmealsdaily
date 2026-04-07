"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostDetail } from "@/types";
import { fetchWpClient } from "@/lib/wp/client";
import { WpPost } from "@/lib/wp/types";
import { mapWpPostToPost, mapWpPostToPostDetail } from "@/lib/wp/map";

/**
 * Fetch all blog posts
 */
export function usePosts(options?: {
  initialData?: Post[];
}): UseQueryResult<Post[]> {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await fetchWpClient<WpPost[]>("/posts", {
        per_page: 50,
        _embed: true,
        orderby: "date",
        order: "desc",
      });
      return posts.map(mapWpPostToPost);
    },
    staleTime: options?.initialData ? Infinity : 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData: options?.initialData,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

/**
 * Fetch single post by slug
 */
export function usePost(
  slug: string | null,
  initialData?: PostDetail | null
): UseQueryResult<PostDetail | null> {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!slug) return null;
      const posts = await fetchWpClient<WpPost[]>("/posts", {
        slug,
        _embed: true,
      });
      if (!posts || posts.length === 0) return null;
      return mapWpPostToPostDetail(posts[0]);
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

/**
 * Fetch posts for specific category
 */
export function usePostsForCategory(
  categoryId: number
): UseQueryResult<Post[]> {
  return useQuery({
    queryKey: ["posts-category", categoryId],
    queryFn: async () => {
      const posts = await fetchWpClient<WpPost[]>("/posts", {
        categories: categoryId,
        per_page: 50,
        _embed: true,
      });
      return posts?.map(mapWpPostToPost) || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Fetch featured posts
 */
export function useFeaturedPosts(initialData?: Post[]): UseQueryResult<Post[]> {
  return useQuery({
    queryKey: ["featured-posts"],
    queryFn: async () => {
      const posts = await fetchWpClient<WpPost[]>("/posts", {
        per_page: 6,
        _embed: true,
        orderby: "date",
        order: "desc",
      });
      return posts?.map(mapWpPostToPost) || [];
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
