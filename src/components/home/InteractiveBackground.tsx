"use client";

import { motion, useMotionTemplate } from "framer-motion";

interface InteractiveBackgroundProps {
  mousePosition: { x: number; y: number };
}

export default function InteractiveBackground({ mousePosition }: InteractiveBackgroundProps) {
  const gradient = useMotionTemplate`
    radial-gradient(
      circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(var(--primary-rgb), 0.15) 0%,
      rgba(var(--secondary-rgb), 0.05) 40%,
      rgba(var(--background-rgb), 0) 80%
    )
  `;

  return (
    <>
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
    </>
  );
}
