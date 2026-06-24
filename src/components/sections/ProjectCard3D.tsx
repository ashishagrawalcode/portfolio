"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCard3DProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    color: string;
    year: string;
  };
  index: number;
  total: number;
}

export const ProjectCard3D = ({ project, index, total }: ProjectCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    setSpotlight({ x: mouseX, y: mouseY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-[82vw] md:w-[380px] flex-shrink-0 cursor-none group"
    >
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 rounded-2xl"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${project.color}18, transparent 50%)`,
          }}
        />

        {/* Hero visual area */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {/* Colored ambient background */}
          <div
            className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${project.color}40, transparent 60%), radial-gradient(circle at 70% 80%, ${project.color}20, transparent 50%)`,
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Centered icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                boxShadow: `0 0 60px ${project.color}10`,
              }}
            >
              <span className="font-display text-3xl md:text-4xl font-bold text-white/30 group-hover:text-white/60 transition-colors">
                {project.title.charAt(0)}
              </span>
            </motion.div>
          </div>
          {/* Year */}
          <div className="absolute top-4 right-5 text-[10px] font-heading text-white/20 tracking-widest">
            {project.year}
          </div>
          {/* Index */}
          <div className="absolute bottom-4 left-5 text-[10px] font-heading text-white/15 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <p
            className="text-[9px] font-heading tracking-[0.25em] uppercase mb-1 opacity-70"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>
          <h3 className="text-lg md:text-xl font-display font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-white/35 text-xs leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tech + CTA row */}
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[9px] text-white/30 font-heading tracking-wider"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 text-[9px] text-white/20 font-heading">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
            <span className="text-[9px] font-heading tracking-wider text-white/15 group-hover:text-accent-violet/60 transition-colors flex items-center gap-1 whitespace-nowrap">
              View
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
