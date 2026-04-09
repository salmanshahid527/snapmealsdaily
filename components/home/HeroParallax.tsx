"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, ChevronDown } from "lucide-react";
import type { Post } from "@/types";

// High-quality food photos for fallback / layered backgrounds
const HERO_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85&auto=format&fit=crop";
const PANEL_IMAGES = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&auto=format&fit=crop",
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

  // Parallax — bg image scrolls slightly slower than viewport
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // Resolve image sources — prefer WordPress featured images, fall back to Unsplash
  const postImages = featuredPosts
    .slice(0, 3)
    .filter((p) => p.featuredImage)
    .map((p) => p.featuredImage!);
  const panelSrcs =
    postImages.length >= 2
      ? postImages.slice(0, 3)
      : PANEL_IMAGES;

  const heroBg =
    featuredPosts[0]?.featuredImage ?? HERO_BG;

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden flex items-stretch"
      style={{ background: "#042f2e" }}
    >
      {/* ─────────────────────────────────────────────────
          Full-bleed background food photo (CSS bg — bypasses remotePatterns)
      ───────────────────────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
      </motion.div>

      {/* ── Gradient overlay — dark left, semi-transparent right ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(4,47,46,0.97) 0%, rgba(4,47,46,0.92) 35%, rgba(4,47,46,0.55) 62%, rgba(4,47,46,0.1) 100%)",
        }}
      />
      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, var(--background-alt) 0%, transparent 100%)",
        }}
      />

      {/* ─────────────────────────────────────────────────
          Main content grid
      ───────────────────────────────────────────────── */}
      <div className="relative z-20 w-full mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex items-center py-24 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-14 xl:gap-20 items-center w-full">

          {/* ── LEFT: Editorial text panel ── */}
          <motion.div style={{ y: textY }} className="flex flex-col">
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <span
                className="h-[2px] w-8 rounded-full"
                style={{ background: "#f59e0b" }}
              />
              <span
                className="text-xs font-black tracking-[0.22em] uppercase"
                style={{ color: "#f59e0b" }}
              >
                Fresh recipes daily
              </span>
            </motion.div>

            {/* Headline — large display text */}
            <h1 className="font-display font-bold leading-[1.06] mb-7">
              {[
                { text: "Cook", color: "#ffffff" },
                { text: "Something", color: "#ffffff" },
                { text: "Amazing", color: "#5eead4" },
                { text: "Tonight.", color: "#ffffff" },
              ].map((item, i) => (
                <motion.span
                  key={item.text}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.22 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
                  style={{ color: item.color }}
                >
                  {item.text}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72 }}
              className="text-lg leading-relaxed mb-9 max-w-sm"
              style={{ color: "rgba(230,247,246,0.72)" }}
            >
              Easy weeknight dinners, weekend brunches, and desserts worth
              saving — all photographed and ready to make.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.88 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)]"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "#042f2e",
                }}
              >
                Browse all recipes
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/category/quick-meals"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border font-semibold text-sm transition-all hover:-translate-y-0.5 hover:bg-white/5"
                style={{
                  borderColor: "rgba(45,212,191,0.35)",
                  color: "#99f6e4",
                }}
              >
                <Clock size={14} />
                Quick meals
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { value: "500+", label: "Recipes" },
                { value: "12+", label: "Categories" },
                { value: "5+", label: "New weekly" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3"
                >
                  {i > 0 && (
                    <span
                      className="h-6 w-px"
                      style={{ background: "rgba(45,212,191,0.2)" }}
                    />
                  )}
                  <div>
                    <p
                      className="font-display font-bold text-2xl leading-none"
                      style={{ color: "#5eead4" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mt-1"
                      style={{ color: "rgba(230,247,246,0.4)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stacked image panels ── */}
          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex flex-col gap-4 h-[580px]"
          >
            {/* Top tall image */}
            <div
              className="relative flex-[3] rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(4,47,46,0.7), 0 0 0 1px rgba(45,212,191,0.15)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panelSrcs[0]}
                alt="Featured recipe"
                className="w-full h-full object-cover object-center"
                style={{ display: "block" }}
              />
              {/* Recipe card overlay on image */}
              <div
                className="absolute bottom-0 inset-x-0 p-4"
                style={{
                  background: "linear-gradient(to top, rgba(4,47,46,0.92) 0%, transparent 100%)",
                }}
              >
                {featuredPosts[0] && (
                  <Link href={`/${featuredPosts[0].slug}`} className="block group">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest mb-1 block"
                      style={{ color: "#f59e0b" }}
                    >
                      {featuredPosts[0].category?.title ?? "Recipe"}
                    </span>
                    <p className="text-white text-sm font-bold leading-snug group-hover:text-teal-300 transition-colors line-clamp-2">
                      {featuredPosts[0].title}
                    </p>
                  </Link>
                )}
              </div>
              {/* Teal top-right tag */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase"
                style={{ background: "rgba(13,148,136,0.85)", color: "#ccfbf1" }}
              >
                ✦ New
              </div>
            </div>

            {/* Bottom two small images side by side */}
            <div className="flex gap-4 flex-[2]">
              {[panelSrcs[1], panelSrcs[2]].map((src, i) => (
                <div
                  key={i}
                  className="relative flex-1 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 12px 36px rgba(4,47,46,0.6), 0 0 0 1px rgba(45,212,191,0.1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="Recipe photo"
                    className="w-full h-full object-cover object-center"
                    style={{ display: "block" }}
                  />
                  {/* Amber overlay on hover */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(to top, rgba(217,119,6,0.5) 0%, transparent 50%)"
                          : "linear-gradient(to top, rgba(4,47,46,0.7) 0%, transparent 50%)",
                    }}
                  />
                  {featuredPosts[i + 1] && (
                    <div className="absolute bottom-0 inset-x-0 p-3">
                      <p className="text-white text-[11px] font-bold leading-snug line-clamp-2">
                        {featuredPosts[i + 1].title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Amber floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-2xl p-3.5 z-10"
              style={{
                background: "rgba(4,47,46,0.85)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(245,158,11,0.35)",
                boxShadow: "0 8px 32px rgba(4,47,46,0.6)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: "rgba(245,158,11,0.2)" }}
                >
                  🍽️
                </div>
                <div>
                  <p
                    className="text-[10px] font-black uppercase tracking-wider"
                    style={{ color: "#fbbf24" }}
                  >
                    Just posted
                  </p>
                  <p
                    className="text-xs font-semibold leading-tight max-w-[110px]"
                    style={{ color: "rgba(230,247,246,0.8)" }}
                  >
                    {featuredPosts[0]
                      ? featuredPosts[0].title.length > 28
                        ? featuredPosts[0].title.slice(0, 28) + "…"
                        : featuredPosts[0].title
                      : "Fresh recipe added"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        style={{ color: "rgba(230,247,246,0.35)" }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
