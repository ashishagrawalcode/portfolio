"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { SignatureLoader } from "@/components/loader/SignatureLoader";
import { Navbar } from "@/components/ui/Navbar";
import { FluidCursor } from "@/components/ui/FluidCursor";
import { Hero } from "@/components/sections/Hero";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const mousePointer = useMousePosition();

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <SignatureLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
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
