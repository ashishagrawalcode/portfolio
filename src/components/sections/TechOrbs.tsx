"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Next.js", color: "border-white/20", bg: "bg-white/5", size: "w-28 h-28 md:w-40 md:h-40", yOffset: 0, delay: 0, exp: "3+ yrs" },
  { name: "React", color: "border-sky-400/30", bg: "bg-sky-400/5", size: "w-24 h-24 md:w-32 md:h-32", yOffset: 20, delay: 0.1, exp: "3+ yrs" },
  { name: "TypeScript", color: "border-blue-500/30", bg: "bg-blue-500/5", size: "w-28 h-28 md:w-36 md:h-36", yOffset: -15, delay: 0.2, exp: "2+ yrs" },
  { name: "Tailwind", color: "border-teal-400/30", bg: "bg-teal-400/5", size: "w-20 h-20 md:w-28 md:h-28", yOffset: 30, delay: 0.3, exp: "3+ yrs" },
  { name: "Prisma", color: "border-emerald-400/30", bg: "bg-emerald-400/5", size: "w-22 h-22 md:w-30 md:h-30", yOffset: -25, delay: 0.4, exp: "2+ yrs" },
  { name: "PostgreSQL", color: "border-blue-300/30", bg: "bg-blue-300/5", size: "w-24 h-24 md:w-34 md:h-34", yOffset: 10, delay: 0.5, exp: "2+ yrs" },
  { name: "Figma", color: "border-pink-400/30", bg: "bg-pink-400/5", size: "w-22 h-22 md:w-30 md:h-30", yOffset: -10, delay: 0.6, exp: "3+ yrs" },
  { name: "Node.js", color: "border-green-400/30", bg: "bg-green-400/5", size: "w-24 h-24 md:w-32 md:h-32", yOffset: 15, delay: 0.7, exp: "3+ yrs" },
];

export const TechOrbs = () => {
  const [activeOrb, setActiveOrb] = useState<string | null>(null);

  return (
    <section id="arsenal" className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-violet text-xs font-heading tracking-[0.3em] uppercase mb-3"
          >
            Tech Stack
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            Arsenal
          </h2>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6">
          {skills.map((skill) => {
            const isActive = activeOrb === skill.name;
            const isFaded = activeOrb !== null && !isActive;

            return (
              <motion.div
                key={skill.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: skill.delay }}
              >
                <motion.div
                  animate={{
                    y: [skill.yOffset, skill.yOffset - 10, skill.yOffset],
                    scale: isActive ? 1.15 : 1,
                    opacity: isFaded ? 0.25 : 1,
                  }}
                  transition={{
                    y: { duration: 3 + skill.delay, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                  }}
                  onClick={() => setActiveOrb(isActive ? null : skill.name)}
                  className={`${skill.size} ${skill.bg} ${skill.color} rounded-full border backdrop-blur-sm flex items-center justify-center cursor-pointer relative transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]`}
                >
                  <span className="text-white/80 font-heading text-xs md:text-sm tracking-wider">
                    {skill.name}
                  </span>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute -bottom-12 glass px-3 py-1.5 rounded-lg text-[10px] text-white/70 font-mono whitespace-nowrap"
                    >
                      {skill.exp} experience
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
