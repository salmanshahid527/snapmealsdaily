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
    /* Very dark teal footer — continues the dark palette rhythm */
    <footer
      className="pt-14 pb-6 mt-auto"
      style={{ background: "#020f0f" }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top teal→amber gradient accent */}
        <div
          className="h-[2px] rounded-full mb-10"
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
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(230,247,246,0.55)" }}
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
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: "rgba(13,148,136,0.2)",
                    color: "#5eead4",
                  }}
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
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: "rgba(13,148,136,0.2)",
                    color: "#5eead4",
                  }}
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
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: "rgba(13,148,136,0.2)",
                    color: "#5eead4",
                  }}
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
              <h3
                className="overline mb-4"
                style={{ color: "rgba(230,247,246,0.35)" }}
              >
                Categories
              </h3>
              <ul className="space-y-2.5">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm transition-colors hover:text-primary"
                      style={{ color: "rgba(230,247,246,0.6)" }}
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
            <h3
              className="overline mb-4"
              style={{ color: "rgba(230,247,246,0.35)" }}
            >
              Explore
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Recipes", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: "rgba(230,247,246,0.6)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="overline mb-4"
              style={{ color: "rgba(230,247,246,0.35)" }}
            >
              Newsletter
            </h3>
            <p
              className="text-sm mb-3 leading-relaxed"
              style={{ color: "rgba(230,247,246,0.5)" }}
            >
              New recipes each week. No spam — just flavour.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors"
                style={{
                  background: "rgba(13,148,136,0.15)",
                  border: "1px solid rgba(13,148,136,0.3)",
                  color: "rgba(230,247,246,0.85)",
                }}
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
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
          style={{ borderColor: "rgba(13,148,136,0.15)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(230,247,246,0.3)" }}
          >
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
                className="text-xs transition-colors hover:text-primary"
                style={{ color: "rgba(230,247,246,0.3)" }}
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
