"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollIndicator } from "../ui/ScrollIndicator";

const designs = [
  { id: 1, label: "BRAND IDENTITY", color: "bg-blue-500/30", spread: { x: -30, y: -20, r: -15 }, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 2, label: "UI DASHBOARD", color: "bg-purple-500/30", spread: { x: 30, y: -15, r: 12 }, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, label: "MOBILE APP", color: "bg-emerald-500/30", spread: { x: -35, y: 5, r: -5 }, img: "https://images.unsplash.com/photo-1607252656733-fd7458eb0b45?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, label: "WEBSITE", color: "bg-amber-500/30", spread: { x: 35, y: 15, r: 8 }, img: "https://images.unsplash.com/photo-1507238692062-5a04ce4bfde6?q=80&w=2000&auto=format&fit=crop" },
  { id: 5, label: "POSTER SERIES", color: "bg-pink-500/30", spread: { x: -20, y: 30, r: -20 }, img: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2000&auto=format&fit=crop" },
  { id: 6, label: "SOCIAL", color: "bg-indigo-500/30", spread: { x: 20, y: 35, r: 18 }, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop" },
];

const DraggableDesignCardPinned = ({ design, index, scrollYProgress, isMobile }: any) => {
  // Reduce spread by half on mobile so they stay on screen
  const factor = isMobile ? 0.6 : 1;

  // Stagger the exit slightly based on index
  const start = 0.05 + index * 0.02;
  const end = 0.6 + index * 0.02;

  const xStr = useTransform(scrollYProgress, [start, end], ["0vw", `${design.spread.x * factor}vw`]);
  const yStr = useTransform(scrollYProgress, [start, end], ["0vh", `${design.spread.y * factor}vh`]);
  const rStr = useTransform(scrollYProgress, [start, end], ["0deg", `${design.spread.r}deg`]);
  const scale = useTransform(scrollYProgress, [start, start + 0.3], [0.1, 1]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);

  return (
    <motion.div
      style={{ x: xStr, y: yStr, rotate: rStr, scale, opacity }}
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none z-20"
    >
      <motion.div
        drag
        dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
        whileHover={{ scale: 1.05 }}
        className="w-[160px] h-[220px] md:w-[240px] md:h-[340px] rounded-2xl glass-card overflow-hidden cursor-none flex items-center justify-center border border-white/20 shadow-2xl pointer-events-auto relative"
      >
        {/* Image */}
        <img 
          src={design.img} 
          alt={design.label} 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          loading="lazy"
          decoding="async"
        />
        
        {/* Color Overlay */}
        <div className={`absolute inset-0 bg-bg-primary/50 mix-blend-multiply pointer-events-none`} />
        <div className={`absolute inset-0 ${design.color} opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none`} />

        {/* Card Pattern/Noise */}
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id={`noise-${design.id}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#noise-${design.id})`} />
          </svg>
        </div>

        <span className="relative z-10 text-white font-heading text-sm md:text-lg font-bold tracking-widest text-center px-4 drop-shadow-md pointer-events-none">
          {design.label}
        </span>
      </motion.div>
    </motion.div>
  );
};

export const DesignGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-bg-secondary">

      {/* Pinned Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* Header Content */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]) }}
          className="absolute top-12 md:top-20 w-full text-center z-30 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase tracking-wider">
            Design Gallery
          </h2>
          <p className="text-text-secondary mt-4 max-w-md mx-auto font-heading tracking-widest text-sm uppercase">
            Scroll to unpack • Drag to explore
          </p>
        </motion.div>

        {/* Back Cover of Folder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-0 pointer-events-none perspective-[1500px]">
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.4], [1, 1.25]),
              y: useTransform(scrollYProgress, [0, 0.4], [0, 150]),
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [1, 0]),
            }}
            className="w-[220px] h-[160px] md:w-[320px] md:h-[220px] bg-gradient-to-br from-accent-violet/20 to-bg-primary/50 border border-white/10 rounded-2xl rounded-tl-[40px] backdrop-blur-2xl shadow-[inset_0_0_40px_rgba(139,92,246,0.3)] flex flex-col justify-end p-4 overflow-hidden"
          >
            {/* Grid pattern on the inside */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </motion.div>
        </div>

        {/* Draggable Cards Scrubbed by Scroll */}
        {designs.map((design, index) => (
          <DraggableDesignCardPinned key={design.id} design={design} index={index} scrollYProgress={scrollYProgress} isMobile={isMobile} />
        ))}

        {/* Front Cover of Folder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-30 pointer-events-none perspective-[1500px]">
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.4], [1, 1.25]),
              y: useTransform(scrollYProgress, [0, 0.4], [0, 150]),
              rotateX: useTransform(scrollYProgress, [0, 0.25], [0, -85]), // Open downwards more dramatically
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [1, 0]),
              transformOrigin: "bottom center"
            }}
            className="w-[220px] h-[150px] md:w-[320px] md:h-[200px] mt-2 md:mt-5 bg-gradient-to-tr from-white/10 via-accent-violet/20 to-white/5 border border-white/20 rounded-2xl backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.5)] overflow-hidden"
          >
            {/* Glass reflection streak */}
            <div className="absolute -inset-1/2 bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-50">
              <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-white/40 to-transparent" />
              <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
        >
          <ScrollIndicator text="Unpack Gallery" />
        </motion.div>

      </div>
    </section>
  );
};
