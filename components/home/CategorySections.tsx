"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import type { Category, Post } from "@/types";

interface CategorySectionsProps {
  categories: Category[];
  postsByCategoryId: Record<number, Post[]>;
}

/* Alternating tones: light-teal → white → light-teal → white ... */
const SECTION_STYLES = [
  { bg: "var(--background)", label: "var(--primary)" },
  { bg: "var(--background-alt)", label: "var(--primary)" },
] as const;

export function CategorySections({
  categories,
  postsByCategoryId,
}: CategorySectionsProps) {
  const catsWithPosts = categories.filter(
    (cat) => (postsByCategoryId[cat.id]?.length ?? 0) > 0
  );

  if (!catsWithPosts.length) return null;

  return (
    <div>
      {catsWithPosts.map((cat, sectionIdx) => {
        const posts = postsByCategoryId[cat.id] ?? [];
        const style = SECTION_STYLES[sectionIdx % 2];

        return (
          <section
            key={cat._id}
            className="py-14"
            style={{ background: style.bg }}
          >
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex items-end justify-between mb-7"
              >
                <div>
                  <p
                    className="overline mb-1.5"
                    style={{ color: style.label }}
                  >
                    Recipe collection
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {cat.title}
                  </h2>
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  More {cat.title} <ArrowRight size={14} />
                </Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {posts.slice(0, 4).map((post) => (
                  <motion.div key={post._id} variants={fadeUpVariant}>
                    <PostCard post={post} variant="compact" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
