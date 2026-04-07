import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGridHome";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategorySections } from "@/components/home/CategorySections";
import { getFeaturedPosts, getPostsForMultipleCategories } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, POSTS_PER_CATEGORY_HOME } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${SITE_NAME} — Delicious Recipes & Food Ideas`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default async function HomePage() {
  const [categories, featuredPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(),
  ]);

  const categoryIds = categories.map((c) => c.id);
  const postsByCategoryId = await getPostsForMultipleCategories(
    categoryIds,
    POSTS_PER_CATEGORY_HOME
  );

  // Build post images for category grid
  const postImages: Record<string, string> = {};
  for (const cat of categories) {
    const firstPost = postsByCategoryId[cat.id]?.[0];
    if (firstPost?.featuredImage) {
      postImages[cat.slug] = firstPost.featuredImage;
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <Container>
          <HeroSection featuredPost={featuredPosts[0] || null} />
        </Container>
      </section>

      {/* Category Grid */}
      <CategoryGrid categories={categories} postImages={postImages} />

      {/* Featured Section - What's Hot */}
      <FeaturedSection posts={featuredPosts} />

      {/* Category Sections */}
      <CategorySections categories={categories} postsByCategoryId={postsByCategoryId} />

      {/* Newsletter CTA Section */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "var(--background-alt)" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Never Miss a Recipe
            </h2>
            <p className="mb-8 text-lg" style={{ color: "var(--foreground-muted)" }}>
              Get our latest recipes delivered directly to your inbox. Easy weeknight dinners, weekend brunches, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 font-medium transition-all"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  "--tw-ring-color": "var(--primary)",
                } as React.CSSProperties}
                required
              />
              <button
                type="submit"
                className="px-8 py-3 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
