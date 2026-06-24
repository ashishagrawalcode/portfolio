"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { projects } from "@/constants/projects";

export const ProjectUniverse = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Smooth spring-based mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // clientX/Y are relative to the viewport
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Attach to window so it tracks smoothly even if moving fast
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-32 md:py-48 transition-colors duration-1000 ease-out overflow-hidden"
      style={{ 
        backgroundColor: activeIdx !== null ? `${projects[activeIdx].color}0D` : "#06070a" 
      }}
      onMouseLeave={() => setActiveIdx(null)}
    >
      {/* Floating Hover Reveal (Desktop Only) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          width: 400,
          height: 520,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {activeIdx !== null && (
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.8, opacity: 0, rotate: -5, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, rotate: 5, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-2xl border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden bg-white/[0.02] backdrop-blur-3xl flex flex-col"
            >
               {/* Abstract colored visual since we lack real images */}
               <div 
                 className="absolute inset-0 opacity-60 mix-blend-screen transition-colors duration-500"
                 style={{ 
                   background: `radial-gradient(circle at 50% 0%, ${projects[activeIdx].color}60, transparent 70%)` 
                 }} 
               />
               
               <div className="flex-1 flex items-center justify-center relative">
                 <span 
                   className="text-[120px] font-display font-black opacity-10 drop-shadow-2xl select-none"
                   style={{ color: projects[activeIdx].color }}
                 >
                   {projects[activeIdx].title.charAt(0)}
                 </span>
               </div>
               
               {/* Overlay Details */}
               <div className="p-8 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent relative z-10 border-t border-white/5">
                 <p className="text-[10px] font-heading tracking-[0.3em] uppercase mb-2" style={{ color: projects[activeIdx].color }}>
                   {projects[activeIdx].subtitle}
                 </p>
                 <p className="text-white/80 text-xs leading-relaxed mb-4 line-clamp-3">
                   {projects[activeIdx].description}
                 </p>
                 <div className="flex gap-2 flex-wrap">
                   {projects[activeIdx].tech.slice(0, 3).map(t => (
                     <span key={t} className="px-2 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] text-white/60 font-heading tracking-wider">
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        <motion.div style={{ y: titleY }} className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <p className="text-accent-violet text-xs font-heading tracking-[0.3em] uppercase mb-4">
              Featured Work
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white">
              Project Universe
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/20 font-heading text-sm">
            <span>Hover to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>

        <div className="flex flex-col border-t border-white/10">
          {projects.map((project, i) => {
            const isActive = activeIdx === i;
            return (
              <motion.div 
                key={project.id}
                className="border-b border-white/10 relative py-8 md:py-14 cursor-none"
                onMouseEnter={() => {
                  // Only set on desktop hover to prevent mobile double-trigger
                  if (window.innerWidth >= 768) setActiveIdx(i);
                }}
                onClick={() => {
                  // Toggle on mobile, ensure active on desktop
                  if (window.innerWidth < 768) {
                    setActiveIdx(isActive ? null : i);
                  } else {
                    setActiveIdx(i);
                  }
                }}
              >
                 {/* Active line sweeping across */}
                 <div 
                   className={`absolute bottom-[-1px] left-0 h-[1px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${isActive ? "w-full" : "w-0"}`}
                   style={{ backgroundColor: project.color }}
                 />

                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-6 md:gap-16">
                     <span className={`font-heading text-sm md:text-xl transition-colors duration-500 ${isActive ? "text-white/40" : "text-white/10"}`}>
                       {String(i + 1).padStart(2, "0")}
                     </span>
                     <h3 
                       className={`text-3xl md:text-5xl lg:text-6xl font-display font-black transition-all duration-500 ${isActive ? "md:translate-x-6 md:italic" : ""}`}
                       style={{
                         WebkitTextStroke: isActive ? `2px ${project.color}` : "0px transparent",
                         color: isActive ? "transparent" : "rgba(255,255,255,0.2)",
                         textShadow: isActive ? `0 0 40px ${project.color}60` : "none"
                       }}
                     >
                       {project.title}
                     </h3>
                   </div>
                   
                   {/* Desktop right-side info */}
                   <div className={`hidden md:block text-right transform transition-all duration-500 ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
                     <p className="text-sm font-heading tracking-[0.3em] uppercase mb-3 drop-shadow-lg" style={{ color: project.color }}>
                       {project.subtitle}
                     </p>
                     <p className="text-white/40 text-xs font-heading tracking-widest">
                       {project.year}
                     </p>
                   </div>
                 </div>

                 {/* Mobile Expansion Accordion */}
                 <div 
                   className={`md:hidden grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr] mt-0"}`}
                 >
                    <div className="overflow-hidden">
                      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-2">
                        <p className="text-xs font-heading tracking-widest uppercase mb-3" style={{ color: project.color }}>
                          {project.subtitle}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tech.map(t => (
                            <span key={t} className="px-3 py-1.5 bg-white/10 rounded-full text-[10px] font-heading text-white/70 border border-white/5 shadow-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                 </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
