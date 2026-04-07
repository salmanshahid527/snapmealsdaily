"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Author } from "@/types";
import { fetchWpClient } from "@/lib/wp/client";
import { WpUser } from "@/lib/wp/types";
import { mapWpUserToAuthor } from "@/lib/wp/map";

/**
 * Fetch site author
 */
export function useAuthor(
  initialData?: Author | null
): UseQueryResult<Author | null> {
  return useQuery({
    queryKey: ["author"],
    queryFn: async () => {
      const users = await fetchWpClient<WpUser[]>("/users", {
        per_page: 1,
      });
      if (!users || users.length === 0) return null;
      return mapWpUserToAuthor(users[0]);
    },
    staleTime: initialData ? Infinity : 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData: initialData || undefined,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
