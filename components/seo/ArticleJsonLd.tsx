import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { PostDetail } from "@/types";

interface ArticleJsonLdProps {
  post: PostDetail;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
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
