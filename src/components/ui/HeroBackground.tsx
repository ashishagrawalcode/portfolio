"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface HeroBackgroundProps {
  mousePointer: React.MutableRefObject<{
    normalizedX: number;
    normalizedY: number;
    x: number;
    y: number;
  }>;
}

export const HeroBackground = ({ mousePointer }: HeroBackgroundProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Smooth springs for the interactive spotlight (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
    const desktop = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(desktop);
    if (!desktop) return; // No mouse on mobile, skip listener
    
    // Track mouse manually for the spotlight to avoid constant re-renders
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Center initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Template for the spotlight gradient
  const spotlightGradient = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(139, 92, 246, 0.12), transparent 80%)`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-bg-primary">
      {/* Interactive Spotlight (desktop only — needs a mouse) */}
      {isClient && isDesktop && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
          style={{ background: spotlightGradient }}
        />
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      {/* Animated Aurora Orbs — static on mobile, animated on desktop */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden">
        {isDesktop ? (
          <>
            <motion.div
              animate={{ x: ["-20%", "20%", "-10%", "-20%"], y: ["-10%", "10%", "-20%", "-10%"], scale: [1, 1.2, 0.9, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ x: ["20%", "-20%", "10%", "20%"], y: ["20%", "-10%", "10%", "20%"], scale: [0.9, 1.1, 1.2, 0.9] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[30%] right-[10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(76,29,149,0.4) 0%, transparent 70%)' }}
            />
          </>
        ) : (
          <>
            {/* Static orbs on mobile — no CPU cost */}
            <div
              className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-[30%] right-[10%] w-[60vw] h-[60vw] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(76,29,149,0.5) 0%, transparent 70%)' }}
            />
          </>
        )}
      </div>
      
      {/* Subtle vignette to darken edges and focus on center/spotlight */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(6,7,10,1)]" />
    </div>
  );
};

