"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { NavLink } from "@/types";
import { getNavLinks } from "@/lib/wp/nav";

/**
 * Fetch navigation links
 */
export function useNavLinks(
  initialData?: NavLink[] | null
): UseQueryResult<NavLink[]> {
  return useQuery({
    queryKey: ["nav-links"],
    queryFn: () => getNavLinks(),
    staleTime: initialData ? Infinity : 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData: initialData || undefined,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
