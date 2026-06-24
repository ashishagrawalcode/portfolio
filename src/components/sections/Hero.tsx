"use client";

import { useRef } from "react";
import { ScrollIndicator } from "../ui/ScrollIndicator";
import { motion, useScroll, useTransform } from "framer-motion";

import { HeroBackground } from "../ui/HeroBackground";
import { FloatingElements } from "../ui/FloatingElements";

export const Hero = ({
  mousePointer,
}: {
  mousePointer: React.MutableRefObject<{
    normalizedX: number;
    normalizedY: number;
    x: number;
    y: number;
  }>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const firstName = "ASHISH".split("");
  const lastName = "AGRAWAL".split("");

  return (
    <section id="hero" ref={containerRef} className="relative h-screen">
      <div className="h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Animated Aurora Background */}
        <HeroBackground mousePointer={mousePointer} />

        {/* Hero Typography */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20"
        >
          <div className="max-w-4xl relative">
            {/* Subtle floating accent for mobile density */}
            <div className="absolute top-0 right-10 w-32 h-32 bg-accent-violet/20 blur-3xl rounded-full md:hidden pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-40 h-40 bg-accent-blue/20 blur-3xl rounded-full md:hidden pointer-events-none" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent-violet font-heading text-xs md:text-base mb-3 md:mb-6 tracking-widest uppercase relative z-10"
            >
              Digital Portfolio // 2026
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-6xl leading-[0.9] tracking-tighter uppercase mb-4 sm:text-[5.5rem] md:text-8xl lg:text-[9rem] md:mb-8 relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
            >
              Ashish <br/> Agrawal.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-lg font-heading font-light text-text-secondary tracking-wider"
            >
              <span className="text-white">CS Undergrad @ BMU</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
              <span className="text-white">Full Stack Developer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              <span className="text-white">Product Builder</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-lg font-sans font-light text-text-secondary text-base md:text-lg leading-relaxed"
            >
              Second-year B.Tech student with a keen interest in exploring the full technology stack. Dedicated to building a strong foundation across web development and core programming concepts.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4 relative z-20"
            >
              <a 
                href="#projects" 
                className="group relative px-8 py-3 rounded-full bg-white text-black font-medium tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/20 to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </a>
              <a 
                href="#contact" 
                className="group px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium tracking-wide backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements on the Right */}
        <FloatingElements />

        {/* Premium Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator text="Scroll to Discover" />
        </motion.div>
      </div>
    </section>
  );
};
