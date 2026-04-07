"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { formatDateTimeShort, cn, readTime } from "@/lib/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  className?: string;
  variant?: "default" | "featured" | "compact";
}

export function PostCard({
  post,
  priority = false,
  className,
  variant = "default",
}: PostCardProps) {
  return (
    <article
      className={cn(
        "group bg-card rounded-lg overflow-hidden border border-orange-100 card-hover img-zoom h-full flex flex-col relative",
        className
      )}
    >
      {/* Pinterest Button - Absolutely positioned OUTSIDE Link */}
      <a
        href="https://pinterest.com/snapmealsdaily"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Share on Pinterest"
        className={`
          absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4
          z-20
          w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
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
        <FaPinterest className="w-5 h-5 text-white" />
      </a>

      <Link href={`/${post.slug}`} prefetch={false} className="block">
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden bg-orange-50",
            variant === "featured" ? "aspect-[16/9]" : "aspect-[16/10]"
          )}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center">
              <span className="text-4xl text-orange-400">🍳</span>
            </div>
          )}

          {/* Category badge */}
          {post.category && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
              {post.category.title}
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            prefetch={false}
            className="overline text-foreground-muted hover:text-primary transition-colors mb-2 block"
          >
            {post.category.title}
          </Link>
        )}

        <Link href={`/${post.slug}`} prefetch={false}>
          <h3 className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-sm text-foreground-muted mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Footer with metadata */}
        <div className="mt-auto pt-4 border-t border-orange-100">
          <div className="flex flex-wrap gap-3 text-xs text-foreground-muted">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDateTimeShort(post.publishedAt)}
              </span>
            )}
            {post.author && (
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.author.name}
              </span>
            )}
            {post.excerpt && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readTime(post.excerpt)} min
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
