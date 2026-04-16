import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import type { Post } from "@/types";

function isUnsplashUrl(src: string): boolean {
  return src.includes("images.unsplash.com");
}

/** Smaller Unsplash params + skip optimizer hop for faster mobile LCP. */
function tightenUnsplashHeroUrl(src: string): string {
  if (!isUnsplashUrl(src)) return src;
  try {
    const u = new URL(src);
    u.searchParams.set("w", "1200");
    u.searchParams.set("q", "72");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  } catch {
    return src;
  }
}

const HERO_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=72&auto=format&fit=crop";

interface HeroParallaxProps {
  featuredPosts: Post[];
}

export function HeroParallax({ featuredPosts }: HeroParallaxProps) {
  const featured = featuredPosts.find((post) => post.featuredImage);
  const heroBg = featured?.featuredImage ?? HERO_BG;
  const heroAlt = featured?.title ?? "Fresh recipe inspiration";
  const heroSrc = tightenUnsplashHeroUrl(heroBg);
  const heroUnoptimized = isUnsplashUrl(heroBg);

  return (
    <section className="relative flex min-h-[78vh] items-stretch overflow-hidden bg-[#042f2e]">
      <div className="absolute inset-0">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          unoptimized={heroUnoptimized}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(4,47,46,0.95) 0%, rgba(4,47,46,0.9) 38%, rgba(4,47,46,0.56) 65%, rgba(4,47,46,0.2) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--background-alt) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#f59e0b]" />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#f59e0b]">
              Fresh recipes daily
            </span>
          </div>

          <h1 className="mb-7 font-display text-5xl font-bold leading-[1.06] text-white sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
            <span className="block">Cook</span>
            <span className="block">Something</span>
            <span className="block text-[#5eead4]">Amazing</span>
            <span className="block">Tonight.</span>
          </h1>

          <p className="mb-9 max-w-lg text-lg leading-relaxed text-[rgba(230,247,246,0.72)]">
            Easy weeknight dinners, weekend brunches, and desserts worth saving
            without the extra animation overhead.
          </p>

          <div className="mb-12 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#042f2e",
              }}
            >
              Browse all recipes
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/category/quick-meals"
              className="inline-flex items-center gap-2.5 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(45,212,191,0.35)",
                color: "#99f6e4",
              }}
            >
              <Clock size={14} />
              Quick meals
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {[
              { value: "500+", label: "Recipes" },
              { value: "12+", label: "Categories" },
              { value: "5+", label: "New weekly" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 ? (
                  <span
                    className="h-6 w-px"
                    style={{ background: "rgba(45,212,191,0.2)" }}
                  />
                ) : null}
                <div>
                  <p className="font-display text-2xl font-bold leading-none text-[#5eead4]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[rgba(230,247,246,0.4)]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
