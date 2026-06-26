import { Metadata } from "next";
import { DesignGallery } from "@/components/sections/DesignGallery";
import { Navbar } from "@/components/ui/Navbar";
import { FinalCTA } from "@/components/sections/FinalCTA";

import { CursorWrapper } from "@/components/layout/CursorWrapper";

export const metadata: Metadata = {
  title: "Design Gallery | Ashish Agrawal",
  description: "Explore the creative work and design portfolio of Ashish Agrawal.",
};

export default function DesignPage() {
  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent-violet/30">
      <CursorWrapper>
        <Navbar />
        <DesignGallery />
        <FinalCTA />
      </CursorWrapper>
    </main>
  );
}
