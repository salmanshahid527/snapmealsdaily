"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatDateTimeShort } from "@/lib/utils";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import type { Post } from "@/types";

interface TrendingStripProps {
  posts: Post[];
}

export function TrendingStrip({ posts }: TrendingStripProps) {
  if (!posts.length) return null;

  return (
    /* Dark teal section — bold visual break after white featured section */
    <section className="section-gap section-mid">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p
              className="overline mb-2 flex items-center gap-1.5"
              style={{ color: "#5eead4" }}
            >
              <TrendingUp size={12} />
              What&apos;s hot
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Trending in the kitchen
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "rgba(230,247,246,0.65)" }}
          >
            More recipes <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {posts.slice(0, 4).map((post, i) => (
            <motion.div key={post._id} variants={fadeUpVariant}>
              <Link href={`/${post.slug}`} className="group relative block">
                {/* Big number */}
                <span
                  className="absolute -top-3 -left-1 font-display font-bold text-7xl leading-none select-none pointer-events-none z-0"
                  style={{ color: "rgba(45,212,191,0.15)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex gap-3 items-start pt-5">
                  {/* Thumbnail */}
                  <div
                    className="shrink-0 w-20 h-16 rounded-xl overflow-hidden"
                    style={{ background: "rgba(13,148,136,0.3)" }}
                  >
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {post.category && (
                      <p
                        className="overline mb-1"
                        style={{ color: "#5eead4" }}
                      >
                        {post.category.title}
                      </p>
                    )}
                    <h3
                      className="font-semibold text-sm leading-snug line-clamp-2 transition-colors group-hover:opacity-80"
                      style={{ color: "rgba(230,247,246,0.9)" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: "rgba(230,247,246,0.4)" }}
                    >
                      {post.author?.name ? `${post.author.name} · ` : ""}
                      {formatDateTimeShort(post.publishedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
