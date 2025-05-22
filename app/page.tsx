"use client";

import Links from "@/components/links";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { ButtonLink } from "@/components/button/button-link";
import { useRef, useEffect, useState } from "react";

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

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [nameText, setNameText] = useState("Joy Dev");
  const [homeText, setHomeText] = useState("Home");

  // Cursor follow effect for the gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text scramble effect
  useEffect(() => {
    if (isTitleInView) {
      let iteration = 0;
      const originalText = "Joy Dev";
      const originalHomeText = "Home";

      const interval = setInterval(() => {
        setNameText(
          originalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        setHomeText(
          originalHomeText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return originalHomeText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= Math.max(originalText.length, originalHomeText.length)) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isTitleInView]);

  // Animated mouse follower
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const xPos = mousePosition.x - window.innerWidth / 2;
    const yPos = mousePosition.y - window.innerHeight / 2;

    animate(x, xPos * 0.1, { type: "spring", stiffness: 50, damping: 20 });
    animate(y, yPos * 0.1, { type: "spring", stiffness: 50, damping: 20 });
  }, [mousePosition.x, mousePosition.y]);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const gradient = useMotionTemplate`
    radial-gradient(
      circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(var(--primary-rgb), 0.15) 0%,
      rgba(var(--secondary-rgb), 0.05) 40%,
      rgba(var(--background-rgb), 0) 80%
    )
  `;

  return (
    <div className="font-base relative overflow-hidden">
      {/* Interactive background */}
      <motion.div
        className="fixed inset-0 z-[-2]"
        style={{ background: gradient }}
      />

      {/* Floating shapes */}
      <div className="absolute top-40 right-20 z-[-1] opacity-20 animate-float">
        <div className="bg-primary h-16 w-16 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-20 left-10 z-[-1] opacity-20 animate-float-delay">
        <div className="bg-secondary h-10 w-10 rounded-md blur-lg" />
      </div>

      {/* Header with animation */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        className="relative z-10"
      >
        <h1 className="text-3xl font-heading sm:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text">
          {homeText}
        </h1>

        <h1 className="text-3xl font-heading sm:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text">
          {nameText}
        </h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-primary/50 to-secondary/50 mt-1"
        />
        <motion.p
          className="mt-2 text-lg sm:text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Software Engineer
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-10 text-base sm:text-lg space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
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

        {/* Featured projects preview */}
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
              {[
                {
                  title: "Nester",
                  description:
                    "Thread-based social network with optimized Timeline",
                  icon: "🧵",
                },
                {
                  title: "Atriv",
                  description:
                    "AI-powered NFT generation platform with wallet integration",
                  icon: "🎭",
                },
                {
                  title: "5S Job",
                  description: "Japanese job and language learning application",
                  icon: "🗣️",
                },
              ].map((project, index) => (
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
                    <div className="font-medium text-primary">
                      {project.title}
                    </div>
                    <div className="text-sm opacity-80">
                      {project.description}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-5 flex justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
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

        {/* Call to action */}
        <motion.div
          // variants={itemVariants}
          // whileHover={{ scale: 1.02 }}
          // className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10"
      >
        <Links />
      </motion.div>

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-delay {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 9s ease-in-out infinite;
        }

        :root {
          --primary-rgb: 255, 159, 0;
          --secondary-rgb: 123, 97, 255;
          --background-rgb: 255, 255, 255;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --background-rgb: 10, 10, 10;
          }
        }
      `}</style>
    </div>
  );
}
