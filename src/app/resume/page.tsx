import { Metadata } from "next";
import { ResumeContent } from "@/components/sections/ResumeContent";
import { Navbar } from "@/components/ui/Navbar";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Resume | Ashish Agrawal",
  description: "View and download the resume of Ashish Agrawal.",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <ResumeContent />
      <FinalCTA />
    </>
  );
}
