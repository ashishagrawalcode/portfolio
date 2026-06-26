"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { initLenis } from "../lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize global smooth scrolling on mount
    initLenis();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
