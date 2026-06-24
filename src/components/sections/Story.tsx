"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollIndicator } from "../ui/ScrollIndicator";

const frames = [
  {
    text: "It began with a spark.",
    sub: "A relentless curiosity to fuse logical engineering with aesthetic design.",
  },
  {
    text: "From Campus to Core Architecture.",
    sub: "Leading design teams at BMU, orchestrating hackathons, and diving deep into C++, Python, and full-stack web.",
  },
  {
    text: "Beyond standard frameworks.",
    sub: "Building ArthiX, Ledzer, and VoughtMart. Transitioning from raw concepts to production-grade, scalable applications.",
  },
  {
    text: "I don't just write code.",
    accent: true,
    sub: "I architect experiences.",
  },
];

const CinematicFrame = ({ frame, index, scrollYProgress }: any) => {
  const trigger = 0.15 + index * 0.22;
  const startIn = Math.max(0, trigger - 0.08);
  const endIn = trigger;
  
  const startOut = index === frames.length - 1 ? 0.95 : trigger + 0.12;
  const endOut = index === frames.length - 1 ? 1 : startOut + 0.08;

  const opacity = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], [50, 0, 0, -50]);
  const blur = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center pointer-events-none"
    >
      <h2
        className={`font-display font-black leading-[1.1] whitespace-pre-line mb-6 md:mb-8 ${
          frame.accent ? "text-6xl md:text-8xl lg:text-[10rem] tracking-tighter" : "text-5xl md:text-7xl lg:text-8xl tracking-tight"
        }`}
        style={
          frame.accent
            ? {
                background: "linear-gradient(135deg, #ffffff 0%, #8b5cf6 50%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 20px 40px rgba(139,92,246,0.4))",
              }
            : {
                background: "linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.2) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
        }
      >
        {frame.text}
      </h2>
      {frame.sub && (
        <p 
          className={`font-sans font-light text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mx-auto ${frame.accent ? "text-accent-violet/80 font-semibold tracking-widest uppercase text-xl md:text-2xl" : ""}`}
        >
          {frame.sub}
        </p>
      )}
    </motion.div>
  );
};

export const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="story" ref={containerRef} className="relative h-[450vh] bg-bg-primary">
      {/* Pinned Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        {/* Dynamic Ambient Glows (Optimized with Radial Gradients) */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.6, 0.2]),
            scale: useTransform(scrollYProgress, [0, 1], [0.8, 2]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 90]),
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] rounded-[100%] pointer-events-none z-0" 
        />
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0]),
            scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5]),
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[60vw] rounded-[100%] pointer-events-none z-0" 
        />

        {/* Section label */}
        <div className="absolute top-12 md:top-24 w-full text-center z-30 pointer-events-none">
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
            className="text-accent-violet text-[10px] md:text-xs font-heading tracking-[0.3em] uppercase"
          >
            The Journey
          </motion.p>
        </div>

        {/* Cinematic Frames */}
        <div className="relative w-full h-full z-10">
          {frames.map((frame, index) => (
            <CinematicFrame key={index} frame={frame} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator text="Continue Journey" />
        </motion.div>

      </div>
    </section>
  );
};
