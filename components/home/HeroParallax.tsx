"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import type { Post } from "@/types";

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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const wpImages = featuredPosts.slice(0, 3).filter((p) => p.featuredImage);
  const heroImages =
    wpImages.length > 0
      ? wpImages.map((p) => ({ src: p.featuredImage!, alt: p.title, post: p }))
      : FALLBACK_IMAGES.map((img) => ({ ...img, post: undefined }));

  const mainImage = heroImages[0];
  const sideImages = heroImages.slice(1, 3);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] overflow-hidden flex items-center"
      style={{ background: "var(--surface-dark)" }}
    >
      {/* ── Decorative background elements ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Teal radial glow top-right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #0d9488 0%, transparent 65%)",
          }}
        />
        {/* Amber glow bottom-left */}
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #f59e0b 0%, transparent 65%)",
          }}
        />
        {/* Subtle noise/texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 8px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div style={{ y: textY, opacity }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 text-xs font-bold tracking-wider uppercase"
              style={{
                background: "rgba(13,148,136,0.2)",
                borderColor: "rgba(13,148,136,0.4)",
                color: "#5eead4",
              }}
            >
              <Sparkles size={12} />
              Fresh recipes daily
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.08] mb-6">
              {["Fresh", "Flavors,", "Every", "Single", "Day."].map(
                (word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-3 text-5xl sm:text-6xl lg:text-7xl text-white"
                  >
                    {word}
                  </motion.span>
                )
              )}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68 }}
              className="text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: "rgba(230,247,246,0.75)" }}
            >
              Easy weeknight dinners, weekend brunches, and desserts worth
              saving — all photographed and ready to make.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.82 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-foreground)",
                }}
              >
                Browse recipes
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/category/quick-meals"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(45,212,191,0.4)",
                  color: "#99f6e4",
                  background: "rgba(13,148,136,0.12)",
                }}
              >
                <Clock size={14} />
                Quick meals
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { label: "Recipes", value: "500+" },
                { label: "Categories", value: "12+" },
                { label: "New weekly", value: "5+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display font-bold text-2xl"
                    style={{ color: "#5eead4" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(230,247,246,0.45)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: image collage ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px]">
              {/* Main large card */}
              {mainImage && (
                <motion.div
                  initial={{ opacity: 0, y: 32, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: -2 }}
                  transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl z-20"
                  style={{
                    border: "3px solid rgba(45,212,191,0.35)",
                    boxShadow: "0 24px 64px rgba(4,47,46,0.6), 0 0 0 1px rgba(45,212,191,0.15)",
                  }}
                >
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt}
                    fill
                    className="object-cover"
                    sizes="290px"
                    priority
                  />
                  {mainImage.post && (
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xs font-bold line-clamp-2 leading-snug">
                        {mainImage.post.title}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Second image */}
              {sideImages[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 44, rotate: 2.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 2.5 }}
                  transition={{ duration: 0.75, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-8 left-52 w-52 h-64 rounded-3xl overflow-hidden z-30"
                  style={{
                    border: "3px solid rgba(245,158,11,0.4)",
                    boxShadow: "0 16px 48px rgba(4,47,46,0.5)",
                  }}
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
                  initial={{ opacity: 0, y: 54, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: -1 }}
                  transition={{ duration: 0.75, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-52 left-16 w-44 h-52 rounded-3xl overflow-hidden z-10"
                  style={{
                    border: "3px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 12px 36px rgba(4,47,46,0.4)",
                  }}
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

              {/* Floating "New today" badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.05 }}
                className="absolute bottom-10 right-0 rounded-2xl p-4 z-40"
                style={{
                  background: "rgba(13,148,136,0.25)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(45,212,191,0.25)",
                  minWidth: "165px",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-base"
                    style={{ background: "rgba(245,158,11,0.25)" }}
                  >
                    📸
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#fbbf24" }}>
                      Just posted
                    </p>
                    <p
                      className="text-xs leading-tight"
                      style={{ color: "rgba(230,247,246,0.65)" }}
                    >
                      {featuredPosts[0]
                        ? featuredPosts[0].title.slice(0, 26) + "…"
                        : "Fresh recipe added"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Dot grid decoration */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10 z-0">
                <svg viewBox="0 0 96 96" fill="none">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={(i % 5) * 20 + 8}
                      cy={Math.floor(i / 5) * 20 + 8}
                      r="3"
                      fill="#2dd4bf"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Curved bottom transition to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C360 64 720 0 1080 32C1260 48 1380 16 1440 32V64H0V32Z"
            fill="var(--background-alt)"
          />
        </svg>
      </div>
    </section>
  );
}
