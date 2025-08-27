"use client";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number).fill(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {meteors.map((_, idx) => {
        // Spread meteors across the width
        const position = Math.random() * 100 + "%";
        const size = Math.random() * 2 + 1; // 1px - 3px
        const opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 5 + 5; // 5s - 10s
        const delay = Math.random() * 5; // 0s - 5s

        return (
          <span
            key={idx}
            className={cn(
              "absolute rounded-full bg-white shadow-[0_0_6px_#fff] animate-meteor-effect",
            )}
            style={{
              top: "-20px", // start above viewport
              left: position,
              width: size + "px",
              height: size + "px",
              opacity: opacity,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
