import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Story } from "@/components/sections/Story";
import { LazyComponent } from "@/components/layout/LazyComponent";

const ProjectUniverse = dynamic(() => import("@/components/sections/ProjectUniverse").then((mod) => mod.ProjectUniverse));
const Timeline = dynamic(() => import("@/components/sections/Timeline").then((mod) => mod.Timeline));
const DesignGallery = dynamic(() => import("@/components/sections/DesignGallery").then((mod) => mod.DesignGallery));
const TechOrbs = dynamic(() => import("@/components/sections/TechOrbs").then((mod) => mod.TechOrbs));
const ClubsAndTeams = dynamic(() => import("@/components/sections/ClubsAndTeams").then((mod) => mod.ClubsAndTeams));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent-violet/30">
      <PageWrapper>
        <Story />
        <LazyComponent minHeight="100vh">
          <ProjectUniverse />
        </LazyComponent>
        <LazyComponent minHeight="100vh">
          <Timeline />
        </LazyComponent>
        <LazyComponent minHeight="100vh">
          <DesignGallery />
        </LazyComponent>
        <LazyComponent minHeight="100vh">
          <TechOrbs />
        </LazyComponent>
        <LazyComponent minHeight="100vh">
          <ClubsAndTeams />
        </LazyComponent>
        <LazyComponent minHeight="100vh">
          <FinalCTA />
        </LazyComponent>
      </PageWrapper>
    </main>
  );
}
