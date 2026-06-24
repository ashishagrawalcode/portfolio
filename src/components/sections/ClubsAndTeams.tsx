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
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent-violet text-xs font-heading tracking-[0.3em] uppercase mb-4"
          >
            Beyond Code
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 80, rotateX: 20, filter: "blur(12px)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6"
          >
            Clubs & Teams
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-12 h-[1px] bg-white/20"
          />
        </div>

        <div className="flex flex-col border-t border-white/10">
          {clubs.map((club, i) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-b border-white/10 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden cursor-none"
            >
              {/* Background Highlight */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 z-0"
                style={{ backgroundColor: club.color }}
              />
              
              {/* Left Accent Line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                style={{ backgroundColor: club.color }}
              />

              <div className="relative z-10 w-full md:w-1/3 pl-0 group-hover:pl-4 transition-all duration-500">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white/80 group-hover:text-white transition-colors duration-500">
                  {club.name}
                </h3>
              </div>

              <div className="relative z-10 w-full md:w-1/4 flex flex-col gap-1">
                <span 
                  className="text-xs font-heading tracking-widest uppercase transition-colors duration-500 text-white/40 group-hover:opacity-100"
                  style={{ color: club.color }}
                >
                  {club.role}
                </span>
                <span className="text-xs font-heading text-white/30 tracking-widest">
                  {club.period}
                </span>
              </div>

              <div className="relative z-10 w-full md:w-5/12">
                <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-500">
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
