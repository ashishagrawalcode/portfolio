"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { signaturePaths } from "../loader/signature-path";
import { ScrollIndicator } from "../ui/ScrollIndicator";

const timelineData = [
  {
    year: "2026",
    title: "Scaling New Heights",
    org: "Full Stack Innovation",
    description: "Expanded horizons by building multiple production-ready platforms including Ledzer, ArthiX, and VoughtMart, actively focusing on performance and scalability.",
  },
  {
    year: "2025 — 2026",
    title: "Leadership & Collaboration",
    org: "University Clubs & Teams",
    description: "Actively shaped the technical and creative direction of numerous university organizations, from leading technical research to crafting brand identities for major hackathons and fests.",
  },
  {
    year: "2025",
    title: "Hackathons & Recognition",
    org: "Competitive Environment",
    description: "Gained recognition in competitive events like MUJMUN and Build Your Nation, while simultaneously shifting from AI-assisted builds to comprehensive hands-on coding.",
  },
  {
    year: "2025",
    title: "Foundation Building",
    org: "Early Development",
    description: "Mastered core web technologies (HTML, CSS, JavaScript) and started venturing into modern frameworks, resulting in early projects like SwasthSathi and Bloom.",
  },
  {
    year: "August 2025",
    title: "The Campus Life",
    org: "BML Munjal University",
    description: "Immersed in the vibrant campus culture, joining various technical and cultural clubs, and participating in the first wave of hackathons and events.",
  },
  {
    year: "11th August 2025",
    title: "The Beginning",
    org: "BML Munjal University",
    description: "Joined BML Munjal University as a B.Tech CSE student. This marked the official start of a formal computer science journey, setting the foundation for algorithmic thinking and core engineering.",
  },
];

const TimelineCardPinned = ({ item, index, scrollYProgress }: any) => {
  const total = timelineData.length;
  // Dynamic spread: Items appear sequentially over the scroll progress
  const triggerPoint = 0.1 + index * (0.8 / total);
  const hidePoint = index === total - 1 ? 1 : triggerPoint + (0.8 / total) - 0.02;

  const startFadeIn = Math.max(0, triggerPoint - 0.05);
  const endFadeIn = Math.max(startFadeIn + 0.01, triggerPoint);

  const startFadeOut = index === total - 1 ? 0.98 : Math.max(endFadeIn + 0.01, hidePoint - 0.05);
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
    [0.85, 1, 1, 1.15]
  );

  const blur = useTransform(
    scrollYProgress,
    [startFadeIn, endFadeIn, startFadeOut, endFadeOut],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  // Rotate slightly for a 3D float effect as they enter/leave
  const rotateX = useTransform(
    scrollYProgress,
    [startFadeIn, endFadeIn, startFadeOut, endFadeOut],
    [15, 0, 0, -15]
  );

  return (
    <motion.div
      style={{ opacity, y, scale, filter: blur, rotateX, transformPerspective: 1000 }}
      className="absolute top-[28%] md:top-[32%] left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[55vh] overflow-y-auto p-6 md:p-8 rounded-3xl flex flex-col z-20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-bg-secondary/60 backdrop-blur-3xl border border-white/10 group"
    >
      {/* Animated Glowing Border on Active */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(139,92,246,0.8)_360deg)] animate-[spin_3s_linear_infinite]" />
      </div>
      {/* Inner glass layer to mask the glowing border underneath the content */}
      <div className="absolute inset-[1px] bg-bg-secondary/90 rounded-[23px] pointer-events-none z-[-1]" />
      
      <div className="relative z-10">
        <span className="text-accent-violet text-xs md:text-sm font-heading tracking-widest mb-1 md:mb-2 block">
          {item.year}
        </span>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-1">
          {item.title}
        </h3>
        <h4 className="text-xs md:text-sm text-white/50 font-heading mb-3 block">
          {item.org}
        </h4>
        <p className="font-sans font-light text-text-secondary text-base md:text-lg leading-relaxed">
          {item.description}
        </p>
      </div>
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator text="Scroll Timeline" />
        </motion.div>

      </div>
    </section>
  );
};
