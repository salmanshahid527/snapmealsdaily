"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post } from "@/types";
import { searchPosts } from "@/lib/wp/post";

/**
 * Search posts by query
 */
export function useSearch(query: string): UseQueryResult<Post[]> {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPosts(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
