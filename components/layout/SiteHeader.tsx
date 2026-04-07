"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface SiteHeaderProps {
  initialNavLinks?: Array<{ label: string; href: string }>;
  initialCategories?: Category[];
}

export function SiteHeader({ initialNavLinks = [], initialCategories = [] }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseNavLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  // Only add initialNavLinks if they're not already in baseNavLinks
  const uniqueNavLinks = new Map(baseNavLinks.map(link => [link.href, link]));
  (initialNavLinks || []).forEach(link => {
    if (!uniqueNavLinks.has(link.href)) {
      uniqueNavLinks.set(link.href, link);
    }
  });
  
  const navLinks = Array.from(uniqueNavLinks.values());

  const categories = initialCategories || [];

  return (
    <>
      {/* Main Header */}
      <header
        className="sticky top-0 z-40 border-b transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(250, 249, 248, 0.95)" : "var(--background)",
          borderColor: "var(--border)",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "var(--primary)" }}
              >
                S
              </div>
              <span className="font-bold text-lg hidden sm:inline" style={{ color: "var(--foreground)" }}>
                SnapMeals
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={`nav-${link.href}-${index}`}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: "var(--foreground-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <Link
                href="/search"
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--muted)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
                title="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--foreground-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--muted)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Bar (Desktop) */}
      {categories.length > 0 && (
        <div
          className="hidden lg:block border-b"
          style={{
            backgroundColor: "var(--background-alt)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 h-12 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  prefetch={false}
                  className="shrink-0 text-xs font-semibold transition-colors whitespace-nowrap"
                  style={{ color: "var(--foreground-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="lg:hidden border-b"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={`mobile-${link.href}-${index}`}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{
                  color: "var(--foreground-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--muted)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            {categories.length > 0 && (
              <div
                className="px-4 py-3 border-t my-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground-muted)",
                }}
              >
                <p className="text-xs font-semibold mb-2 uppercase">Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/category/${cat.slug}`}
                      prefetch={false}
                      className="block px-3 py-1.5 text-xs font-medium rounded transition-colors"
                      style={{
                        color: "var(--foreground-muted)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--muted)";
                        e.currentTarget.style.color = "var(--primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--foreground-muted)";
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
