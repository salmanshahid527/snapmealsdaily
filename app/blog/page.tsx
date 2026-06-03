import type { Metadata } from "next";
import { BLOG_POSTS_PER_PAGE } from "@/lib/blogPagination";
import { getLatestPostForBlogMeta, getPostsForBlogPage } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { Container } from "@/components/layout/Container";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { buildOgImage } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const latest = await getLatestPostForBlogMeta();
  const firstImage = latest?.featuredImage;

  return {
    title: "Recipes Blog — Food Ideas & Inspiration",
    description: `Browse all recipes on ${SITE_NAME}. Breakfast, lunch, dinner, desserts, quick meals and more.`,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blog`,
      title: `Recipes Blog — Food Ideas & Inspiration | ${SITE_NAME}`,
      description: `Browse all recipes on ${SITE_NAME}. ${SITE_DESCRIPTION}`,
      siteName: SITE_NAME,
      images: [
        {
          url: buildOgImage(firstImage),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Recipes Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Recipes Blog | ${SITE_NAME}`,
      description: `Browse all recipes on ${SITE_NAME}.`,
      images: [buildOgImage(firstImage)],
    },
  };
}

type BlogPageProps = {
  searchParams: Promise<{ page?: string; category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const categorySlug = sp.category?.trim() || undefined;
  const initialCategories = await getCategories();
  const categoryId =
    categorySlug && initialCategories.length > 0
      ? initialCategories.find((c) => c.slug === categorySlug)?.id
      : undefined;
  const initialBlogPage = await getPostsForBlogPage({
    page,
    perPage: BLOG_POSTS_PER_PAGE,
    categoryId,
  });

  return (
    <div className="section-gap">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="overline text-primary mb-3">All Recipes</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            Recipe Collection
          </h1>
          <p className="text-foreground-muted mt-3 max-w-xl">
            Weeknight dinners, weekend brunches, desserts, and everything in
            between — find your next favourite meal.
          </p>
        </div>

        <BlogPostList
          posts={initialBlogPage.posts}
          total={initialBlogPage.total}
          totalPages={initialBlogPage.totalPages}
          page={page}
          categorySlug={categorySlug}
          categories={initialCategories}
        />
      </Container>
    </div>
  );
}
