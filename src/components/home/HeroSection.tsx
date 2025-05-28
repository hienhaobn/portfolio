"use client";

import { motion, useInView, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

export default function HeroSection({ rotateX, rotateY }: HeroSectionProps) {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [nameText, setNameText] = useState("Joy Dev");
  const [homeText, setHomeText] = useState("Home");

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
            .map((_, index) => {
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
            .map((_, index) => {
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
  }, [isTitleInView, letters]);

  return (
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
      className="relative z-10 pt-20 pb-8 px-4 text-center"
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
        className="h-px bg-gradient-to-r from-primary/50 to-secondary/50 mt-1 mx-auto max-w-xs"
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
  );
}
