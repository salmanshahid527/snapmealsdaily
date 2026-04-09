"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostGrid } from "@/components/blog/PostGrid";
import type { Post } from "@/types";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) return null;

  return (
    /* Pure white section — clean break after mint category section */
    <section className="section-gap bg-card">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="overline mb-2" style={{ color: "var(--primary)" }}>
              Editor&apos;s pick
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Recipes worth saving
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary"
            style={{ color: "var(--foreground-muted)" }}
          >
            See all posts <ArrowRight size={14} />
          </Link>
        </motion.div>

        <PostGrid posts={posts.slice(0, 6)} />

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-colors hover:text-primary"
            style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
          >
            See all posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
