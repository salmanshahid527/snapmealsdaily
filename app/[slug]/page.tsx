import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPagesForSitemap } from "@/lib/wp/pages";
import { getPostBySlug, getPostsForBlog, getRelatedPostsByCategory } from "@/lib/wp/post";
import type { Post } from "@/types";
import { Container } from "@/components/layout/Container";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleBody } from "@/components/article/ArticleBody";
import { AuthorCard } from "@/components/article/AuthorCard";
import { RelatedPosts } from "@/components/article/RelatedPosts";
import { ShareButtons } from "@/components/article/ShareButtons";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPostMetadata } from "@/lib/seo";
import { fetchRankMathDescription } from "@/lib/wp/rankmath";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, SLUG_TO_PATH } from "@/lib/constants";

export const revalidate = 43200;

/** Avoid duplicate static params for routes that already exist under `app/`. */
const RESERVED_FOR_STATIC_PARAMS = new Set([
  "blog",
  "search",
  "category",
  "recipes",
  "contact",
  "privacy",
  "about",
]);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [posts, wpPages] = await Promise.all([
    getPostsForBlog(),
    getAllPagesForSitemap(),
  ]);
  const slugs = new Set<string>();
  for (const p of posts) {
    if (!RESERVED_FOR_STATIC_PARAMS.has(p.slug)) slugs.add(p.slug);
  }
  for (const wp of wpPages) {
    if (wp.slug && !RESERVED_FOR_STATIC_PARAMS.has(wp.slug)) slugs.add(wp.slug);
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (page) {
    const path = SLUG_TO_PATH[slug] ?? `/${slug}`;
    const canonical = `${SITE_URL}${path}`;
    const desc =
      page.excerpt ||
      `${page.title} — ${SITE_NAME}: delicious recipes and food inspiration.`;

    return {
      title: page.title,
      description: desc,
      alternates: { canonical },
      openGraph: {
        type: "website",
        url: canonical,
        title: page.title,
        description: desc,
        siteName: SITE_NAME,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: page.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: page.title,
        description: desc,
      },
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return { title: `Not found | ${SITE_NAME}` };

  const rankMathDesc = await fetchRankMathDescription(slug);
  const meta = buildPostMetadata({
    title: post.title,
    description: rankMathDesc || post.excerpt,
    slug: post.slug,
    imageUrl: post.featuredImage,
    publishedAt: post.publishedAt,
    modifiedAt: post.modifiedAt,
    authorName: post.author?.name,
    categoryTitle: post.category?.title,
  });

  if (post.featuredImage) {
    return {
      ...meta,
      other: {
        "link-preload-image": post.featuredImage,
      },
    };
  }

  return meta;
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  // Try page first
  const page = await getPageBySlug(slug);
  if (page) {
    return (
      <Container>
        <div className="prose-cozy max-w-full py-12">
          <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
          {page.content && (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          )}
        </div>
      </Container>
    );
  }

  // Then try post
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const seoDescription = (await fetchRankMathDescription(slug)) || post.excerpt;

  // Get related posts if available
  let relatedPosts: Post[] = [];
  if (post.category?.id) {
    relatedPosts = await getRelatedPostsByCategory(post.category.id, slug, 3);
  }

  // Get author details if available
  const author = post.author ? { ...post.author, _id: `author-${post.author.name}` } : null;

  return (
    <>
      {/* Article Schema */}
      <ArticleJsonLd post={post} description={seoDescription} />

      {/* Breadcrumb Schema */}
      {post.category && (
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: SITE_URL },
            { name: post.category.title, url: `${SITE_URL}/category/${post.category.slug}` },
            { name: post.title, url: `${SITE_URL}/${post.slug}` },
          ]}
        />
      )}

      {/* Hero */}
      <ArticleHero post={post} />

      {/* Content */}
      <div className="section-gap">
        <Container>
          <article className="max-w-[920px] mx-auto">
            {/* Share buttons */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* Article body */}
            {post.body && <ArticleBody html={post.body} />}

            {/* Author card */}
            {author && <AuthorCard author={author} />}
          </article>
        </Container>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="section-gap bg-background-alt">
          <Container>
            <RelatedPosts posts={relatedPosts} />
          </Container>
        </div>
      )}
    </>
  );
}
