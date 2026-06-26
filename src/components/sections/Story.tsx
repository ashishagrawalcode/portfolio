"use client";

import { useState } from "react";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { ScrollIndicator } from "../ui/ScrollIndicator";

const LOG = [
  {
    index: "01",
    chapter: "Origin",
    tag: "2025 — BMU, Siliguri",
    title: "Started CS. Kept building outside class.",
    body: "First-year B.Tech, but the real learning happened outside the syllabus — design assets for a dozen university clubs, then full-stack work most first-years don't touch yet.",
    year: "2025",
  },
  {
    index: "02",
    chapter: "Clubs",
    tag: "Nexus BMU / R&D Cell",
    title: "From designing for clubs to building their tools.",
    body: "Technical roles at Nexus BMU and the R&D Cell. Refactored a club-management portal into a proper server/client-component architecture after senior review — not just shipping the first version that rendered.",
    year: "2025",
  },
  {
    index: "03",
    chapter: "ArthiX",
    tag: "FinTech Simulation",
    title: "Architecture has to outlive the first build.",
    body: "Migrating ArthiX from JS/Firebase v1 to a TypeScript Turborepo v2 meant designing a swappable pricing-model interface — the simulation engine can change its math without touching a single UI component.",
    year: "2026",
  },
  {
    index: "04",
    chapter: "Ledzer",
    tag: "Accounting SaaS",
    title: "Built for people who'll never read a changelog.",
    body: "Indian MSME owners needed double-entry accounting without the jargon. Offline-first sync queue for spotty connections. Plain-language terminology instead of 'debit/credit'. Usability is the feature.",
    year: "2026",
  },
  {
    index: "05",
    chapter: "Now",
    tag: "Ongoing",
    title: "Same loop: build, get told it's wrong, rebuild better.",
    body: "This portfolio is the same process in public — first pass too generic, second pass closer. The work that matters happens in the gap between the two versions.",
    year: "2026",
  },
];

const variants = {
  enter: {
    opacity: 0,
    x: 40,
    transform: "translateZ(0)",
  },
  center: {
    opacity: 1,
    x: 0,
    transform: "translateZ(0)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transform: "translateZ(0)",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
};

const numVariants = {
  enter: { opacity: 0, scale: 1.15 },
  center: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, scale: 0.88,
    transition: { duration: 0.35 },
  },
};

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(LOG.length - 1, Math.floor(latest * LOG.length));
    if (next !== activeIdx) setActiveIdx(next);
  });

  const entry = LOG[activeIdx];
  // Progress fraction within current entry's segment
  const progressPct = ((activeIdx + 1) / LOG.length) * 100;

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative bg-bg-primary"
      style={{ minHeight: `${LOG.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden">

        {/* Fine grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:52px_52px]" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[1px] bg-white/[0.04]">
          <m.div
            className="h-full bg-gradient-to-r from-accent-violet to-accent-blue"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Chapter nav — top-left */}
        <div className="absolute left-6 top-6 z-20 flex items-center gap-3 sm:left-10 sm:top-10">
          <span className="font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-text-tertiary">
            Journey
          </span>
          <div className="flex items-center gap-1.5">
            {LOG.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // Scroll to the corresponding position
                  if (containerRef.current) {
                    const totalH = containerRef.current.scrollHeight - window.innerHeight;
                    const target = containerRef.current.offsetTop + (i / LOG.length) * totalH;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }
                }}
                className="p-3 -m-3 transition-all duration-300"
                aria-label={`Go to chapter ${i + 1}`}
              >
                <div
                  className="h-1 rounded-full transition-all duration-400"
                  style={{
                    width: activeIdx === i ? 20 : 6,
                    backgroundColor: activeIdx === i ? "rgb(139,92,246)" : "rgba(255,255,255,0.15)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Chapter count — top-right */}
        <div className="absolute right-6 top-6 z-20 sm:right-10 sm:top-10">
          <span className="font-mono text-[11px] text-text-tertiary">
            <span className="text-text-primary">{String(activeIdx + 1).padStart(2, "0")}</span>
            {" / "}
            {String(LOG.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Editorial content ─────────────────────────────────────────── */}
        <div className="flex h-full w-full items-center justify-center px-6 sm:px-10 md:px-16">
          <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-16 lg:gap-24">

            {/* Left: decorative chapter number + chapter name */}
            <div className="hidden md:flex flex-col items-start">
              <AnimatePresence mode="wait">
                <m.div
                  key={`num-${activeIdx}`}
                  variants={numVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="select-none leading-none"
                >
                  {/* Giant faint index */}
                  <div
                    className="font-display font-semibold text-[22vw] leading-none text-white"
                    style={{ opacity: 0.04 }}
                    aria-hidden="true"
                  >
                    {entry.index}
                  </div>

                  {/* Chapter label sits over the faint number */}
                  <div className="-mt-16 pl-1">
                    <p className="font-heading text-[10px] font-medium tracking-[0.35em] uppercase text-accent-violet/70 mb-2">
                      {entry.chapter}
                    </p>
                    <p className="font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-text-tertiary">
                      {entry.tag}
                    </p>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Right: the actual content */}
            <AnimatePresence mode="wait">
              <m.div
                key={`content-${activeIdx}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col"
              >
                {/* Mobile-only: tag + index */}
                <div className="mb-4 flex items-center gap-3 md:hidden">
                  <span className="font-mono text-[10px] text-text-tertiary">
                    {entry.index}
                  </span>
                  <span className="h-px w-6 bg-accent-violet/40" />
                  <span className="font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-accent-violet/80">
                    {entry.tag}
                  </span>
                </div>

                {/* Accent top rule */}
                <div className="mb-8 h-px w-12 bg-gradient-to-r from-accent-violet to-transparent" />

                {/* Title — Cormorant Garamond, semibold, editorial size */}
                <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem]">
                  {entry.title}
                </h2>

                {/* Body */}
                <p className="mt-6 max-w-lg font-sans text-sm font-light leading-[1.85] text-text-secondary sm:text-base">
                  {entry.body}
                </p>

                {/* Year tag */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-zinc-400">
                    {entry.year}
                  </span>
                  {/* Decorative line */}
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ScrollIndicator */}
        <m.div
          animate={{ opacity: activeIdx < LOG.length - 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10"
        >
          <ScrollIndicator text="KEEP SCROLLING • " />
        </m.div>
      </div>
    </section>
  );
}