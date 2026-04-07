"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";

interface FeaturedSectionProps {
  posts: Post[];
}

export function FeaturedSection({ posts }: FeaturedSectionProps) {
  const featured = posts.slice(0, 4);

  return (
    <section style={{ backgroundColor: "var(--background)" }} className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--primary)" }}
          >
            Trending Now
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold font-display"
            style={{ color: "var(--foreground)" }}
          >
            What's Hot This Week
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((post, idx) => (
            <Link
              key={post._id}
              href={`/${post.slug}`}
              prefetch={false}
              style={{ animation: `slideUp 0.5s ease-out ${idx * 0.1}s both` }}
            >
              <div className="group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary-muted) 0%, var(--muted) 100%)",
                      }}
                    />
                  )}

                  {/* Category badge */}
                  {post.category && (
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "#ffffff",
                      }}
                    >
                      {post.category.title}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pt-4 flex flex-col flex-grow">
                  <h3
                    className="font-bold text-base leading-snug line-clamp-2 transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm mt-2 line-clamp-2 flex-grow"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <div
                    className="flex items-center gap-1 mt-3 text-sm font-medium transition-colors group-hover:gap-2"
                    style={{ color: "var(--primary)" }}
                  >
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {featured.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: "var(--foreground-muted)" }}
          >
            No recipes available yet.
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
