import type { Metadata } from "next";
import { getPostsForBlog } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import { PostList } from "@/components/blog/PostList";
import { Container } from "@/components/layout/Container";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import { buildOgImage } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPostsForBlog();
  const firstImage = posts[0]?.featuredImage;

  return {
    title: "All Recipes — Delicious Food Inspiration",
    description: `Browse all recipes on ${SITE_NAME}. Breakfast, lunch, dinner, desserts and more.`,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blog`,
      title: `All Recipes — Delicious Food Inspiration | ${SITE_NAME}`,
      description: `Browse all recipes on ${SITE_NAME}. ${SITE_DESCRIPTION}`,
      siteName: SITE_NAME,
      images: [{ url: buildOgImage(firstImage), width: 1200, height: 630, alt: `${SITE_NAME} Blog` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `All Recipes — Delicious Food Inspiration | ${SITE_NAME}`,
      description: `Browse all recipes on ${SITE_NAME}.`,
      images: [buildOgImage(firstImage)],
    },
  };
}

export default async function BlogPage() {
  const [initialPosts, initialCategories] = await Promise.all([
    getPostsForBlog(),
    getCategories(),
  ]);

  return (
    <div className="section-gap">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="overline text-primary mb-3">All Articles</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
            Our Recipes
          </h1>
          <p className="text-foreground-muted mt-3 max-w-xl">
            Discover delicious and easy-to-make recipes with beautiful photography and step-by-step guides.
          </p>
        </div>

        <PostList
          initialPosts={initialPosts}
          initialCategories={initialCategories}
        />
      </Container>
    </div>
  );
}
