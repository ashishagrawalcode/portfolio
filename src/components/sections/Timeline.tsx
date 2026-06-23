"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    year: "2023 — Present",
    title: "Founder & Full Stack Developer",
    org: "Independent",
    description:
      "Building scalable platforms like Arthix and Ledzer. Managing full product lifecycles from ideation to deployment.",
  },
  {
    year: "2022 — 2023",
    title: "Core Team Member",
    org: "Student Editorial Board",
    description:
      "Led technical initiatives and designed interactive digital experiences for university publications.",
  },
  {
    year: "2021 — 2022",
    title: "Web Developer",
    org: "ACM BMU",
    description:
      "Contributed to open-source projects and built university-wide tech solutions.",
  },
  {
    year: "2021",
    title: "Design Lead",
    org: "TEDx BMU",
    description:
      "Crafted the complete brand identity, marketing collateral, and digital presence.",
  },
  {
    year: "2020 — 2021",
    title: "Research Contributor",
    org: "R&D Cell · Nexus BMU",
    description:
      "Explored emerging web technologies, IoT integrations, and experimental interfaces.",
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative py-20 bg-bg-primary">
      <div className="max-w-4xl mx-auto px-8 relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent-violet text-xs font-heading tracking-[0.3em] uppercase mb-3 text-center"
        >
          Journey So Far
        </motion.p>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-20 text-center">
          Experience
        </h2>

        {/* Central Animated Line */}
        <div className="absolute left-8 md:left-1/2 top-44 bottom-0 w-[1px] bg-white/5 -translate-x-1/2">
          <motion.div
            className="w-full bg-accent-violet origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="flex flex-col gap-16">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? "md:justify-start" : "md:justify-end"} relative pl-12 md:pl-0`}
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="absolute left-4 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-accent-violet bg-bg-primary z-10"
                />

                <div
                  className={`w-full md:w-5/12 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
                >
                  <span className="text-accent-violet/80 text-xs font-mono tracking-widest">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white mt-2">
                    {item.title}
                  </h3>
                  <h4 className="text-sm text-white/40 font-heading mb-3">
                    {item.org}
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
