"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/button/button-link";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function CallToAction() {
  return (
    <motion.div
      variants={itemVariants}
      initial={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      whileHover={{
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        y: -5,
      }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
    >
      <p>Want to know more about my experience and skills?</p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ButtonLink href="/about" target="_self" className="relative group">
          <span className="relative z-10">About Me</span>
          <motion.span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <span className="ml-1 relative group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </ButtonLink>
      </motion.div>
    </motion.div>
  );
}
