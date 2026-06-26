"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { projects } from "@/constants/projects";

// ─── Schematic placeholder ──────────────────────────────────────────────────
function SchemaBg({ color, title }: { color: string; title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${color}0a` }}>
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `linear-gradient(${color}60 1px, transparent 1px), linear-gradient(90deg, ${color}60 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />
      {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos) => (
        <span
          key={pos}
          className={`absolute h-4 w-4 border-current ${pos} ${pos.includes("top") ? "border-t-2" : "border-b-2"} ${pos.includes("left") ? "border-l-2" : "border-r-2"}`}
          style={{ color: `${color}70` }}
        />
      ))}
      <span className="select-none font-display text-[5.5rem] font-semibold leading-none" style={{ color, opacity: 0.13 }} aria-hidden="true">
        {title.charAt(0)}
      </span>
    </div>
  );
}

// ─── Sticky Deck Card ───────────────────────────────────────────────────────
const ProjectCard = ({
  i,
  project,
  progress,
  range,
  targetScale,
}: {
  i: number;
  project: typeof projects[number];
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Card scales down as subsequent cards scroll over it
  const scale = useTransform(progress, range, [1, targetScale]);
  // Card darkens slightly as it gets pushed to the back
  const brightness = useTransform(progress, range, [1, 0.35]);

  // Image internal parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);

  return (
    <div ref={cardRef} className="sticky top-0 flex h-screen w-full items-start justify-center">
      <motion.div
        style={{
          scale,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
          // Each card drops slightly lower than the previous one to create a visible deck "stair-step"
          top: `calc(12vh + ${i * 28}px)`,
        }}
        className="relative flex h-[78vh] w-[92vw] max-w-7xl origin-top flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-bg-secondary/95 shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-3xl lg:h-[75vh] lg:flex-row lg:rounded-[3rem]"
      >
        {/* Left Info Panel */}
        <div className="relative z-10 flex h-[55%] w-full flex-col justify-between p-6 lg:h-full lg:w-[45%] lg:p-14">
          {/* Decorative ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 0% 0%, ${project.color}40, transparent 65%)`,
            }}
          />

          <div className="relative z-10">
            {/* Meta header */}
            <div className="mb-6 flex items-center gap-4 lg:mb-10">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] font-medium text-text-tertiary backdrop-blur-md lg:text-xs">
                {project.year}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-text-secondary lg:text-xs">
                  {project.subtitle}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-4 font-display text-4xl font-semibold leading-[1.05] text-text-primary md:text-5xl lg:mb-8 lg:text-7xl">
              {project.title}
            </h3>

            {/* Description */}
            <p className="max-w-md font-sans text-[13px] font-light leading-relaxed text-text-secondary/80 md:text-sm lg:text-base">
              {project.description}
            </p>
          </div>

          {/* Tech tags & CTA */}
          <div className="relative z-10 mt-6 flex flex-col gap-6 lg:mt-0 lg:gap-10">
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-heading text-[9px] tracking-widest uppercase text-text-secondary lg:text-[10px]"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit cursor-none items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:bg-white group-hover:text-bg-primary lg:h-14 lg:w-14">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-500 group-hover:rotate-45"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/80 transition-colors duration-500 group-hover:text-white lg:text-xs">
                  View Live Project
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Right Image Panel */}
        <div className="relative h-[45%] w-full overflow-hidden border-t border-white/[0.05] bg-bg-primary lg:h-full lg:w-[55%] lg:border-l lg:border-t-0">
          {project.imageUrl ? (
            <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-l from-transparent via-transparent to-bg-secondary/70 lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 via-transparent to-transparent lg:hidden" />
            </motion.div>
          ) : (
            <SchemaBg color={project.color} title={project.title} />
          )}

          {/* Live Indicator */}
          {project.liveUrl && (
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md lg:right-6 lg:top-6">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/70">
                Live
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Section ────────────────────────────────────────────────────────────
export function ProjectUniverse() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="relative bg-bg-primary">
      {/* Intro Header — Absolute so it floats above the scrolling deck */}
      <div className="absolute left-0 top-0 z-10 w-full px-6 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-accent-violet">
              Selected Work
            </p>
            <h2 className="font-display text-5xl font-semibold leading-[1.05] text-text-primary md:text-6xl lg:text-7xl">
              Things I&apos;ve<br className="hidden md:block" /> Shipped.
            </h2>
          </div>
          <p className="max-w-xs font-sans text-sm font-light leading-relaxed text-text-tertiary">
            A curated selection of massive, production-ready builds. Keep scrolling to explore the stack.
          </p>
        </div>
      </div>

      {/* The scrolling container — tall enough to fit all stacked sections */}
      <div ref={container} className="relative w-full pt-[35vh]">
        {projects.map((project, i) => {
          // The exact formula for stacking scaling:
          // The last card shrinks the least (targetScale = 1), the first card shrinks the most.
          const targetScale = 1 - (projects.length - 1 - i) * 0.05;
          // The card starts scaling down only after it has reached the top and locked in place.
          const range = [i / Math.max(projects.length, 1), 1];

          return (
            <ProjectCard
              key={project.id}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
        {/* Extra padding at the bottom so the last card has room to stick before the section ends */}
        <div className="h-[20vh] w-full" />
      </div>
    </section>
  );
}