"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "../canvas/HeroScene";

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
        {/* 3D Scene Background */}
        <HeroScene mousePointer={mousePointer} />

        {/* Hero Typography */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20"
        >
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent-violet font-heading text-sm md:text-base mb-6 tracking-widest uppercase"
            >
              Digital Portfolio // 2026
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight text-white uppercase mb-8"
            >
              Ashish <br/> Agrawal.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-lg font-heading font-light text-text-secondary tracking-wider"
            >
              <span className="text-white">Founder</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
              <span className="text-white">Full Stack Developer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              <span className="text-white">Product Designer</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-lg text-white/60 text-sm md:text-base leading-relaxed font-light"
            >
              I build high-performance web applications and design intuitive interfaces. Focused on creating digital experiences that feel seamless, fast, and human.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] tracking-[0.3em] text-text-secondary/50 uppercase font-heading">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-6 bg-gradient-to-b from-text-secondary/40 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
