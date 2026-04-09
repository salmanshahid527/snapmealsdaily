"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

const EMOJI_MAP: Record<string, string> = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍝",
  desserts: "🍰",
  "quick-meals": "⚡",
  snacks: "🥨",
  soups: "🍲",
  salads: "🥙",
  baking: "🧁",
  vegetarian: "🥦",
  drinks: "🍹",
};

/* Teal-family gradients — no reds, completely new palette */
const GRADIENT_PAIRS: [string, string][] = [
  ["#0d9488", "#14b8a6"],
  ["#0f766e", "#0d9488"],
  ["#f59e0b", "#d97706"],
  ["#134e4a", "#0f766e"],
  ["#042f2e", "#134e4a"],
  ["#1e40af", "#1d4ed8"],
];

interface CategoryGridProps {
  categories: Category[];
  postImages?: Record<string, string>;
}

function CategoryCell({
  category,
  imageUrl,
  gradientPair,
  emoji,
  index,
}: {
  category?: Category;
  imageUrl?: string;
  gradientPair: [string, string];
  emoji: string;
  index: number;
}) {
  const href = category ? `/category/${category.slug}` : "/blog";
  const label = category ? category.title : "View all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      style={{ minHeight: "228px" }}
    >
      <Link href={href} className="block h-full">
        <div className="relative w-full h-full" style={{ minHeight: "228px" }}>
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
              style={{
                background: `linear-gradient(135deg, ${gradientPair[0]} 0%, ${gradientPair[1]} 100%)`,
              }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent group-hover:from-black/85 transition-all duration-300" />

          {/* Emoji (no-image only) */}
          {!imageUrl && (
            <div className="absolute top-4 right-4 text-3xl opacity-75 group-hover:scale-110 transition-transform duration-300 select-none">
              {emoji}
            </div>
          )}

          {/* Teal left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 opacity-80 group-hover:opacity-100 transition-opacity"
            style={{ background: "var(--primary)" }}
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {category?.count != null && (
              <p
                className="overline mb-1"
                style={{ color: "rgba(94,234,212,0.8)" }}
              >
                {category.count}{" "}
                {category.count === 1 ? "recipe" : "recipes"}
              </p>
            )}
            <div className="flex items-end justify-between gap-2">
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
                {label}
              </h3>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "var(--accent)" }}
              >
                <ArrowRight size={14} style={{ color: "var(--accent-foreground)" }} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid({
  categories,
  postImages = {},
}: CategoryGridProps) {
  const cats = categories.slice(0, 5);

  return (
    /* Light mint/teal background — contrast to dark hero above */
    <section className="py-16 section-mint">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="overline mb-2" style={{ color: "var(--primary)" }}>
              Browse by category
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              What are you craving?
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary"
            style={{ color: "var(--foreground-muted)" }}
          >
            All recipes <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((cat, idx) => (
            <CategoryCell
              key={cat.slug}
              category={cat}
              imageUrl={postImages[cat.slug]}
              gradientPair={GRADIENT_PAIRS[idx % GRADIENT_PAIRS.length]}
              emoji={EMOJI_MAP[cat.slug] ?? "🍽️"}
              index={idx}
            />
          ))}
          <CategoryCell
            gradientPair={["#042f2e", "#0f766e"]}
            emoji="🍽️"
            index={cats.length}
          />
        </div>
      </div>
    </section>
  );
}
