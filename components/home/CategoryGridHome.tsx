"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

const FALLBACK_GRADIENT = [
  "linear-gradient(135deg, var(--primary-muted) 0%, var(--muted) 100%)",
  "linear-gradient(135deg, var(--background-alt) 0%, var(--muted) 100%)",
  "linear-gradient(135deg, var(--primary-muted) 0%, var(--background) 100%)",
  "linear-gradient(135deg, var(--background-alt) 0%, var(--primary-muted) 100%)",
  "linear-gradient(135deg, var(--muted) 0%, var(--background) 100%)",
  "linear-gradient(135deg, var(--primary-muted) 0%, var(--background-alt) 100%)",
];

interface CategoryGridProps {
  categories: Category[];
  postImages?: Record<string, string>;
}

function CategoryCell({
  category,
  imageUrl,
  gradientBg,
  index,
}: {
  category?: Category;
  imageUrl?: string;
  gradientBg: string;
  index: number;
}) {
  const href = category ? `/category/${category.slug}` : "/blog";
  const label = category ? category.title : "View All";
  const count = category?.count ? `${category.count} recipes` : "";

  return (
    <Link href={href} prefetch={false}>
      <div
        className="relative overflow-hidden rounded-xl group cursor-pointer h-full min-h-[240px] transition-all duration-300 hover:shadow-lg"
        style={{ animation: `fadeIn 0.5s ease-out ${index * 0.08}s both` }}
      >
        {/* Background */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: gradientBg }}
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: imageUrl
              ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 100%)"
              : "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {count && (
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--foreground-subtle)" }}>
              {count}
            </p>
          )}
          <div className="flex items-center justify-between">
            <h3
              className="font-bold text-xl sm:text-2xl font-display"
              style={{ color: imageUrl ? "#ffffff" : "var(--foreground)" }}
            >
              {label}
            </h3>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: imageUrl ? "rgba(255,255,255,0.2)" : "var(--primary-muted)",
              }}
            >
              <ArrowRight
                size={14}
                style={{ color: imageUrl ? "#ffffff" : "var(--primary)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CategoryGrid({ categories, postImages = {} }: CategoryGridProps) {
  const cats = categories.slice(0, 5);

  return (
    <section style={{ backgroundColor: "var(--background-alt)" }} className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--primary)" }}
            >
              Browse by Category
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-display"
              style={{ color: "var(--foreground)" }}
            >
              Find Your Recipe Type
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--foreground-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--foreground-muted)";
            }}
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat, idx) => (
            <CategoryCell
              key={cat.slug}
              category={cat}
              imageUrl={postImages[cat.slug]}
              gradientBg={FALLBACK_GRADIENT[idx % FALLBACK_GRADIENT.length]}
              index={idx}
            />
          ))}
          <CategoryCell
            gradientBg="linear-gradient(135deg, var(--muted) 0%, var(--background) 100%)"
            index={cats.length}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
