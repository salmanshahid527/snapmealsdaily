import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { PostDetail } from "@/types";

interface ArticleJsonLdProps {
  post: PostDetail;
  /** Resolved SEO description (e.g. Rank Math); defaults to excerpt. */
  description?: string;
}

export function ArticleJsonLd({ post, description }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: description ?? post.excerpt,
    image: post.featuredImage?.split("?")[0],
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.image,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
