"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function IntroSection() {
  return (
    <div className="space-y-6">
      {/* Brief introduction */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.p
          variants={itemVariants}
          className="border-l-4 border-primary pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-md"
        >
          Hello! I&apos;m a Software Engineer with over 4 years of experience
          building web and mobile applications, with a strong focus on
          ReactJS, Next.js, and React Native.
        </motion.p>
        <div className="absolute -left-1 top-0 h-full w-1 bg-primary/30 blur-sm" />
      </motion.div>

      <motion.p
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="pl-4"
      >
        I specialize in creating responsive, performant user interfaces and
        have worked across various domains including social networks, crypto
        exchanges, and enterprise platforms.
      </motion.p>
    </div>
  );
}
