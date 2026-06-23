"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const lastScrollY = useRef(0);

  // Expanded if we are at top, or hovered, or clicked (on mobile)
  const isExpanded = !isScrolledDown || isHovered || isClicked;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Smart collapse logic
      if (currentY < 100) {
        setIsScrolledDown(false);
      } else if (currentY > lastScrollY.current + 15) {
        setIsScrolledDown(true);
        setIsClicked(false);
      } else if (currentY < lastScrollY.current - 15) {
        setIsScrolledDown(false);
      }
      
      lastScrollY.current = currentY;

      // Active section detection
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (window.scrollY > 100) {
      setIsScrolledDown(true);
    }
    setIsClicked(false);
  };

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center">
      <motion.nav
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (!isExpanded) setIsClicked(true);
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30 
        }}
        className={`relative flex items-center justify-center p-2 rounded-[32px] bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden ${
          !isExpanded ? "cursor-pointer" : ""
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 md:flex md:flex-row items-center gap-1 p-1 md:p-0 w-[95vw] md:w-auto max-w-[400px] md:max-w-none"
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
                    className={`relative z-10 w-full md:w-auto px-1 md:px-4 py-2.5 md:py-1.5 rounded-full text-[11px] md:text-[13px] font-heading tracking-wide transition-colors duration-300 flex items-center justify-center ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06] -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-20 truncate">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center px-4 py-1"
            >
              <div className="w-6 h-6 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                <span className="font-display font-bold text-white text-xs">A</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
