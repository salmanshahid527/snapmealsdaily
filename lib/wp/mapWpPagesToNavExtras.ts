import { NavLink } from "@/types";
import { WpPage } from "./types";
import { SLUG_TO_PATH, NAV_EXCLUDED_PAGE_SLUGS } from "@/lib/constants";

/**
 * Map WordPress pages to navigation links
 */
export function mapWpPagesToNavExtras(pages: WpPage[]): NavLink[] {
  const links: NavLink[] = [];
  const seenHrefs = new Set<string>();

  pages.forEach((page) => {
    // Skip excluded slugs
    if (NAV_EXCLUDED_PAGE_SLUGS.includes(page.slug)) {
      return;
    }

    // Map slug to app path
    const href = SLUG_TO_PATH[page.slug] || `/${page.slug}`;

    // Deduplicate by href
    if (seenHrefs.has(href)) {
      return;
    }

    seenHrefs.add(href);

    links.push({
      label: page.title.rendered,
      href,
    });
  });

  return links;
}
