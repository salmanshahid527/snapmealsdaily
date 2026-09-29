import { cache } from "react";
import { Author } from "@/types";
import { fetchWp } from "./client";
import { WpUser } from "./types";
import { mapWpUserToAuthor } from "./map";

/**
 * Get site author: the author embedded in the latest post.
 * /wp/v2/users is blocked at Cloudflare (user-enumeration rule); embeds are resolved inside WordPress.
 */
export const getAuthor = cache(async (): Promise<Author | null> => {
  const posts = await fetchWp<{ _embedded?: { author?: WpUser[] } }[]>("/posts", {
    per_page: 1,
    _embed: "author",
    _fields: "id,_links,_embedded",
  });

  const user = posts?.[0]?._embedded?.author?.[0];
  if (!user?.name) {
    return null;
  }

  return mapWpUserToAuthor(user);
});
