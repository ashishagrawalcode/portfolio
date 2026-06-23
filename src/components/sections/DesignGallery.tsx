"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

const designs = [
  { id: 1, label: "BRAND_IDENTITY", height: "h-[300px]", color: "bg-blue-500/20" },
  { id: 2, label: "UI_DASHBOARD", height: "h-[400px]", color: "bg-purple-500/20" },
  { id: 3, label: "MOBILE_APP", height: "h-[250px]", color: "bg-emerald-500/20" },
  { id: 4, label: "WEBSITE_REDESIGN", height: "h-[350px]", color: "bg-amber-500/20" },
  { id: 5, label: "POSTER_SERIES", height: "h-[450px]", color: "bg-pink-500/20" },
  { id: 6, label: "SOCIAL_CAMPAIGN", height: "h-[300px]", color: "bg-indigo-500/20" },
];

export const DesignGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={containerRef} className="py-32 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase">Design Gallery</h2>
            <p className="text-text-secondary mt-4 max-w-md">A collection of user interfaces, brand identities, and visual explorations.</p>
          </div>
          <div className="text-right mt-8 md:mt-0 font-mono text-sm text-text-secondary">
            <p>30+ Designs</p>
            <p>7+ Organizations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6">
            {designs.slice(0, 2).map((d) => (
              <GalleryItem key={d.id} label={d.label} height={d.height} color={d.color} />
            ))}
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:mt-24">
            {designs.slice(2, 4).map((d) => (
              <GalleryItem key={d.id} label={d.label} height={d.height} color={d.color} />
            ))}
          </motion.div>
          
          <motion.div style={{ y: y3 }} className="flex flex-col gap-6">
            {designs.slice(4, 6).map((d) => (
              <GalleryItem key={d.id} label={d.label} height={d.height} color={d.color} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ label, height, color }: { label: string; height: string; color: string }) => {
  return (
    <GlassCard className={`w-full ${height} group cursor-pointer overflow-hidden p-0 border-white/5 hover:border-white/20 transition-colors`}>
      <div className={`absolute inset-0 ${color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="w-full h-full bg-bg-primary/50 flex items-center justify-center relative overflow-hidden">
        <div className="text-white/20 font-mono text-xs">{label}</div>
        
        {/* Hover zoom effect container */}
        <div 
          className="absolute inset-0 border border-white/10 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"
        />
      </div>
    </GlassCard>
  );
};
