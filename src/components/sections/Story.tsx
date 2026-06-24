"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const frames = [
  {
    text: "It started with curiosity.",
    sub: "A desire to understand how things work, how pixels become products.",
  },
  {
    text: "One idea became many.",
    sub: "Financial simulations. Business systems. Interactive experiences. Each one a step forward.",
  },
  {
    text: "I stopped learning frameworks.",
    sub: "The shift from consumer to creator. From tutorials to production.",
  },
  {
    text: "Today, I build what matters.",
    accent: true,
    sub: "",
  },
];

const CinematicFrame = ({ frame, index, scrollYProgress }: any) => {
  // Mapping each frame to a 20% scroll chunk of the 400vh container
  const trigger = 0.15 + index * 0.2;
  const startIn = Math.max(0, trigger - 0.05);
  const endIn = trigger;
  
  // Last frame stays visible until the end
  const startOut = index === frames.length - 1 ? 0.95 : trigger + 0.1;
  const endOut = index === frames.length - 1 ? 1 : startOut + 0.05;

  const opacity = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], [0.8, 1, 1, 1.2]);
  const blur = useTransform(scrollYProgress, [startIn, endIn, startOut, endOut], ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"]);

  return (
    <motion.div
      style={{ opacity, scale, filter: blur }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 text-center flex flex-col items-center justify-center pointer-events-none"
    >
      <h2
        className={`font-display font-bold leading-[1.15] whitespace-pre-line mb-6 ${
          frame.accent ? "text-5xl md:text-7xl lg:text-9xl tracking-tight" : "text-4xl md:text-6xl lg:text-7xl tracking-tight"
        }`}
        style={
          frame.accent
            ? {
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : {
                background: "linear-gradient(180deg, #ffffff, rgba(255,255,255,0.45))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
        }
      >
        {frame.text}
      </h2>
      {frame.sub && (
        <p className="text-white/50 text-lg md:text-2xl max-w-2xl leading-relaxed mx-auto font-heading font-light tracking-wide">
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
    <section id="story" ref={containerRef} className="relative h-[400vh] bg-bg-primary">
      {/* Pinned Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Dynamic Ambient Glow */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.2]),
            scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.5]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent-violet/[0.04] blur-[120px] pointer-events-none z-0" 
        />

        {/* Section label */}
        <div className="absolute top-12 md:top-24 w-full text-center z-30 pointer-events-none">
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
            className="text-accent-violet text-[10px] md:text-xs font-heading tracking-[0.3em] uppercase"
          >
            My Story
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 font-heading text-xs tracking-widest uppercase pointer-events-none"
        >
          <span>Scroll to uncover</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
};
