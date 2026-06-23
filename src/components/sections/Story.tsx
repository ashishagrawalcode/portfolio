"use client";

import { motion } from "framer-motion";

const frames = [
  {
    text: "It started with curiosity.",
    sub: "A desire to understand how things work, how pixels become products.",
  },
  {
    text: "One idea became many.",
    sub: "Financial simulations. Business systems. Interactive experiences. Each one a step forward.",
  },
  {
    text: "I stopped learning frameworks.",
    sub: "The shift from consumer to creator. From tutorials to production.",
  },
  {
    text: "Today, I build what matters.",
    accent: true,
    sub: "",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 120, rotateX: 30, filter: "blur(12px)", scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Story = () => {
  return (
    <section id="story" className="relative bg-bg-primary py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent-violet/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-accent-violet text-[10px] font-heading tracking-[0.3em] uppercase mb-16 md:mb-24 text-center"
        >
          My Story
        </motion.p>

        {/* Frames */}
        <div className="space-y-20 md:space-y-32">
          {frames.map((frame, i) => (
            <motion.div
              key={i}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`flex flex-col ${i % 2 === 0 ? "items-start text-left" : "items-end text-right"}`}
            >
              <motion.h2
                variants={textReveal as any}
                className={`font-display font-bold leading-[1.15] whitespace-pre-line mb-4 max-w-2xl ${
                  frame.accent
                    ? "text-3xl md:text-5xl lg:text-7xl"
                    : "text-2xl md:text-4xl lg:text-5xl"
                }`}
                style={
                  frame.accent
                    ? {
                        background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {
                        background: "linear-gradient(180deg, #ffffff, rgba(255,255,255,0.45))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                }
              >
                {frame.text}
              </motion.h2>

              {frame.sub && (
                <motion.p
                  variants={textReveal as any}
                  className="text-white/40 text-sm md:text-base max-w-md leading-relaxed"
                >
                  {frame.sub}
                </motion.p>
              )}

              {/* Decorative line */}
              <motion.div
                variants={textReveal as any}
                className={`mt-8 h-[1px] w-16 ${frame.accent ? "bg-accent-violet/50" : "bg-white/10"}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
