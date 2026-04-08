/**
 * WordPress REST API Type Definitions
 */

export interface WpPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  status: string;
  title: string | { rendered: string };
  content: { rendered: string };
  excerpt: string | { rendered: string };
  featured_media: number;
  categories: number[];
  sticky?: boolean;
  /** Present on mock / flattened API shapes */
  featuredImage?: string;
  featuredImageAlt?: string;
  featured?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
  author?: { name: string; image?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: Record<string, string>;
      description?: string;
    }>;
  };
}

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
  image?: string;
}

export interface WpUser {
  id: number;
  name: string;
  description: string;
  avatar_urls?: Record<string, string>;
  meta?: Record<string, unknown>;
}

export interface WpPage {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  menu_order?: number;
}

export interface WpSiteSettings {
  sitename: string;
  description: string;
  url: string;
}
