"use client";

import Link from "next/link";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { formatDateTimeShort, readTime } from "@/lib/utils";
import type { PostDetail } from "@/types";

interface ArticleHeroProps {
  post: PostDetail;
}

export function ArticleHero({ post }: ArticleHeroProps) {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden group"
      style={{
        backgroundImage: post.featuredImage
          ? `url('${post.featuredImage}')`
          : "linear-gradient(135deg, var(--color-primary-muted), var(--color-background))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />

      {/* Pinterest Button */}
      <a
        href="https://pinterest.com/snapmealsdaily"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Share on Pinterest"
        className={`
          absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8
          z-20
          w-12 h-12 md:w-14 md:h-14
          bg-[#E60023] hover:bg-[#C41E14]
          rounded-full
          flex items-center justify-center
          shadow-lg hover:shadow-2xl
          transition-all duration-300 ease-out
          opacity-0 sm:group-hover:opacity-100
          md:group-hover:opacity-100
          lg:opacity-100
          pointer-events-auto
          active:scale-95
          ring-2 ring-white/20 hover:ring-white/40
        `}
      >
        <FaPinterest className="w-6 h-6 text-white" />
      </a>

      {/* Article meta — positioned over background */}
      <div className="relative mx-auto max-w-[920px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-white/80 mb-5">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          {post.category && (
            <>
              <Link
                href={`/category/${post.category.slug}`}
                prefetch={false}
                className="hover:text-white transition-colors"
              >
                {post.category.title}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-white/60 truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            prefetch={false}
            className="inline-block mb-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
          >
            {post.category.title}
          </Link>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl font-display">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-white/90">
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDateTimeShort(post.publishedAt)}
            </div>
          )}
          {post.author && (
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author.name}
            </div>
          )}
          {post.excerpt && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {readTime(post.excerpt)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
