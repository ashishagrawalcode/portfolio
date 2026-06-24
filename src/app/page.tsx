import { PageWrapper } from "@/components/layout/PageWrapper";
import { Story } from "@/components/sections/Story";
import { ProjectUniverse } from "@/components/sections/ProjectUniverse";
import { Timeline } from "@/components/sections/Timeline";
import { DesignGallery } from "@/components/sections/DesignGallery";
import { TechOrbs } from "@/components/sections/TechOrbs";
import { ClubsAndTeams } from "@/components/sections/ClubsAndTeams";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent-violet/30">
      <PageWrapper>
        <Story />
        <ProjectUniverse />
        <Timeline />
        <DesignGallery />
        <TechOrbs />
        <ClubsAndTeams />
        <FinalCTA />
      </PageWrapper>
    </main>
  );
}
