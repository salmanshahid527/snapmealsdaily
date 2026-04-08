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
    <footer
      className="pt-14 pb-6 mt-auto"
      style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top gradient accent */}
        <div
          className="h-1 rounded-full mb-10 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt={SITE_NAME}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p
              className="text-sm leading-relaxed mb-4 opacity-70"
              style={{ color: "var(--secondary-foreground)" }}
            >
              Fresh recipes, smart meal ideas, and kitchen inspiration — snap,
              cook, and share.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors opacity-70 hover:opacity-100"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
              )}
              {SOCIAL.facebook && (
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors opacity-70 hover:opacity-100"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
              )}
              {SOCIAL.pinterest && (
                <a
                  href={SOCIAL.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors opacity-70 hover:opacity-100"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-label="Pinterest"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h3 className="overline mb-4 opacity-50">Categories</h3>
              <ul className="space-y-2.5">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                      style={{ color: "var(--secondary-foreground)" }}
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Explore */}
          <div>
            <h3 className="overline mb-4 opacity-50">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Recipes", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--secondary-foreground)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="overline mb-4 opacity-50">Newsletter</h3>
            <p className="text-sm opacity-60 mb-3 leading-relaxed">
              New recipes each week. No spam — just flavour.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg text-sm placeholder-opacity-40 focus:outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "var(--secondary-foreground)",
                }}
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  color: "#fff",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs opacity-40">
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
                className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                style={{ color: "var(--secondary-foreground)" }}
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
