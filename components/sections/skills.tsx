"use client";

import SKILLS from "@/data/skils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { motion, useAnimate } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const skillItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

// Rotate các màu để mỗi skill có màu khác nhau
const colors = [
  "from-[#FF9F00] to-[#F56565]", // Orange-Red
  "from-[#38B2AC] to-[#4299E1]", // Teal-Blue
  "from-[#9F7AEA] to-[#ED64A6]", // Purple-Pink
  "from-[#48BB78] to-[#38B2AC]", // Green-Teal
  "from-[#ED8936] to-[#ED64A6]", // Orange-Pink
  "from-[#667EEA] to-[#9F7AEA]", // Indigo-Purple
  "from-[#4299E1] to-[#667EEA]", // Blue-Indigo
  "from-[#ED64A6] to-[#F56565]", // Pink-Red
];

// Màu chính cho mỗi danh mục kỹ năng
const categoryColors = {
  "Frontend Development": "from-[#FF9F00] to-[#F56565]",
  "Backend Development": "from-[#38B2AC] to-[#4299E1]",
  "Mobile Development": "from-[#9F7AEA] to-[#ED64A6]",
  Others: "from-[#667EEA] to-[#9F7AEA]",
};

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scope] = useAnimate();

  // Debug value to check if component is rendering
  console.log("Skills component rendering");

  // Hiệu ứng tỏa sáng ngẫu nhiên cho các skill khi load trang
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const glowRandomSkill = () => {
      if (containerRef.current) {
        const skillItems = containerRef.current.querySelectorAll(".skill-item");
        if (skillItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * skillItems.length);
          const element = skillItems[randomIndex] as HTMLElement;

          element.classList.add("glow-pulse");

          setTimeout(() => {
            element.classList.remove("glow-pulse");
          }, 2000);
        }
      }

      const timeout = setTimeout(glowRandomSkill, Math.random() * 4000 + 3000);
      timeouts.push(timeout);
    };

    const initialTimeout = setTimeout(glowRandomSkill, 3000);
    timeouts.push(initialTimeout);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  const getColorClass = (catName: string, index: number) => {
    const baseCategory = catName as keyof typeof categoryColors;
    return categoryColors[baseCategory] || colors[index % colors.length];
  };

  return (
    <div className="mb-8" ref={containerRef}>
      <motion.div
        className="mb-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-heading bg-gradient-to-r from-secondary to-primary bg-clip-text inline-flex items-center">
          Skills
          <span className="relative ml-1">
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-ping opacity-75" />
          </span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-secondary/80 to-primary/80 mt-1" />
      </motion.div>

      {SKILLS.map((item, id) => {
        const categoryColor = getColorClass(item.field, id);

        return (
          <motion.div
            key={id}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: id * 0.1 }}
          >
            <motion.h3
              className={`mb-5 text-lg font-heading sm:text-xl pl-3 border-l-3 relative overflow-hidden`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: id * 0.1 }}
              style={{
                borderImageSlice: 1,
                borderImageSource: `linear-gradient(to bottom, rgb(var(--primary-rgb)), rgb(var(--secondary-rgb)))`,
                borderLeftWidth: "3px",
                borderLeftStyle: "solid",
              }}
            >
              <span
                className={`bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}
              >
                {item.field}
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-secondary/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.1 + 0.3, duration: 0.8 }}
              />
            </motion.h3>

            <motion.div
              className="flex flex-wrap gap-5"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              ref={scope}
            >
              {item.skills.map((skill, skillId) => {
                return (
                  <motion.div
                    key={skillId}
                    variants={skillItem}
                    className="skill-item relative"
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredIndex(id * 100 + skillId)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <div
                            className="group p-4 rounded-lg border backdrop-blur-sm cursor-pointer flex items-center justify-center h-16 w-16 relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                            style={{
                              background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.05), rgba(var(--secondary-rgb), 0.1))`,
                              borderColor:
                                hoveredIndex === id * 100 + skillId
                                  ? `rgba(var(--primary-rgb), 0.5)`
                                  : `rgba(var(--secondary-rgb), 0.2)`,
                            }}
                          >
                            {/* Glow effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-glow-slide"></div>

                            {/* Icon với màu gradient */}
                            <div
                              className={`relative z-10 transform transition-transform duration-300 group-hover:scale-110`}
                            >
                              <skill.icon
                                className={`h-8 w-8 transition-colors duration-300`}
                                style={{
                                  color:
                                    hoveredIndex === id * 100 + skillId
                                      ? `rgba(var(--primary-rgb), 1)`
                                      : `rgba(var(--primary-rgb), 0.8)`,
                                  filter:
                                    hoveredIndex === id * 100 + skillId
                                      ? "drop-shadow(0 0 2px rgba(var(--primary-rgb), 0.5))"
                                      : "none",
                                }}
                                title=""
                              />
                            </div>

                            {/* Particle effects - appear on hover */}
                            {hoveredIndex === id * 100 + skillId && (
                              <>
                                <div className="absolute top-0 left-1/2 h-[1px] w-[1px] rounded-full bg-primary animate-particle-top"></div>
                                <div className="absolute top-1/4 right-0 h-[1px] w-[1px] rounded-full bg-primary animate-particle-right"></div>
                                <div className="absolute bottom-0 left-1/2 h-[1px] w-[1px] rounded-full bg-primary animate-particle-bottom"></div>
                                <div className="absolute top-1/2 left-0 h-[1px] w-[1px] rounded-full bg-primary animate-particle-left"></div>
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-md border border-primary/20 shadow-lg text-primary px-3 py-2 rounded-md"
                          sideOffset={8}
                        >
                          <span className="font-medium">{skill.skill}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        );
      })}

      <style jsx global>{`
        .text-gradient-secondary {
          position: relative;
        }

        .text-gradient-secondary::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(var(--secondary-rgb), 0.7),
            rgba(var(--primary-rgb), 0.3)
          );
        }

        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow: 0 0 8px 2px rgba(var(--primary-rgb), 0.3);
            transform: scale(1.1);
          }
          50% {
            box-shadow: 0 0 15px 3px rgba(var(--primary-rgb), 0.5);
            transform: scale(1.15);
          }
        }

        @keyframes glow-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes particle-top {
          0% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -20px);
            opacity: 0;
          }
        }

        @keyframes particle-right {
          0% {
            transform: translate(0, -50%);
            opacity: 1;
          }
          100% {
            transform: translate(20px, -50%);
            opacity: 0;
          }
        }

        @keyframes particle-bottom {
          0% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
        }

        @keyframes particle-left {
          0% {
            transform: translate(0, -50%);
            opacity: 1;
          }
          100% {
            transform: translate(-20px, -50%);
            opacity: 0;
          }
        }

        .animate-glow-slide {
          animation: glow-slide 2s ease-in-out infinite;
        }

        .animate-particle-top {
          animation: particle-top 2s ease-out infinite;
        }

        .animate-particle-right {
          animation: particle-right 2s ease-out infinite;
          animation-delay: 0.5s;
        }

        .animate-particle-bottom {
          animation: particle-bottom 2s ease-out infinite;
          animation-delay: 0.3s;
        }

        .animate-particle-left {
          animation: particle-left 2s ease-out infinite;
          animation-delay: 0.7s;
        }

        .glow-pulse {
          animation: glow-pulse 2s ease-in-out;
        }

        .bg-pattern {
          background-image: radial-gradient(
            circle at center,
            rgba(var(--primary-rgb), 0.15) 0,
            rgba(var(--primary-rgb), 0) 3px
          );
          background-size: 12px 12px;
        }
      `}</style>
    </div>
  );
}
