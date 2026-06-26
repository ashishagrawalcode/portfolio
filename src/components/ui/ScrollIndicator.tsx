"use client";

import { m, useScroll, useTransform } from "framer-motion";

export const ScrollIndicator = ({ text = "SCROLL DOWN • EXPLORE MORE • " }: { text?: string }) => {
  const { scrollY } = useScroll();
  // Rotate the text based on scroll progress
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div 
      className="relative flex items-center justify-center w-24 h-24 pointer-events-auto cursor-pointer group"
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    >
      {/* Rotating SVG Text Ring */}
      <m.div 
        style={{ rotate }}
        className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text className="text-[10px] font-heading font-semibold tracking-[0.2em] fill-white uppercase" style={{ textTransform: 'uppercase' }}>
            <textPath href="#circlePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </m.div>

      {/* Center Interactive Arrow */}
      <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 group-hover:border-accent-violet/50 transition-all duration-300">
        <m.svg
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-accent-violet transition-colors"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </m.svg>
      </div>
    </div>
  );
};
