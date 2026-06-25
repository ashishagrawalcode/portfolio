"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { signaturePaths } from "../loader/signature-path";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // High-performance scroll detection for Auto Open/Close
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;

    // Scroll Down -> Auto Close
    if (diff > 15 && latest > 50) {
      if (isOpen) setIsOpen(false);
    }
    // Scroll Up -> Auto Open
    else if (diff < -15) {
      if (!isOpen) setIsOpen(true);
    }

    // Active section detection
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          setActiveIndex(i);
          break;
        }
      }
    }
  });

  useEffect(() => {
    if (pathname === "/resume") {
      const resumeIndex = navItems.findIndex((item) => item.href === "/resume");
      if (resumeIndex !== -1) setActiveIndex(resumeIndex);
    }
  }, [pathname]);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center pointer-events-none w-full">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: isOpen ? "95vw" : "160px",
          height: isOpen ? "52px" : "48px",
          borderRadius: isOpen ? 32 : 40 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
        style={{ maxWidth: isOpen ? "600px" : "160px" }}
        className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto overflow-hidden group flex items-center justify-center"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Closed State - Signature Pill */}
          <motion.button
            aria-label="Open Navigation Menu"
            animate={{ 
              opacity: isOpen ? 0 : 1, 
              scale: isOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className={`absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer hover:bg-white/[0.02] transition-colors ${isOpen ? 'pointer-events-none' : ''}`}
          >
            <svg
              viewBox="0 0 480 130"
              className="w-24 h-auto drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]"
            >
              {signaturePaths.map((path, idx) => (
                <path
                  key={`sig-${idx}`}
                  d={path}
                  stroke={idx === 1 ? "#8B5CF6" : "#ffffff"}
                  strokeWidth="8" // Balanced thickness
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </svg>
          </motion.button>

          {/* Open State - Nav Menu */}
          <motion.div
            animate={{ 
              opacity: isOpen ? 1 : 0, 
              scale: isOpen ? 1 : 0.95 
            }}
            transition={{ duration: 0.2, delay: isOpen ? 0.1 : 0 }}
            className={`absolute inset-0 flex items-center px-1.5 md:px-2 w-full h-full ${!isOpen ? 'pointer-events-none' : ''}`}
          >
            <div
              className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden w-full h-full"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {navItems.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollTo(item.href);
                    }}
                    className={`relative z-10 shrink-0 px-4 md:px-5 h-full rounded-full text-[13px] md:text-[14px] font-heading tracking-wide transition-colors duration-300 flex items-center justify-center ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-[4px] rounded-full bg-white/[0.08] border border-white/[0.06] -z-10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-20 truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
};
