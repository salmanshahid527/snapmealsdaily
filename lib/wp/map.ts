import { Post, PostDetail, Category, Author } from "@/types";
import { WpPost, WpCategory, WpUser } from "./types";
import { decodeHtmlEntities, stripHtml, processPostBody } from "@/lib/html";
import { truncate } from "@/lib/utils";

/**
 * Map WordPress post to app Post type
 */
export function mapWpPostToPost(wp: WpPost): Post {
  const category = wp._embedded?.["wp:term"]?.[0]?.[0];
  const author = wp._embedded?.author?.[0];
  const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];

  // Handle both WordPress API format (with .rendered) and mock data format (direct strings)
  const title = typeof wp.title === 'string' ? wp.title : wp.title?.rendered || '';
  const excerpt = typeof wp.excerpt === 'string' ? wp.excerpt : wp.excerpt?.rendered || '';

  return {
    _id: String(wp.id),
    title: decodeHtmlEntities(title),
    slug: wp.slug,
    excerpt: truncate(stripHtml(excerpt), 160),
    category: category
      ? {
          _id: String(category.id),
          id: category.id,
          title: category.name,
          slug: category.slug,
        }
      : undefined,
    featuredImage: wp.featuredImage || featuredMedia?.source_url,
    featuredImageAlt: wp.featuredImageAlt || featuredMedia?.alt_text,
    featured: wp.featured !== undefined ? wp.featured : wp.sticky,
    publishedAt: wp.publishedAt || wp.date,
    author: wp.author || (author
      ? {
          name: author.name,
          image: author.avatar_urls?.["96"],
        }
      : undefined),
    modifiedAt: wp.modifiedAt || wp.modified,
  };
}

/**
 * Map WordPress post to app PostDetail type (includes body)
 */
export function mapWpPostToPostDetail(wp: WpPost): PostDetail {
  const post = mapWpPostToPost(wp);
  return {
    ...post,
    body: processPostBody(wp.content.rendered),
  };
}

/**
 * Map WordPress category to app Category type
 */
export function mapWpCategoryToCategory(wp: WpCategory): Category {
  return {
    _id: String(wp.id),
    id: wp.id,
    title: wp.name,
    slug: wp.slug,
    description: stripHtml(wp.description),
    count: wp.count,
  };
}

/**
 * Map WordPress user to app Author type
 */
export function mapWpUserToAuthor(wp: WpUser): Author {
  return {
    _id: String(wp.id),
    name: wp.name,
    bio: wp.description,
    image: wp.avatar_urls?.["96"],
  };
}
