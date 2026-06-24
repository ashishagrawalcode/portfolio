"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { SignatureLoader } from "@/components/loader/SignatureLoader";
import { Navbar } from "@/components/ui/Navbar";
import { FluidCursor } from "@/components/ui/FluidCursor";
import { Hero } from "@/components/sections/Hero";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const mousePointer = useMousePosition();

  useEffect(() => {
    // Only play the loader once per session
    if (sessionStorage.getItem("introPlayed")) {
      setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <SignatureLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <div className={loading ? "fixed inset-0 overflow-hidden" : ""}>
        <Navbar />
        <FluidCursor mousePointer={mousePointer} />

        {/* Hero needs mousePointer, so it stays in the wrapper */}
        <Hero mousePointer={mousePointer} />
        
        {/* All other sections will be passed as children to be Server Components or dynamically imported */}
        {children}
      </div>
    </>
  );
};
