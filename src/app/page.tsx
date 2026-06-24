"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { SignatureLoader } from "@/components/loader/SignatureLoader";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { ProjectUniverse } from "@/components/sections/ProjectUniverse";
import { Timeline } from "@/components/sections/Timeline";
import { DesignGallery } from "@/components/sections/DesignGallery";
import { TechOrbs } from "@/components/sections/TechOrbs";
import { ClubsAndTeams } from "@/components/sections/ClubsAndTeams";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FluidCursor } from "@/components/ui/FluidCursor";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const mousePointer = useMousePosition();

  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent-violet/30">
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

        <Hero mousePointer={mousePointer} />
        <Story />
        <ProjectUniverse />
        <Timeline />
        <DesignGallery />
        <TechOrbs />
        <ClubsAndTeams />
        <FinalCTA />
      </div>
    </main>
  );
}
