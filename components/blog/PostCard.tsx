import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Calendar, Clock, ChefHat } from "lucide-react";
import { formatDateTimeShort, readTime, cn } from "@/lib/utils";
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
        "group bg-card rounded-2xl overflow-hidden border border-border card-hover img-zoom h-full flex flex-col",
        className
      )}
    >
      <Link href={`/${post.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            variant === "featured" ? "aspect-[16/9]" : "aspect-[4/3]"
          )}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt ?? post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-muted) 0%, var(--accent-muted) 100%)",
              }}
            >
              <ChefHat size={40} className="opacity-20" style={{ color: "var(--primary)" }} />
            </div>
          )}

          {/* Category badge */}
          {post.category && (
            <span
              className="absolute top-3 left-3 badge-recipe"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              {post.category.title}
            </span>
          )}

          {/* Read time */}
          {post.excerpt && (
            <span
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "var(--foreground-muted)",
              }}
            >
              <Clock size={10} />
              {readTime(post.excerpt)}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            className="overline text-foreground-subtle hover:text-primary transition-colors mb-2 block"
          >
            {post.category.title}
          </Link>
        )}

        <Link href={`/${post.slug}`}>
          <h3
            className={cn(
              "font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug",
              variant === "featured" ? "text-2xl" : "text-lg"
            )}
          >
            {post.title}
          </h3>
        </Link>

        {variant !== "compact" && post.excerpt && (
          <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        )}

        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs mt-auto"
          style={{ color: "var(--foreground-subtle)" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={11} />
            <time dateTime={post.publishedAt}>
              {formatDateTimeShort(post.publishedAt)}
            </time>
          </span>
          {post.author?.name ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                {post.author.name}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
