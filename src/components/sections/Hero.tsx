"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "../canvas/HeroScene";
import { signaturePaths, SIGNATURE_VIEWBOX } from "../loader/signature-path";

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

        {/* Faint Signature Watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0"
          animate={{ scale: [0.95, 1.05] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox={SIGNATURE_VIEWBOX}
            fill="none"
            stroke="currentColor"
            className="w-[90vw] md:w-[70vw] max-w-4xl text-white"
          >
            {signaturePaths.map((path, idx) => (
              <path key={idx} d={path} strokeWidth="1" />
            ))}
          </svg>
        </motion.div>

        {/* Hero Typography */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="font-display font-black text-[15vw] md:text-[11vw] leading-[0.85] tracking-tight text-white uppercase flex flex-col items-center">
            <div className="flex overflow-hidden">
              {firstName.map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.05 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex overflow-hidden">
              {lastName.map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.25 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-6 flex flex-col md:flex-row items-center gap-2 md:gap-3 text-xs md:text-sm font-heading font-light text-text-secondary tracking-[0.2em] md:tracking-[0.25em] uppercase"
          >
            <span>Founder</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-accent-violet" />
            <span>Full Stack Developer</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-accent-blue" />
            <span>Product Designer</span>
          </motion.div>
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
