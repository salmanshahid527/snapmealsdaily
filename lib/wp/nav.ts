import { NavLink } from "@/types";
import { fetchWp } from "./client";
import { WpPage } from "./types";
import { mapWpPagesToNavExtras } from "./mapWpPagesToNavExtras";

/**
 * Get navigation links
 * Static prefix + WordPress pages
 */
export const getNavLinks = async (): Promise<NavLink[]> => {
  const staticLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const pages = await fetchWp<WpPage[]>("/pages", {
    per_page: 100,
    status: "publish",
  });

  const pageLinks = pages ? mapWpPagesToNavExtras(pages) : [];

  return [...staticLinks, ...pageLinks];
};
