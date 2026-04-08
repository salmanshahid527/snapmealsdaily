"use client";

import Link from "next/link";
import { SITE_NAME, SOCIAL } from "@/lib/constants";
import type { Category } from "@/types";
import { Instagram, Facebook, ExternalLink } from "lucide-react";

interface FooterProps {
  initialCategories?: Category[];
}

export function Footer({ initialCategories }: FooterProps) {
  const categories = initialCategories ?? [];

  return (
    <footer className="bg-foreground text-card pt-12 pb-6 mt-auto">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt={SITE_NAME}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-card/70 leading-relaxed mb-4">
              Fresh recipes, smart meal ideas, and kitchen inspiration — save,
              cook, and share.
            </p>
            <div className="flex gap-3">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {SOCIAL.facebook && (
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-primary/80 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {SOCIAL.pinterest && (
                <a
                  href={SOCIAL.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-primary/80 transition-colors"
                  aria-label="Pinterest"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {categories.length > 0 && (
            <div>
              <h3 className="overline text-card/60 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm text-card/80 hover:text-primary transition-colors"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="overline text-card/60 mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-card/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="overline text-card/60 mb-4">Newsletter</h3>
            <p className="text-sm text-card/70 mb-3 leading-relaxed">
              New recipes each week. No spam — just flavor.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-card placeholder:text-card/40 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-primary hover:bg-accent-foreground text-white text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-card/50">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Disclaimer", href: "/disclaimer" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-card/50 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
