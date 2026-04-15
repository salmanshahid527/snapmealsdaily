"use client";

import { SmartImage as Image } from "@/components/ui/SmartImage";
import type { Author } from "@/types";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="bg-primary-muted/40 rounded-lg p-6 sm:p-8 border border-border">
        <div className="flex gap-6 items-start">
          {author.image && (
            <div className="flex-shrink-0">
              <Image
                src={author.image}
                alt={author.name}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              About {author.name}
            </h3>
            {author.bio && (
              <p
                className="text-foreground-muted mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: author.bio }}
              />
            )}

            {/* Social links */}
            <div className="flex gap-3">
              {author.pinterest && (
                <a
                  href={author.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-primary text-sm font-medium hover:bg-primary-muted transition-colors border border-border"
                >
                  Pinterest
                </a>
              )}
              {author.instagram && (
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-primary text-sm font-medium hover:bg-primary-muted transition-colors border border-border"
                >
                  Instagram
                </a>
              )}
              {author.facebook && (
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-primary text-sm font-medium hover:bg-primary-muted transition-colors border border-border"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
