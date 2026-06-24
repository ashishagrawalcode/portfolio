"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { signaturePaths } from "../loader/signature-path";

const timelineData = [
  {
    year: "2023 — Present",
    title: "Founder & Full Stack",
    org: "Independent",
    description: "Building scalable platforms like Arthix and Ledzer. Managing full product lifecycles.",
  },
  {
    year: "2022 — 2023",
    title: "Core Team Member",
    org: "Student Editorial Board",
    description: "Led technical initiatives and designed interactive digital experiences.",
  },
  {
    year: "2021 — 2022",
    title: "Web Developer",
    org: "ACM BMU",
    description: "Contributed to open-source projects and built tech solutions.",
  },
  {
    year: "2021",
    title: "Design Lead",
    org: "TEDx BMU",
    description: "Crafted the complete brand identity and digital presence.",
  },
  {
    year: "2020 — 2021",
    title: "Research Contributor",
    org: "R&D Cell",
    description: "Explored emerging web technologies and experimental interfaces.",
  },
];

const TimelineCardPinned = ({ item, index, scrollYProgress }: any) => {
  // We have 5 items over [0, 1] scroll space.
  // We want them to appear right as the pen reaches roughly their equivalent percentage.
  // 0 -> 0.1, 1 -> 0.3, 2 -> 0.5, 3 -> 0.7, 4 -> 0.9
  const triggerPoint = 0.1 + index * 0.18;
  const hidePoint = index === 4 ? 1 : triggerPoint + 0.16;
  // Last item stays until the absolute end.

  const startFadeIn = Math.max(0, triggerPoint - 0.05);
  const endFadeIn = Math.max(startFadeIn + 0.01, triggerPoint);

  // Last item doesn't fade out until 0.99
  const startFadeOut = index === 4 ? 0.98 : Math.max(endFadeIn + 0.01, hidePoint - 0.05);
  const endFadeOut = Math.max(startFadeOut + 0.01, Math.min(hidePoint, 1));

  const opacity = useTransform(
    scrollYProgress,
    [startFadeIn, endFadeIn, startFadeOut, endFadeOut],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [startFadeIn, endFadeIn, startFadeOut, endFadeOut],
    [40, 0, 0, -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [startFadeIn, endFadeIn, startFadeOut, endFadeOut],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute top-[45%] md:top-[45%] left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[50vh] overflow-y-auto p-6 md:p-8 glass-card rounded-3xl flex flex-col z-20 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-bg-secondary/90 backdrop-blur-2xl"
    >
      <span className="text-accent-violet text-xs md:text-sm font-heading tracking-widest mb-1 md:mb-2 block">
        {item.year}
      </span>
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-1">
        {item.title}
      </h3>
      <h4 className="text-xs md:text-sm text-white/50 font-heading mb-3 block">
        {item.org}
      </h4>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
};

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // SEQUENCED DRAWING TIMING mapped strictly to 0 -> 1 of the 400vh container
  const path0 = useTransform(scrollYProgress, [0, 0.4], [0, 1], { clamp: true });
  const path1 = useTransform(scrollYProgress, [0.4, 0.45], [0, 1], { clamp: true });
  const path2 = useTransform(scrollYProgress, [0.45, 0.9], [0, 1], { clamp: true });
  const path3 = useTransform(scrollYProgress, [0.9, 0.95], [0, 1], { clamp: true });
  const path4 = useTransform(scrollYProgress, [0.95, 1], [0, 1], { clamp: true });

  const pathLengths = [path0, path1, path2, path3, path4];

  return (
    <section id="experience" ref={containerRef} className="relative h-[400vh] bg-bg-primary">

      {/* Pinned Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* Parallax Orbs behind everything */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -200]) }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-accent-violet/10 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 300]) }}
          className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none z-0"
        />

        {/* Header */}
        <div className="w-full text-center z-30 pointer-events-none mt-8 mb-4 flex-shrink-0">
          <p className="text-accent-violet text-[10px] md:text-xs font-heading tracking-[0.3em] uppercase mb-2">
            Journey So Far
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
            Chronicles
          </h2>
        </div>

        {/* Center Canvas for Signature */}
        <div className="relative w-full max-w-[1200px] h-[20vh] md:h-[25vh] flex items-center justify-center px-4 flex-shrink-0 mt-8 md:mt-8">
          {/* Faint Outline */}
          <svg
            className="absolute w-full h-auto opacity-[0.03] pointer-events-none"
            viewBox="0 0 480 130"
          >
            {signaturePaths.map((path, idx) => (
              <path key={`bg-${idx}`} d={path} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            ))}
          </svg>

          {/* Animated Scrubbing Signature */}
          <svg
            className="absolute w-full h-auto pointer-events-none drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] z-10"
            viewBox="0 0 480 130"
          >
            {signaturePaths.map((path, idx) => (
              <motion.path
                key={`fg-${idx}`}
                d={path}
                stroke="#8B5CF6"
                strokeWidth={idx === 1 ? "6" : "3"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{ pathLength: pathLengths[idx] }}
              />
            ))}
          </svg>
        </div>

        {/* Central Crossfading Timeline Content */}
        <div className="relative w-full h-full pointer-events-none">
          {timelineData.map((item, index) => (
            <TimelineCardPinned key={index} item={item} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 font-heading text-xs tracking-widest uppercase"
        >
          <span>Scroll Timeline</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
};
