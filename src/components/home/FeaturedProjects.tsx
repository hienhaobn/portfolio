"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/button/button-link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const projects = [
  {
    title: "Nester",
    description: "Thread-based social network with optimized Timeline",
    icon: "🧵",
  },
  {
    title: "Atriv",
    description: "AI-powered NFT generation platform with wallet integration",
    icon: "🎭",
  },
  {
    title: "5S Job",
    description: "Japanese job and language learning application",
    icon: "🗣️",
  },
];

export default function FeaturedProjects() {
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
      className="bg-secondary/5 backdrop-blur-sm rounded-lg p-5 border border-secondary/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 opacity-30" />
      <div className="relative z-10">
        <p className="font-semibold text-xl mb-3">Featured Projects</p>
        <motion.ul
          className="space-y-3"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{
                backgroundColor: "rgba(var(--secondary-rgb), 0.15)",
                x: 5,
              }}
              className="flex items-center gap-3 p-3 rounded-md transition-colors border border-transparent hover:border-secondary/20"
            >
              <div className="text-xl">{project.icon}</div>
              <div>
                <div className="font-medium text-primary">{project.title}</div>
                <div className="text-sm opacity-80">{project.description}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-5 flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <ButtonLink
              href="/projects"
              target="_self"
              className="text-xs px-3 py-1 relative overflow-hidden group"
            >
              <span className="relative z-10">View all projects</span>
              <motion.span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="ml-1 relative group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
