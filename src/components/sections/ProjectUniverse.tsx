"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/constants/projects";

// ─── Schematic placeholder — intentional, not broken ──────────────────────────
function SchemaBg({ color, title }: { color: string; title: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: `${color}08` }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(${color}60 1px, transparent 1px), linear-gradient(90deg, ${color}60 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Corner brackets */}
      {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos) => (
        <span
          key={pos}
          className={`absolute h-4 w-4 border-current ${pos}
            ${pos.includes("top") ? "border-t-2" : "border-b-2"}
            ${pos.includes("left") ? "border-l-2" : "border-r-2"}`}
          style={{ color: `${color}70` }}
        />
      ))}
      {/* Initial watermark */}
      <span
        className="select-none font-display text-[6rem] font-semibold leading-none"
        style={{ color, opacity: 0.12 }}
        aria-hidden="true"
      >
        {title.charAt(0)}
      </span>
    </div>
  );
}

// ─── Preview pane — right side on desktop ──────────────────────────────────────
function ProjectPreview({ project }: { project: typeof projects[number] }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06]"
    >
      {/* Image or schema */}
      <div className="relative h-[52%] w-full overflow-hidden border-b border-white/[0.05]">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <SchemaBg color={project.color} title={project.title} />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 via-transparent to-transparent" />
      </div>

      {/* Info panel */}
      <div className="flex h-[48%] flex-col justify-between bg-bg-secondary/60 p-5 backdrop-blur-sm">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-text-tertiary">
              {project.subtitle} · {project.year}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[10px] font-medium tracking-widest uppercase transition-colors hover:text-accent-violet"
                style={{ color: project.color }}
              >
                Live ↗
              </a>
            )}
          </div>
          <h3 className="font-display text-2xl font-semibold text-text-primary">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 font-sans text-sm font-light leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-0.5 font-heading text-[10px] font-medium tracking-wider text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Single project row ────────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: typeof projects[number];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <a
      href={project.liveUrl ?? "#"}
      target={project.liveUrl ? "_blank" : undefined}
      rel={project.liveUrl ? "noopener noreferrer" : undefined}
      className="group relative flex items-center justify-between gap-4 border-b border-white/[0.06] py-6 transition-all duration-300 md:py-7"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={`${project.title} — ${project.subtitle}`}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, scaleY: isHovered ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 rounded-full origin-center"
        style={{ backgroundColor: project.color }}
      />

      {/* Index */}
      <span className="w-8 flex-shrink-0 pl-4 font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <div className="min-w-0 flex-1">
        <h3
          className="truncate font-display text-2xl font-semibold leading-tight transition-colors duration-300 md:text-3xl lg:text-4xl"
          style={{ color: isHovered ? project.color : "rgba(244,244,245,0.82)" }}
        >
          {project.title}
        </h3>
        <p className="mt-0.5 font-heading text-[11px] font-medium tracking-[0.2em] uppercase text-text-tertiary">
          {project.subtitle}
        </p>
      </div>

      {/* Year + arrow */}
      <div className="hidden flex-shrink-0 items-center gap-4 sm:flex">
        <span className="font-mono text-xs text-text-tertiary">{project.year}</span>
        <motion.span
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.25 }}
          className="text-base text-text-secondary"
        >
          ↗
        </motion.span>
      </div>
    </a>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function ProjectUniverse() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-bg-primary py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-6 md:px-12">

        {/* Section header */}
        <motion.div
          style={{ y: titleY }}
          className="mb-12 flex flex-col justify-between gap-3 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-2 font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-accent-violet">
              Selected Work
            </p>
            <h2 className="font-display text-4xl font-semibold text-text-primary md:text-5xl lg:text-6xl">
              Things I&rsquo;ve shipped.
            </h2>
          </div>
          <p className="max-w-[200px] font-sans text-xs font-light leading-relaxed text-text-tertiary">
            Hover a project to preview. Click to visit the live build.
          </p>
        </motion.div>

        {/* Desktop: 55/45 split; Mobile: full list */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">

          {/* Left: project list */}
          <div className="flex-1 border-t border-white/[0.06]">
            {projects.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                isHovered={hoveredIdx === i}
                onHover={() => setHoveredIdx(i)}
                onLeave={() => {}}   // keep last hovered — preview stays visible
              />
            ))}
          </div>

          {/* Right: sticky preview pane — desktop only */}
          <div className="hidden lg:block lg:w-[42%] xl:w-[40%]">
            <div className="sticky top-24 h-[460px]">
              <AnimatePresence mode="wait">
                <ProjectPreview key={hoveredIdx} project={projects[hoveredIdx]} />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: simple expand accordion below the list */}
        <div className="mt-8 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-white/[0.06]"
            >
              <div className="relative h-48 w-full">
                {projects[hoveredIdx].imageUrl ? (
                  <Image
                    src={projects[hoveredIdx].imageUrl}
                    alt={`${projects[hoveredIdx].title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <SchemaBg color={projects[hoveredIdx].color} title={projects[hoveredIdx].title} />
                )}
              </div>
              <div className="bg-bg-secondary/40 p-5 backdrop-blur-sm">
                <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                  {projects[hoveredIdx].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}