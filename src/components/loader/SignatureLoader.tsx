"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signaturePaths, SIGNATURE_VIEWBOX } from "./signature-path";

interface SignatureLoaderProps {
  onComplete: () => void;
}

export const SignatureLoader = ({ onComplete }: SignatureLoaderProps) => {
  const [phase, setPhase] = useState<"signature" | "welcome" | "done">("signature");

  // Stable callback ref
  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (phase === "signature") {
      // Signature takes about 3.3 seconds to finish drawing (19 paths * 0.15s delay + 0.4s duration)
      const t = setTimeout(() => setPhase("welcome"), 3800);
      return () => clearTimeout(t);
    }
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("done"), 1400);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      handleComplete();
    }
  }, [phase, handleComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary"
    >

      {/* Signature Draw */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-8">
        <AnimatePresence mode="wait">
          {phase === "signature" && (
            <motion.svg
              key="sig"
              viewBox={SIGNATURE_VIEWBOX}
              fill="none"
              stroke="currentColor"
              className="w-full h-auto text-white/90 stroke-[2.5]"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {signaturePaths.map((path, idx) => (
                <motion.path
                  key={idx}
                  d={path}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    delay: idx * 0.15 
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
                  }}
                />
              ))}
            </motion.svg>
          )}

          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl font-display italic font-light tracking-widest text-white/80 text-center"
            >
              Welcome, Visitor.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
