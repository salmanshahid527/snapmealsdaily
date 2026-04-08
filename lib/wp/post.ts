import { cache } from "react";
import { BLOG_POSTS_PER_PAGE } from "@/lib/blogPagination";
import { fetchWp, fetchWpPaginated } from "./client";
import { mapWpPostToPost, mapWpPostToPostDetail } from "./map";
import { processPostBody } from "@/lib/html";
import type { WpPost } from "./types";
import type { Post, PostDetail } from "@/types";

const POST_LIST_FIELDS =
  "id,title,slug,excerpt,date,modified,sticky,categories,_links";
const POST_DETAIL_FIELDS =
  "id,title,slug,excerpt,content,date,modified,sticky,categories,_links";

/** Get single post by slug */
export const getPostBySlug = cache(async function (
  slug: string
): Promise<PostDetail | null> {
  const data = await fetchWp<WpPost[]>("/posts", {
    slug,
    per_page: 1,
    _embed: 1,
    _fields: POST_DETAIL_FIELDS,
  });
  if (!data[0]) return null;
  const detail = mapWpPostToPostDetail(data[0]);
  detail.body = processPostBody(detail.body);
  return detail;
});

/** Get all posts for blog listing (legacy / sitemap use) */
export const getPostsForBlog = cache(async function (): Promise<Post[]> {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    per_page: 50,
    orderby: "date",
    order: "desc",
    status: "publish",
  });
  return data.map(mapWpPostToPost);
});

export type BlogPostsPage = {
  posts: Post[];
  totalPages: number;
  total: number;
};

/** Get the single latest post — used for blog page OG metadata */
export const getLatestPostForBlogMeta = cache(async function (): Promise<Post | null> {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    per_page: 1,
    orderby: "date",
    order: "desc",
    status: "publish",
  });
  const wp = Array.isArray(data) ? data[0] : null;
  return wp ? mapWpPostToPost(wp) : null;
});

/** Paginated blog page fetch — used by blog/page.tsx and PostList */
export const getPostsForBlogPage = cache(async function (options: {
  page: number;
  perPage?: number;
  categoryId?: number;
}): Promise<BlogPostsPage> {
  const perPage = options.perPage ?? BLOG_POSTS_PER_PAGE;
  const page = Math.max(1, options.page);
  try {
    const params: Record<string, string | number | boolean> = {
      _embed: 1,
      _fields: POST_LIST_FIELDS,
      per_page: perPage,
      page,
      orderby: "date",
      order: "desc",
      status: "publish",
    };
    if (options.categoryId != null) {
      params.categories = options.categoryId;
    }
    const { data, totalPages, total } = await fetchWpPaginated<WpPost[]>(
      "/posts",
      params
    );
    const posts = Array.isArray(data) ? data.map(mapWpPostToPost) : [];
    return { posts, totalPages, total };
  } catch {
    return { posts: [], totalPages: 0, total: 0 };
  }
});

/** Get featured posts (latest 6) */
export const getFeaturedPosts = cache(async function (): Promise<Post[]> {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    per_page: 6,
    orderby: "date",
    order: "desc",
    status: "publish",
  });
  return data.map(mapWpPostToPost);
});

/** Get posts for a specific category by slug */
export const getPostsForCategoryBySlug = cache(async function (
  categorySlug: string
): Promise<Post[]> {
  const catData = await fetchWp<Array<{ id: number }>>("/categories", {
    slug: categorySlug,
    _fields: "id",
  });
  if (!catData[0]) return [];

  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    categories: catData[0].id,
    per_page: 50,
    orderby: "date",
    order: "desc",
    status: "publish",
  });
  return data.map(mapWpPostToPost);
});

/** Get posts for multiple categories in one batch request */
export const getPostsForMultipleCategories = cache(async function (
  categoryIds: number[],
  limitPerCategory: number
): Promise<Record<number, Post[]>> {
  if (categoryIds.length === 0) return {};

  const maxPosts = Math.min(categoryIds.length * limitPerCategory * 3, 100);
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    per_page: maxPosts,
    orderby: "date",
    order: "desc",
    status: "publish",
  });

  const idSet = new Set(categoryIds);
  const result: Record<number, Post[]> = {};
  const countByCategory: Record<number, number> = {};

  for (const id of categoryIds) {
    result[id] = [];
    countByCategory[id] = 0;
  }

  for (const wp of data) {
    for (const cid of wp.categories) {
      if (
        idSet.has(cid) &&
        (countByCategory[cid] ?? 0) < limitPerCategory
      ) {
        result[cid] = result[cid] ?? [];
        result[cid].push(mapWpPostToPost(wp));
        countByCategory[cid] = (countByCategory[cid] ?? 0) + 1;
      }
    }
  }

  return result;
});

/** Get related posts by category */
export const getRelatedPostsByCategory = cache(async function (
  categoryId: number,
  currentPostSlug: string,
  limit: number = 4
): Promise<Post[]> {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    categories: categoryId,
    per_page: limit + 1,
    orderby: "date",
    order: "desc",
    status: "publish",
  });

  return data
    .filter((p) => p.slug !== currentPostSlug)
    .slice(0, limit)
    .map(mapWpPostToPost);
});

/** Search posts by query */
export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return [];
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    _fields: POST_LIST_FIELDS,
    search: query,
    per_page: 20,
    status: "publish",
  });
  return data.map(mapWpPostToPost);
}

/** Paginate through ALL published posts — lightweight fields for sitemap only */
export async function getAllPostsForSitemap(): Promise<
  Array<{ slug: string; modified?: string }>
> {
  const fields = "slug,date,modified";
  const perPage = 100;

  const { data: firstPage, totalPages } = await fetchWpPaginated<
    Array<{ slug: string; modified: string }>
  >("/posts", {
    per_page: perPage,
    status: "publish",
    orderby: "date",
    order: "desc",
    _fields: fields,
    page: 1,
  });

  if (totalPages <= 1) return firstPage;

  const remaining = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      fetchWp<Array<{ slug: string; modified: string }>>("/posts", {
        per_page: perPage,
        status: "publish",
        orderby: "date",
        order: "desc",
        _fields: fields,
        page: i + 2,
      })
    )
  );

  return [firstPage, ...remaining].flat();
}
