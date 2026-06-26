"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Design pieces data ─────────────────────────────────────────────────────────
const PIECES = [
  {
    id: 1,
    label: "Brand Identity",
    category: "Branding",
    year: "2025",
    tags: ["Logo", "Visual System"],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    size: "large",
  },
  {
    id: 2,
    label: "UI Dashboard",
    category: "Product",
    year: "2026",
    tags: ["UI Design", "Dashboard"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
  },
  {
    id: 3,
    label: "Mobile App",
    category: "Product",
    year: "2025",
    tags: ["Mobile", "UX"],
    img: "https://images.unsplash.com/photo-1607252656733-fd7458eb0b45?q=80&w=800&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: 4,
    label: "Hackathon Poster",
    category: "Print",
    year: "2025",
    tags: ["Poster", "Event"],
    img: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=800&auto=format&fit=crop",
    size: "small",
  },
  {
    id: 5,
    label: "Club Branding",
    category: "Branding",
    year: "2026",
    tags: ["Identity", "Club"],
    img: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=1000&auto=format&fit=crop",
    size: "medium",
  },
  {
    id: 6,
    label: "Social Media Kit",
    category: "Social",
    year: "2026",
    tags: ["Instagram", "Templates"],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    size: "small",
  },
  {
    id: 7,
    label: "Web Landing",
    category: "Product",
    year: "2026",
    tags: ["Web Design", "Hero"],
    img: "https://images.unsplash.com/photo-1507238692062-5a04ce4bfde6?q=80&w=1200&auto=format&fit=crop",
    size: "large",
  },
  {
    id: 8,
    label: "Typography Study",
    category: "Print",
    year: "2025",
    tags: ["Type", "Editorial"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: 9,
    label: "Fest Identity",
    category: "Branding",
    year: "2025",
    tags: ["Event", "Identity"],
    img: "https://images.unsplash.com/photo-1569451358682-e2d32f5a1be9?q=80&w=1000&auto=format&fit=crop",
    size: "medium",
  },
];

const CATEGORIES = ["All", "Branding", "Product", "Print", "Social"];

type Piece = (typeof PIECES)[number];

// ── Single gallery item ─────────────────────────────────────────────────────────
function GalleryItem({
  item,
  index,
}: {
  item: Piece;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full overflow-hidden rounded-xl cursor-none"
      style={{
        aspectRatio:
          item.size === "tall"
            ? "3/4"
            : item.size === "large"
            ? "16/10"
            : item.size === "small"
            ? "4/3"
            : "4/3",
      }}
    >
      {/* Image */}
      <Image
        src={item.img}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06] will-change-transform"
        loading="lazy"
        decoding="async"
        quality={75}
      />

      {/* Base vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />

      {/* Top meta — always visible */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 font-heading text-[9px] font-medium tracking-[0.2em] uppercase text-white/80 backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      {/* Year — top right */}
      <span className="absolute right-4 top-4 font-mono text-[9px] text-white/40">
        {item.year}
      </span>

      {/* Bottom content — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        {/* Tags — revealed on hover */}
        <m.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-3 flex flex-wrap gap-1.5"
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-heading text-[9px] tracking-widest uppercase text-white/70 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </m.div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
          {item.label}
        </h3>

        {/* View arrow */}
        <m.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="h-px w-8 bg-white/60" />
          <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-white/80">
            View
          </span>
        </m.div>
      </div>

      {/* Full overlay gradient on hover for depth */}
      <m.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />
    </m.div>
  );
}

// ── Fullscreen modal preview ─────────────────────────────────────────────────
function Modal({ item, onClose }: { item: Piece; onClose: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
    >
      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={item.img}
            alt={item.label}
            fill
            sizes="90vw"
            className="object-cover"
          />
        </div>
        <div className="border-t border-white/10 bg-bg-secondary/95 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 font-heading text-[10px] tracking-[0.3em] uppercase text-accent-violet">
                {item.category} · {item.year}
              </p>
              <h3 className="font-display text-2xl font-semibold text-text-primary">
                {item.label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-heading text-[10px] tracking-wider uppercase text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-md transition-colors hover:bg-black/70"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </m.div>
    </m.div>
  );
}

// ── Clickable item wrapper ──────────────────────────────────────────────────────
function ClickableGalleryItem({
  item,
  index,
  onSelect,
}: {
  item: Piece;
  index: number;
  onSelect: (item: Piece) => void;
}) {
  return (
    <div onClick={() => onSelect(item)} className="cursor-none">
      <GalleryItem item={item} index={index} />
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export const DesignGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<Piece | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const filtered =
    activeCategory === "All"
      ? PIECES
      : PIECES.filter((p) => p.category === activeCategory);

  // Distribute across 3 columns
  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="design"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bg-primary px-5 pb-32 pt-24 md:px-12 md:pt-36 lg:px-24"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[30%] top-0 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full bg-accent-violet/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[20%] h-[40vh] w-[40vh] translate-y-1/4 rounded-full bg-accent-blue/[0.05] blur-[100px]" />

      {/* ── Section header ────────────────────────────────────────────── */}
      <m.header
        style={{ y: titleY }}
        className="relative z-10 mb-16 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="mb-3 font-heading text-[10px] font-medium tracking-[0.35em] uppercase text-accent-violet">
            Creative Work · {PIECES.length} Pieces
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-text-primary md:text-6xl lg:text-7xl">
            Design<br />
            <span className="italic text-text-secondary">Gallery.</span>
          </h1>
          <p className="mt-5 max-w-sm font-sans text-sm font-light leading-relaxed text-text-secondary/80">
            Branding, interfaces, and visual systems crafted for university
            organizations, hackathons, and personal projects.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-10 lg:flex-col lg:items-end lg:gap-3 lg:text-right">
          {[
            { n: "10+", l: "Teams Designed For" },
            { n: "1+", l: "Years of Design" },
          ].map(({ n, l }) => (
            <div key={l} className="flex flex-col gap-0.5">
              <span className="font-display text-3xl font-semibold text-text-primary">
                {n}
              </span>
              <span className="font-heading text-[9px] tracking-[0.2em] uppercase text-text-secondary/60">
                {l}
              </span>
            </div>
          ))}
        </div>
      </m.header>

      {/* ── Category filter ──────────────────────────────────────────── */}
      <div className="relative z-10 mb-12 flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative overflow-hidden rounded-full border px-4 py-1.5 font-heading text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              borderColor:
                activeCategory === cat ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)",
              color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.45)",
              background:
                activeCategory === cat ? "rgba(139,92,246,0.15)" : "transparent",
            }}
          >
            {cat}
            {activeCategory === cat && (
              <m.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(139,92,246,0.12)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}

        <span className="ml-auto font-mono text-[10px] text-text-secondary/40">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* ── Masonry grid — 3 columns desktop, 2 tablet, 1 mobile ─────── */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-5 md:gap-6">
            {col1.map((item, i) => (
              <ClickableGalleryItem
                key={item.id}
                item={item}
                index={i * 3}
                onSelect={setSelectedItem}
              />
            ))}
          </div>

          {/* Column 2 — offset downward for asymmetry */}
          <div className="flex flex-col gap-5 md:mt-14 md:gap-6">
            {col2.map((item, i) => (
              <ClickableGalleryItem
                key={item.id}
                item={item}
                index={i * 3 + 1}
                onSelect={setSelectedItem}
              />
            ))}
          </div>

          {/* Column 3 — offset upward for depth */}
          <div className="flex flex-col gap-5 md:-mt-8 md:gap-6">
            {col3.map((item, i) => (
              <ClickableGalleryItem
                key={item.id}
                item={item}
                index={i * 3 + 2}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </m.div>
      </AnimatePresence>

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
