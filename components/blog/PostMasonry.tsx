"use client";

import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import { fadeUpVariant } from "@/lib/animations";
import type { Post } from "@/types";

interface PostMasonryProps {
  posts: Post[];
}

export function PostMasonry({ posts }: PostMasonryProps) {
  if (!posts.length) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="columns-1 sm:columns-2 lg:columns-3 gap-6"
    >
      {posts.map((post) => (
        <motion.div
          key={post._id}
          variants={fadeUpVariant}
          className="mb-6 break-inside-avoid"
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
