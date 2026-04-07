import { cache } from "react";
import { Author } from "@/types";
import { fetchWp } from "./client";
import { WpUser } from "./types";
import { mapWpUserToAuthor } from "./map";

/**
 * Get site author (first user)
 */
export const getAuthor = cache(async (): Promise<Author | null> => {
  const users = await fetchWp<WpUser[]>("/users", {
    per_page: 1,
  });

  if (!users || users.length === 0) {
    return null;
  }

  return mapWpUserToAuthor(users[0]);
});
