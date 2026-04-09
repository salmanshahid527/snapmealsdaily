"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Leaf } from "lucide-react";
import { fadeUpVariant } from "@/lib/animations";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
  };

  return (
    /* Dark teal section with teal→amber gradient — final bold section */
    <section className="relative section-gap overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, #042f2e 0%, #0d9488 50%, #d97706 100%)",
        }}
      />

      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hex"
              x="0"
              y="0"
              width="56"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="14,0 42,0 56,24 42,48 14,48 0,24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #5eead4 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-[600px] px-4 sm:px-6 text-center">
        {/* Icon */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Leaf size={24} className="text-white" />
          </div>
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Weekly recipes, straight to your inbox
        </motion.h2>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          No spam — just seasonal ideas, tips, and plates you&apos;ll want to
          make twice.
        </motion.p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <Check size={20} className="text-white" />
              </div>
              <p className="text-white font-semibold">
                You&apos;re in — happy cooking!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-full text-sm focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    color: "white",
                  }}
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5 shrink-0"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-foreground)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.45)",
                }}
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mt-6 text-xs flex-wrap"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <span>✓ Free</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ No junk</span>
        </motion.div>
      </div>
    </section>
  );
}
