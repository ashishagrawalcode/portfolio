"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Design pieces data ─────────────────────────────────────────────────────────
const PIECES = [
  {
    id: 1, label: "Brand Identity",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    aspect: "portrait",
  },
  {
    id: 2, label: "UI Dashboard",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    aspect: "landscape",
  },
  {
    id: 3, label: "Mobile App",
    img: "https://images.unsplash.com/photo-1607252656733-fd7458eb0b45?q=80&w=600&auto=format&fit=crop",
    aspect: "portrait",
  },
  {
    id: 4, label: "Web Design",
    img: "https://images.unsplash.com/photo-1507238692062-5a04ce4bfde6?q=80&w=800&auto=format&fit=crop",
    aspect: "landscape",
  },
  {
    id: 5, label: "Poster Series",
    img: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&auto=format&fit=crop",
    aspect: "portrait",
  },
  {
    id: 6, label: "Social Media",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    aspect: "landscape",
  },
  {
    id: 7, label: "Event Branding",
    img: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=600&auto=format&fit=crop",
    aspect: "portrait",
  },
  {
    id: 8, label: "Typography",
    img: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?q=80&w=800&auto=format&fit=crop",
    aspect: "landscape",
  },
];

// Duplicate for seamless loop
const ROW_1 = [...PIECES, ...PIECES];
const ROW_2 = [...[...PIECES].reverse(), ...[...PIECES].reverse()];

// ── Single marquee card ────────────────────────────────────────────────────────
function GalleryCard({ item }: { item: (typeof PIECES)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative mx-2 flex-shrink-0 cursor-none overflow-hidden rounded-xl"
      style={{
        width: item.aspect === "portrait" ? "200px" : "300px",
        height: "240px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={item.img}
        alt={item.label}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1.0)" }}
      />

      {/* Overlay — always present, darkens more on hover */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        }}
      />

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 transition-all duration-500"
        style={{ transform: hovered ? "translateY(0)" : "translateY(4px)", opacity: hovered ? 1 : 0.7 }}
      >
        <span className="font-heading text-[10px] font-medium tracking-[0.25em] uppercase text-white/90">
          {item.label}
        </span>
      </div>

      {/* Top-right arrow — appears on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md"
      >
        <span className="text-xs text-white">↗</span>
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export const DesignGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const row1Speed = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const row2Speed = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  return (
    <section
      id="design"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-secondary py-24 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/[0.06] blur-[120px]" />

      {/* ── Section header ─────────────────────────────────────────── */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mb-14 flex flex-col justify-between gap-3 px-6 md:mb-20 md:flex-row md:items-end md:px-12"
      >
        <div>
          <p className="mb-2 font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-accent-violet">
            Creative Work
          </p>
          <h2 className="font-display text-4xl font-semibold text-text-primary md:text-5xl lg:text-6xl">
            Design Gallery.
          </h2>
        </div>
        <p className="max-w-[200px] font-sans text-xs font-light leading-relaxed text-text-tertiary">
          Branding, interfaces, and visual systems built across clubs and events.
        </p>
      </motion.div>

      {/* Marquee rows — rows nudge in opposite Y directions on scroll for parallax depth */}
      <div className="relative z-10 flex flex-col gap-4 overflow-hidden">

        {/* Row 1 — left to right, nudges up on scroll */}
        <motion.div
          style={{ x: row1Speed, y: useTransform(scrollYProgress, [0, 1], ["20px", "-30px"]) }}
          className="marquee-track"
        >
          <div className="marquee-ltr flex items-center">
            {ROW_1.map((item, i) => (
              <GalleryCard key={`r1-${i}`} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Row 2 — right to left, nudges down on scroll */}
        <motion.div
          style={{ x: row2Speed, y: useTransform(scrollYProgress, [0, 1], ["-20px", "30px"]) }}
          className="marquee-track"
        >
          <div className="marquee-rtl flex items-center">
            {ROW_2.map((item, i) => (
              <GalleryCard key={`r2-${i}`} item={item} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom stat strip ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mt-14 flex items-center justify-center gap-8 px-6 md:mt-20 md:gap-16"
      >
      {["1+", "10+", "2026"].map((stat, i) => {
        const labels = ["Years of Design Experience", "Teams Designed For", "Current Year"];
        return (
          <div key={stat} className="flex flex-col items-center gap-1">
            <span className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
              {stat}
            </span>
            <span className="font-heading text-[10px] font-medium tracking-[0.2em] uppercase text-text-tertiary">
              {labels[i]}
            </span>
          </div>
        );
      })}
      </motion.div>
    </section>
  );
};
