"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

const clubs = [
  {
    name: "Nexus BMU",
    role: "Technical Team Member",
    period: "2026",
    description: "Contributing to core technical developments and building solutions as part of the technical team.",
    color: "#6366F1",
  },
  {
    name: "R&D Cell",
    role: "Technical Team Member",
    period: "2026",
    description: "Exploring emerging web technologies, experimental interfaces, and core technical research.",
    color: "#10B981",
  },
  {
    name: "Student Editorial Board",
    role: "Design Team Member",
    period: "2025",
    description: "Designing interactive digital experiences, editorial graphics, and creative content.",
    color: "#8B5CF6",
  },
  {
    name: "67th Milestone X Hero's Challenge",
    role: "Design Team Member",
    period: "2026",
    description: "Crafted digital assets, branding materials, and promotional content for BMU's flagship fest.",
    color: "#F59E0B",
  },
  {
    name: "TEDxBMU",
    role: "Design Team Member",
    period: "2026",
    description: "Crafted the complete brand identity, graphics, and digital presence for TEDx events.",
    color: "#E11D48",
  },
  {
    name: "BMUMUN",
    role: "Operations & Design Member",
    period: "2025",
    description: "Handled core operational workflows and designed event materials for the Model United Nations.",
    color: "#EC4899",
  },
  {
    name: "ACM-BMU",
    role: "Design Team Member (EEC)",
    period: "2025",
    description: "Led design initiatives and created visual content for the ACM student chapter.",
    color: "#3B82F6",
  },
  {
    name: "Ranbhoomi",
    role: "Design Team Member",
    period: "2026",
    description: "Created sports graphics, match day posters, and branding for the inter-hostel sports tournament.",
    color: "#F97316",
  },
  {
    name: "Glitch 2.0",
    role: "Design Team Member",
    period: "2026",
    description: "Designed hacker guides, presentation templates, and social collateral for the hackathon.",
    color: "#14B8A6",
  },
  {
    name: "Hacked 4.0",
    role: "Design Team Member",
    period: "2026",
    description: "Handled the complete visual experience and participant branding for the hackathon event.",
    color: "#06B6D4",
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const ClubsAndTeams = () => {
  return (
    <section className="py-32 bg-bg-primary relative overflow-hidden" style={{ perspective: 1000 }}>
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-3 md:mb-16 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-accent-violet"
            >
              Beyond Code
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-display text-4xl font-semibold text-text-primary md:text-5xl lg:text-6xl"
            >
              Clubs &amp; Teams.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[200px] font-sans text-xs font-light leading-relaxed text-text-tertiary"
          >
            Roles held across university clubs and events.
          </motion.p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {clubs.map((club, i) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-b border-white/10 py-5 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden cursor-none"
            >
              {/* Background Highlight */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 z-0"
                style={{ backgroundColor: club.color }}
              />
              
              {/* Left Accent Line — shows on hover for desktop, always subtle on mobile */}
              <div 
                className="absolute bottom-0 left-0 top-0 z-10 w-[2px] opacity-30 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
                style={{ backgroundColor: club.color }}
              />

              <div className="relative z-10 min-w-0 flex-1 pl-3 transition-all duration-500 md:pl-0 md:group-hover:pl-4">
                <h3 className="font-display text-2xl font-semibold leading-tight text-text-primary/90 transition-colors duration-500 md:truncate md:text-3xl md:text-text-primary/80 md:group-hover:text-text-primary lg:text-4xl">
                  {club.name}
                </h3>
              </div>

              {/* Role and Period */}
              <div className="relative z-10 mt-1 flex w-full flex-shrink-0 flex-row items-center gap-3 pl-3 md:mt-0 md:w-1/4 md:flex-col md:items-start md:gap-1 md:pl-0">
                <span
                  className="font-heading text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 md:text-[10px] md:tracking-[0.25em]"
                  style={{ color: club.color }}
                >
                  {club.role}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 md:hidden" />
                <span className="font-mono text-xs text-text-tertiary">
                  {club.period}
                </span>
              </div>

              {/* Description */}
              <div className="relative z-10 w-full pl-3 pt-1 md:w-5/12 md:pl-0 md:pt-0">
                <p className="font-sans text-[13px] font-light leading-relaxed text-text-secondary transition-colors duration-500 md:text-sm md:group-hover:text-text-primary/80">
                  {club.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
