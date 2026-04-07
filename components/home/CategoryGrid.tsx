"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
  postImages?: Record<string, string>;
}

export function CategoryGrid({ categories, postImages = {} }: CategoryGridProps) {
  if (!categories.length) return null;

  return (
    <section className="section-gap bg-orange-50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="overline text-primary mb-3">Browse</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Recipe Categories
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Explore our collection of delicious recipes organized by meal type
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.slice(0, 10).map((category) => (
            <motion.div key={category._id} variants={fadeUpVariant}>
              <Link
                href={`/category/${category.slug}`}
                className="group relative h-40 sm:h-48 rounded-lg overflow-hidden bg-gradient-to-br from-orange-200 to-orange-300 hover:shadow-lg transition-all block"
              >
                {postImages[category.slug] && (
                  <Image
                    src={postImages[category.slug]}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-center text-sm sm:text-base px-2 drop-shadow">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
