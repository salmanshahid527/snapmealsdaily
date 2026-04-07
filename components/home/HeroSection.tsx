"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import type { Post } from "@/types";

interface HeroSectionProps {
  featuredPost: Post | null;
}

export function HeroSection({ featuredPost }: HeroSectionProps) {
  const post = featuredPost || {
    title: "Discover Amazing Recipes",
    excerpt: "Start your culinary journey with our collection of delicious and easy-to-make recipes.",
    featuredImage: null,
    slug: "blog",
  };

  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] overflow-hidden rounded-2xl">
      {/* Background image */}
      {post.featuredImage ? (
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-muted) 0%, var(--muted) 100%)",
          }}
        />
      )}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: post.featuredImage
            ? "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(135deg, transparent 0%, rgba(255,140,66,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative h-full min-h-[500px] sm:min-h-[600px] flex flex-col items-start justify-end p-6 sm:p-10 lg:p-14">
        <div className="max-w-2xl animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{
                color: post.featuredImage ? "#ffffff" : "var(--primary)",
              }}
            >
              Featured Recipe
            </span>
          </div>

          {/* Category */}
          {post.category && (
            <p
              className="text-sm font-medium mb-3 transition-colors inline-block px-3 py-1 rounded-full"
              style={{
                backgroundColor: post.featuredImage ? "rgba(255,255,255,0.2)" : "var(--primary-muted)",
                color: post.featuredImage ? "#ffffff" : "var(--primary)",
              }}
            >
              {post.category.title}
            </p>
          )}

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-4"
            style={{
              color: post.featuredImage ? "#ffffff" : "var(--foreground)",
            }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-6 line-clamp-2"
            style={{
              color: post.featuredImage ? "rgba(255,255,255,0.9)" : "var(--foreground-muted)",
            }}
          >
            {post.excerpt}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${post.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Read Recipe <ArrowRight size={16} />
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
              style={{
                backgroundColor: post.featuredImage
                  ? "rgba(255,255,255,0.2)"
                  : "var(--background-alt)",
                color: post.featuredImage ? "#ffffff" : "var(--foreground)",
                border: post.featuredImage
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backdropFilter = "blur(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backdropFilter = "none";
              }}
            >
              <Play size={16} /> Browse All
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
