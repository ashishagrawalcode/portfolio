"use client";

import { motion } from "framer-motion";

export const FloatingElements = () => {
  return (
    <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block pointer-events-none z-10">
      {/* Element 1: Glass Card with abstract code */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[25%] right-[20%] w-64 h-40 rounded-2xl bg-white/10 border border-white/10 shadow-2xl p-6 flex flex-col gap-3"
        style={{ transformPerspective: 1000 }}
      >
        <div className="w-8 h-8 rounded-full bg-accent-violet/50 mb-2" />
        <div className="w-3/4 h-2 rounded-full bg-white/20" />
        <div className="w-1/2 h-2 rounded-full bg-white/20" />
        <div className="w-full h-2 rounded-full bg-white/10 mt-auto" />
      </motion.div>

      {/* Element 2: Glowing Ring */}
      <motion.div
        animate={{
          y: [15, -15, 15],
          rotate: [0, 180, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[50%] right-[40%] w-32 h-32 rounded-full border-[12px] border-accent-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-white/5"
      />

      {/* Element 3: Abstract Crystal / Geometric Shape */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [15, -15, 15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-gradient-to-br from-accent-violet/30 to-accent-blue/10 rounded-3xl border border-accent-violet/20 transform rotate-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_50%)] rounded-3xl" />
      </motion.div>

      {/* Element 4: Floating Tech Badge */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-[15%] right-[45%] px-4 py-2 rounded-full bg-black/60 border border-white/10 flex items-center gap-2 shadow-xl"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
        <span className="text-white/80 text-xs font-mono tracking-wider">SYSTEM_ONLINE</span>
      </motion.div>
    </div>
  );
};
