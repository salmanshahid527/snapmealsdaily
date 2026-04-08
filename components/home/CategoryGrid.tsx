"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

const FALLBACK_GRADIENT = [
  "from-primary-muted to-muted",
  "from-secondary/20 to-muted",
  "from-accent to-muted",
  "from-primary-muted/70 to-secondary/10",
  "from-muted to-background-alt",
  "from-foreground/5 to-primary-muted/30",
];

interface CategoryGridProps {
  categories: Category[];
  postImages?: Record<string, string>;
}

function CategoryCell({
  category,
  imageUrl,
  gradientClass,
  index,
}: {
  category?: Category;
  imageUrl?: string;
  gradientClass: string;
  index: number;
}) {
  const href = category ? `/category/${category.slug}` : "/blog";
  const label = category ? category.title : "View all";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl group cursor-pointer h-full"
    >
      <Link href={href} className="block h-full">
        <div className="relative w-full h-full min-h-[210px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-linear-to-br ${gradientClass}`} />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="overline text-white/70 mb-1">
              {category?.count
                ? `${category.count} ${category.count === 1 ? "recipe" : "recipes"}`
                : ""}
            </p>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-white text-xl sm:text-2xl">
                {label}
              </h3>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowRight size={14} className="text-white" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid({ categories, postImages = {} }: CategoryGridProps) {
  const cats = categories.slice(0, 5);

  return (
    <section className="py-16 bg-background-alt">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="overline text-primary mb-2">Browse by category</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              Find your next meal
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat, idx) => (
            <CategoryCell
              key={cat.slug}
              category={cat}
              imageUrl={postImages[cat.slug]}
              gradientClass={FALLBACK_GRADIENT[idx % FALLBACK_GRADIENT.length]}
              index={idx}
            />
          ))}
          <CategoryCell
            gradientClass="from-foreground/10 to-foreground/5"
            index={cats.length}
          />
        </div>
      </div>
    </section>
  );
}
