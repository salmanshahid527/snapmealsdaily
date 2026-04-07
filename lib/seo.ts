import { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./constants";

/**
 * Build absolute URL from relative path
 */
export function buildAbsoluteUrl(path: string): string {
  const baseUrl = SITE_URL;
  if (path.startsWith("http")) return path;
  if (!baseUrl) return path;
  return new URL(path, baseUrl).toString();
}

/**
 * Get absolute OG image URL
 */
export function buildOgImage(imageUrl?: string | null): string {
  if (!imageUrl) return DEFAULT_OG_IMAGE;
  if (imageUrl.startsWith("http")) return imageUrl;
  return imageUrl;
}

/**
 * Build metadata for blog posts
 */
export function buildPostMetadata(options: {
  title: string;
  description?: string;
  slug: string;
  imageUrl?: string;
  publishedAt?: string;
  modifiedAt?: string;
  authorName?: string;
  categoryTitle?: string;
}): Metadata {
  const {
    title,
    description,
    slug,
    imageUrl,
    publishedAt,
    modifiedAt,
    authorName,
    categoryTitle,
  } = options;

  const url = buildAbsoluteUrl(`/${slug}`);
  const ogImage = buildOgImage(imageUrl);

  return {
    title: `${title} | ${SITE_NAME}`,
    description: description || SITE_NAME,
    openGraph: {
      type: "article",
      url,
      title,
      description: description || SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      authors: authorName ? [authorName] : undefined,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      tags: categoryTitle ? [categoryTitle] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || SITE_NAME,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Build metadata for category pages
 */
export function buildCategoryMetadata(options: {
  title: string;
  description?: string;
  slug: string;
  imageUrl?: string;
}): Metadata {
  const { title, description, slug, imageUrl } = options;
  const url = buildAbsoluteUrl(`/category/${slug}`);
  const ogImage = buildOgImage(imageUrl);

  return {
    title: `${title} | ${SITE_NAME}`,
    description: description || `Explore ${title} recipes on ${SITE_NAME}`,
    openGraph: {
      type: "website",
      url,
      title,
      description: description || `Explore ${title} recipes`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || `Explore ${title} recipes`,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
