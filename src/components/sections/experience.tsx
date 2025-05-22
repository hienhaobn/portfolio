"use client";

import PAST_ROLES from '@/data/experience'
import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

export default function Experience() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  return (
    <div className="mb-16">
      <motion.div
        className="mb-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-heading text-secondary font-bold inline-flex items-center">
          Experience
          <span className="relative ml-1">
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-ping opacity-75" />
          </span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-secondary/80 to-primary/80 mt-1" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {PAST_ROLES.map((role, id) => {
          return (
            <motion.div 
              className="relative"
              key={id}
              variants={item}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredId(id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className={`
                p-6 rounded-lg border backdrop-blur-sm transition-all duration-300
                ${hoveredId === id ? 'shadow-lg' : 'shadow-sm'}
              `}
              style={{
                background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.03), rgba(var(--secondary-rgb), 0.06))`,
                borderColor: hoveredId === id
                  ? `rgba(var(--primary-rgb), 0.3)`
                  : `rgba(var(--secondary-rgb), 0.1)`,
              }}>
                {/* Glow effect when hovered */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-glow-slide rounded-lg"></div>
                
                {/* Icon and company info */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`
                      h-12 w-12 rounded-full flex items-center justify-center text-2xl
                      shadow-lg border border-secondary/30
                      ${hoveredId === id ? 'scale-110' : 'scale-100'}
                      transition-all duration-300
                    `}
                    style={{
                      background: hoveredId === id 
                        ? `linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), rgba(var(--secondary-rgb), 0.2))`
                        : `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--secondary-rgb), 0.1))`
                    }}>
                      {role.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className={`
                      text-lg font-heading sm:text-xl font-semibold text-secondary
                    `}>
                      {role.role} @ {role.company}
                    </h3>

                    <div className="mb-3 mt-1 text-sm flex items-center gap-2">
                      <span>{role.startDate} - {role.endDate}</span>
                      {role.location && (
                        <>
                          <span className="inline-block h-1 w-1 rounded-full bg-secondary/40"></span>
                          <span className="text-secondary/90">{role.location}</span>
                        </>
                      )}
                    </div>
                    
                    <p className="leading-relaxed">{role.description}</p>
                    
                    {/* Particles on hover */}
                    {hoveredId === id && (
                      <>
                        <div className="absolute top-0 right-1/4 h-[1px] w-[1px] rounded-full bg-primary animate-particle-top"></div>
                        <div className="absolute top-1/3 right-0 h-[1px] w-[1px] rounded-full bg-primary animate-particle-right"></div>
                        <div className="absolute bottom-0 right-2/3 h-[1px] w-[1px] rounded-full bg-primary animate-particle-bottom"></div>
                        <div className="absolute top-1/2 left-0 h-[1px] w-[1px] rounded-full bg-primary animate-particle-left"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Styles for particles and animations */}
      <style jsx global>{`
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
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(0, -20px);
            opacity: 0;
          }
        }

        @keyframes particle-right {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(20px, 0);
            opacity: 0;
          }
        }

        @keyframes particle-bottom {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(0, 20px);
            opacity: 0;
          }
        }

        @keyframes particle-left {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-20px, 0);
            opacity: 0;
          }
        }

        .animate-glow-slide {
          animation: glow-slide 2s ease-in-out infinite;
        }

        .animate-particle-top {
          animation: particle-top 1.5s ease-out infinite;
        }

        .animate-particle-right {
          animation: particle-right 1.5s ease-out infinite;
          animation-delay: 0.5s;
        }

        .animate-particle-bottom {
          animation: particle-bottom 1.5s ease-out infinite;
          animation-delay: 0.3s;
        }

        .animate-particle-left {
          animation: particle-left 1.5s ease-out infinite;
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  )
}
