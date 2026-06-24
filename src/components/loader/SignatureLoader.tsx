"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signaturePaths, SIGNATURE_VIEWBOX } from "./signature-path";

interface SignatureLoaderProps {
  onComplete: () => void;
}

export const SignatureLoader = ({ onComplete }: SignatureLoaderProps) => {
  const [phase, setPhase] = useState<"signature" | "welcome" | "done">("signature");
  const [isMobile, setIsMobile] = useState(false);

  // Stable callback ref
  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    
    // Mobile: much shorter durations to improve FCP/LCP on slow devices
    const signatureDuration = isMobile ? 600 : 1200;
    const welcomeDuration = isMobile ? 300 : 600;

    if (phase === "signature") {
      const t = setTimeout(() => setPhase("welcome"), signatureDuration);
      return () => clearTimeout(t);
    }
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("done"), welcomeDuration);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      document.body.style.overflow = "";
      handleComplete();
    }
    
    return () => { document.body.style.overflow = ""; };
  }, [phase, handleComplete, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
    >
      {/* Static Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Ambient Pulsing Glow — desktop only, too heavy for mobile GPUs */}
      {!isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-[100%] pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
        />
      )}
      {/* Static glow for mobile */}
      {isMobile && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] rounded-[100%] pointer-events-none z-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />
      )}

      {/* Signature Draw */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-8">
        <AnimatePresence mode="wait">
          {phase === "signature" && (
            <motion.svg
              key="sig"
              viewBox={SIGNATURE_VIEWBOX}
              fill="none"
              stroke="currentColor"
              className="w-full h-auto text-white/90 stroke-[2.5] -rotate-3 scale-110"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1.15, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <style>{`
                .path-draw {
                  stroke-dasharray: 1;
                  stroke-dashoffset: 1;
                  animation: draw forwards cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes draw {
                  to { stroke-dashoffset: 0; }
                }
                .dot-draw {
                  opacity: 0;
                  transform: scale(0.5);
                  animation: popIn 0.2s forwards ease-out;
                }
                @keyframes popIn {
                  to { opacity: 1; transform: scale(1); }
                }
              `}</style>
              <g style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}>
                {/* Ashish */}
                <path
                  d={signaturePaths[0]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="path-draw"
                  style={{ animationDuration: "0.6s" }}
                />
                {/* Dot */}
                <path
                  d={signaturePaths[1]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={5}
                  className="dot-draw"
                  style={{ transformOrigin: "142px 48px", animationDelay: "0.5s" }}
                />
                {/* Agrawal */}
                <path
                  d={signaturePaths[2]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="path-draw"
                  style={{ animationDuration: "0.6s", animationDelay: "0.5s" }}
                />
                {/* Ending Line 1 */}
                <path
                  d={signaturePaths[3]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="path-draw"
                  style={{ animationDuration: "0.1s", animationDelay: "1.1s" }}
                />
                {/* Ending Line 2 */}
                <path
                  d={signaturePaths[4]}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="path-draw"
                  style={{ animationDuration: "0.1s", animationDelay: "1.1s" }}
                />
              </g>
            </motion.svg>
          )}

          {phase === "welcome" && (
            <div className="flex space-x-3 text-2xl md:text-4xl font-display italic font-light tracking-widest text-white/90 text-center">
              {"Welcome, Visitor.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
