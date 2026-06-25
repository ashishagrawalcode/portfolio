"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
});

type MouseRef = React.RefObject<{
  x: number; y: number;
  normalizedX: number; normalizedY: number;
}>;

/** Per-character stagger reveal */
function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

interface HeroProps {
  mousePointer?: MouseRef;
}

export function Hero({ mousePointer }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mountScene, setMountScene] = useState(false);

  useEffect(() => {
    // Defer heavy WebGL parsing to unblock initial paint
    const timer = setTimeout(() => setMountScene(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax fades
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sceneOpacity   = useTransform(scrollYProgress, [0, 0.8], [1, 0.05]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* ── Background: fBM Purplish Smoky WebGL ── */}
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
        {mountScene && <HeroScene pointer={mousePointer?.current ?? undefined} />}
      </motion.div>

      {/* Protective dark scrim to guarantee text contrast against bright smoke peaks */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0.55)_0%,transparent_65%)]" />

      {/* Subtle ambient core glow to anchor the text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[120px]" />

      {/* ── Main content — Centered & Majestic ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center sm:px-10"
      >
        {/* Eyebrow — Switched from purple to neutral silver/white to avoid clashing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/40" />
          <span className="font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-white/70 sm:text-[11px]">
            Design Engineer · Full-stack Dev
          </span>
          <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Hero Title — Reduced font size for elegant consistency */}
        <h1 className="mt-2 flex flex-wrap justify-center gap-x-4 px-2 select-none">
          <span
            className="font-display font-medium tracking-tight text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", lineHeight: 1 }}
          >
            <Reveal text="ASHISH" delay={0.2} />
          </span>
          <span
            className="font-display font-semibold italic tracking-tight text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", lineHeight: 1 }}
          >
            <Reveal text="AGRAWAL." delay={0.4} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-lg font-sans text-sm font-light leading-relaxed text-text-secondary sm:text-[15px]"
        >
          Building high-performance FinTech products that actually ship. 
          Bridging the gap between engineering and design.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
        >
          {/* Primary Glass Pill */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.03] px-8 py-3 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.08]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 font-heading text-[11px] font-medium tracking-[0.2em] uppercase text-text-primary">
              View Work
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>

          {/* Secondary Text Link */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-heading text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary transition-colors hover:text-text-primary"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Left Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-6 hidden sm:block md:left-10 lg:left-16"
      >
        <p className="font-heading text-[9px] tracking-[0.3em] uppercase text-text-tertiary">
          Class of 2029 <br /> BML Munjal University
        </p>
      </motion.div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}