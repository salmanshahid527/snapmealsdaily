"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import { MobileNav } from "./MobileNav";
import type { NavLink, Category } from "@/types";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

interface SiteHeaderProps {
  initialNavLinks?: NavLink[];
  initialCategories?: Category[];
}

export function SiteHeader({
  initialNavLinks,
  initialCategories,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navLinks = initialNavLinks ?? [];
  const categories = initialCategories ?? [];

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-card border-b border-border"
      )}
    >
      {/* Teal → Amber gradient accent line */}
      <div className="header-accent-bar" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt={SITE_NAME}
              className="h-10 w-auto"
              width={220}
              height={40}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}:${link.label}`}
                href={link.href}
                className="nav-link text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 rounded-lg text-foreground-muted hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>

            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-lg text-foreground-muted hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}

            <MobileNav navLinks={navLinks} categories={categories} />
          </div>
        </div>
      </div>

      {/* Category sub-bar — teal tinted */}
      {categories.length > 0 && (
        <div
          className="hidden lg:block border-t"
          style={{
            background: "var(--background-alt)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-hide">
              {categories.slice(0, 12).map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className="shrink-0 text-xs font-bold nav-link whitespace-nowrap transition-colors hover:text-primary"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
