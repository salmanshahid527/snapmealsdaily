"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Utensils } from "lucide-react";
import type { Post } from "@/types";
import { formatDateTimeShort } from "@/lib/utils";

const FALLBACK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    alt: "Colorful plate of delicious food",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80",
    alt: "Healthy salad bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
    alt: "Homemade pizza fresh from oven",
  },
];

interface HeroParallaxProps {
  featuredPosts: Post[];
}

export function HeroParallax({ featuredPosts }: HeroParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const wpImages = featuredPosts.slice(0, 3).filter((p) => p.featuredImage);
  const heroImages =
    wpImages.length > 0
      ? wpImages.map((p) => ({
          src: p.featuredImage!,
          alt: p.title,
          post: p,
        }))
      : FALLBACK_IMAGES.map((img) => ({ ...img, post: undefined }));

  const mainImage = heroImages[0];
  const sideImages = heroImages.slice(1, 3);

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] overflow-hidden flex items-center"
      style={{ background: "var(--background)" }}
    >
      {/* Decorative background shapes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--primary-muted) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </motion.div>

      <div className="relative z-10 w-full mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-16 items-center">
          {/* Left: copy */}
          <motion.div style={{ y: textY, opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
              style={{
                background: "var(--primary-muted)",
                color: "var(--primary)",
              }}
            >
              <Utensils size={12} />
              Recipes &amp; Kitchen Inspiration
            </motion.div>

            <h1 className="font-display font-bold leading-[1.1] mb-6">
              {["Fresh", "Flavors,", "Every", "Single", "Day."].map(
                (word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-3 text-5xl sm:text-6xl lg:text-7xl text-foreground"
                  >
                    {word}
                  </motion.span>
                )
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-md"
            >
              Easy weeknight dinners, weekend brunches, and desserts worth
              saving — all in one place, photographed beautifully.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  boxShadow: "0 4px 20px rgba(232,93,26,0.35)",
                }}
              >
                Browse recipes
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/category/quick-meals"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground-muted)",
                }}
              >
                <Clock size={15} />
                Quick meals
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { label: "Recipes", value: "500+" },
                { label: "Categories", value: "12+" },
                { label: "Weekly new", value: "5+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display font-bold text-2xl"
                    style={{ color: "var(--primary)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: image collage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[480px]">
              {/* Main large image */}
              {mainImage && (
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: -1 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 w-64 h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20"
                >
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt}
                    fill
                    className="object-cover"
                    sizes="280px"
                    priority
                  />
                  {mainImage.post && (
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">
                        {mainImage.post.title}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Second image */}
              {sideImages[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 2 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-6 left-48 w-52 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30"
                >
                  <Image
                    src={sideImages[0].src}
                    alt={sideImages[0].alt}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </motion.div>
              )}

              {/* Third image */}
              {sideImages[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: -0.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -0.5 }}
                  transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-48 left-20 w-44 h-52 rounded-2xl overflow-hidden border-4 border-white shadow-lg z-10"
                >
                  <Image
                    src={sideImages[1].src}
                    alt={sideImages[1].alt}
                    fill
                    className="object-cover"
                    sizes="190px"
                  />
                </motion.div>
              )}

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute bottom-8 right-0 rounded-2xl p-4 shadow-lg z-40 border"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  minWidth: "160px",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--primary-muted)" }}
                  >
                    <span className="text-lg">📸</span>
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      New today
                    </p>
                    <p className="text-xs text-foreground-muted leading-tight">
                      {featuredPosts[0]
                        ? featuredPosts[0].title.slice(0, 28) + "…"
                        : "Fresh recipe added"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative dot cluster */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 z-0">
                <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={(i % 5) * 20 + 8}
                      cy={Math.floor(i / 5) * 20 + 8}
                      r="3"
                      fill="var(--primary)"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 28C360 56 720 0 1080 28C1260 42 1380 14 1440 28V56H0V28Z"
            fill="var(--background-alt)"
          />
        </svg>
      </div>
    </section>
  );
}
