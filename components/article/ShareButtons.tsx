"use client";

import { useState } from "react";
import { Link2, Check, Twitter, Facebook } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/${slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      <span className="text-xs text-foreground-subtle mr-1">Share:</span>

      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs text-foreground-muted hover:border-primary hover:text-primary transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={12} /> : <Link2 size={12} />}
        {copied ? "Copied!" : "Copy link"}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-border text-foreground-muted hover:border-primary hover:text-primary transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={13} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-border text-foreground-muted hover:border-primary hover:text-primary transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={13} />
      </a>
    </div>
  );
}
