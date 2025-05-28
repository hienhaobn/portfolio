"use client";

import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import { motion, useMotionTemplate, useMotionValue, useTransform, animate, useInView } from "framer-motion";
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

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [titleText, setTitleText] = useState("About Me");

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
      const originalText = "About Me";

      const interval = setInterval(() => {
        setTitleText(
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

        if (iteration >= originalText.length) {
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
  }, [mousePosition.x, mousePosition.y, x, y]);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const gradient = useMotionTemplate`
    radial-gradient(
      circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(var(--secondary-rgb), 0.15) 0%,
      rgba(var(--primary-rgb), 0.05) 40%,
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
      <div className="absolute top-20 left-20 z-[-1] opacity-20 animate-float">
        <div className="bg-secondary h-16 w-16 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-40 right-10 z-[-1] opacity-20 animate-float-delay">
        <div className="bg-primary h-10 w-10 rounded-md blur-lg" />
      </div>

      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 800
        }}
        className="relative z-10"
      >
        <h1 className="mb-8 text-2xl font-heading sm:text-4xl bg-gradient-to-r from-secondary to-primary bg-clip-text">
          {titleText}
        </h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-secondary/50 to-primary/50 -mt-7 mb-7"
        />
      </motion.div>

      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div
          variants={itemVariants}
          className="mb-10 text-base sm:text-lg space-y-4"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <p className="border-l-4 border-secondary pl-4 py-2 bg-gradient-to-r from-secondary/5 to-transparent rounded-r-md">
              I&apos;m a Software Engineer with over 4 years of professional
              experience in web and mobile development, focusing on ReactJS, Next.js,
              and React Native. I&apos;ve also taken on leadership roles and worked
              directly with international clients across Japan, Korea, Poland, and
              Vietnam.
            </p>
            <div className="absolute -left-1 top-0 h-full w-1 bg-secondary/30 blur-sm" />
          </motion.div>

          <motion.p
            whileHover={{ scale: 1.01 }}
            className="pl-4"
          >
            I&apos;ve been involved in diverse projects such as social networking
            platforms, crypto exchanges (CEX), NFT minting platforms, internal
            enterprise tools, and education/job apps. In these projects, I&apos;ve
            handled everything from building UI components, managing state,
            integrating APIs, to performance optimization and production
            deployment.
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-gradient-to-r from-secondary/10 to-primary/10 p-4 rounded-lg italic text-center font-medium mt-8"
          >
            I&apos;m driven by continuous learning, writing clean and scalable
            code, and team collaboration.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial={{
            opacity: 0,
            y: 50,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            y: -5
          }}
          className="bg-gradient-to-br from-transparent via-secondary/5 to-transparent p-6 rounded-lg border border-secondary/20 relative"
        >
          <div className="absolute top-0 right-0 h-20 w-20 bg-secondary/10 rounded-full blur-xl -z-10" />
          <Skills />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial={{
            opacity: 0,
            y: 50,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            y: -5
          }}
          className="bg-gradient-to-br from-transparent via-primary/5 to-transparent p-6 rounded-lg border border-primary/20 relative"
        >
          <div className="absolute bottom-0 left-0 h-20 w-20 bg-primary/10 rounded-full blur-xl -z-10" />
          <Experience />
        </motion.div>
      </motion.div>

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes float-delay {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
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
