"use client";

import { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const MagneticButton = ({ children, className, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Stronger magnetic pull
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.1 }}
      className={cn(
        "relative px-8 py-4 rounded-full bg-white text-bg-primary font-bold overflow-hidden group",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-accent-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
        {children}
      </span>
    </motion.button>
  );
};
