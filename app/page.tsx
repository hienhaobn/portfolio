"use client";

import Links from "@/components/links";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import InteractiveBackground from "@/components/home/InteractiveBackground";
import IntroSection from "@/components/home/IntroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import CallToAction from "@/components/home/CallToAction";

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

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized cursor follow effect with throttling
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Animated mouse follower
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Throttle mouse movement for better performance
    const throttledUpdate = () => {
      const xPos = mousePosition.x - window.innerWidth / 2;
      const yPos = mousePosition.y - window.innerHeight / 2;

      animate(x, xPos * 0.1, { type: "spring", stiffness: 50, damping: 20 });
      animate(y, yPos * 0.1, { type: "spring", stiffness: 50, damping: 20 });
    };

    // Use requestAnimationFrame for smooth animations
    const rafId = requestAnimationFrame(throttledUpdate);
    return () => cancelAnimationFrame(rafId);
  }, [mousePosition.x, mousePosition.y, x, y]);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive background and floating shapes */}
      <InteractiveBackground mousePosition={mousePosition} />

      {/* Hero section with title animation */}
      <HeroSection rotateX={rotateX} rotateY={rotateY} />

      {/* Main content */}
      <motion.div
        className="max-w-3xl mx-auto px-4 pb-20 pt-8 space-y-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <IntroSection />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Call to action */}
        <CallToAction />

        {/* Recent Blog Posts */}
        <RecentBlogPosts />
      </motion.div>

      {/* Links section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-16 px-4"
      >
        <Links />
      </motion.div>
    </div>
  );
}
