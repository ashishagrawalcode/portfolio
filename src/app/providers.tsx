"use client";

import { useEffect } from "react";
import { initLenis } from "../lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize global smooth scrolling on mount
    initLenis();
  }, []);

  return <>{children}</>;
}
