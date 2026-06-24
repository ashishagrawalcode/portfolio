"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FluidCursor } from "@/components/ui/FluidCursor";

export const ResumeContent = () => {
  const mousePointer = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePointer.current.x = e.clientX;
      mousePointer.current.y = e.clientY;
      mousePointer.current.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePointer.current.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-bg-primary pt-24 pb-12 px-6 relative flex flex-col items-center">
      <FluidCursor mousePointer={mousePointer} />
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent-violet/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 text-center md:text-left">
              Curriculum Vitae
            </h1>
            <p className="text-text-secondary text-center md:text-left font-heading tracking-widest text-xs md:text-sm uppercase">
              Ashish Agrawal &bull; Full Stack Developer
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Ashish_Agrawal.pdf"
            download="Ashish_Agrawal_Resume.pdf"
            className="group relative px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-bold text-white overflow-hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="relative z-10">Download PDF</span>
            <div className="absolute inset-0 bg-accent-violet translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </motion.a>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[80vh] min-h-[600px] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
        >
          <object
            data="/Ashish_Agrawal.pdf"
            type="application/pdf"
            className="w-full h-full rounded-2xl"
          >
            {/* Fallback if browser doesn't support inline PDFs */}
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-bg-secondary">
              <div className="w-16 h-16 rounded-full bg-accent-violet/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-violet">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Resume Ready</h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                It looks like your browser doesn't support inline PDFs. No worries! You can securely download the file directly.
              </p>
              <a
                href="/Ashish_Agrawal.pdf"
                download="Ashish_Agrawal_Resume.pdf"
                className="px-6 py-3 rounded-lg bg-accent-violet text-white font-bold hover:bg-accent-violet/90 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </object>
        </motion.div>
      </div>
    </main>
  );
};
