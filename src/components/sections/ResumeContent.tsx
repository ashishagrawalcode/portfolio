"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { FluidCursor } from "@/components/ui/FluidCursor";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SectionHeader = ({ title }: { title: string }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className="mb-8 mt-20 flex items-center gap-6 first:mt-0"
  >
    <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
      {title}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-accent-violet/50 to-transparent" />
  </m.div>
);

const ResumeCard = ({
  title,
  subtitle,
  date,
  location,
  bullets,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  date?: string;
  location?: string;
  bullets?: string[];
}) => (
  <m.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="mb-8 glass-card rounded-2xl p-6 md:p-10 group hover:border-accent-violet/40 transition-colors relative overflow-hidden"
  >
    {/* Subtle hover glow inside the card */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    
    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-white/5 pb-6">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {title}
        </h3>
        {subtitle && (
          <div className="text-gradient-accent font-semibold text-sm md:text-base tracking-wide">
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex flex-col md:items-end text-xs md:text-sm text-text-secondary font-mono tracking-widest uppercase gap-1 shrink-0">
        {date && <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-white/90">{date}</span>}
        {location && <span className="mt-2">{location}</span>}
      </div>
    </div>

    {bullets && bullets.length > 0 && (
      <ul className="relative z-10 space-y-4">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-4 text-text-secondary text-sm md:text-base leading-relaxed">
            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent-blue/50 shrink-0 group-hover:bg-accent-blue transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="group-hover:text-white/90 transition-colors">{bullet}</span>
          </li>
        ))}
      </ul>
    )}
  </m.div>
);

const SkillBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-5 py-2.5 rounded-full bg-accent-violet/[0.05] border border-accent-violet/[0.2] text-sm text-white/80 hover:text-white hover:bg-accent-violet/[0.15] hover:border-accent-violet/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all cursor-default backdrop-blur-md">
    {children}
  </span>
);

const SkillCategory = ({ category, skills }: { category: string; skills: string }) => {
  const skillList = skills.split(",").map(s => s.trim());
  return (
    <m.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 glass-card p-6 rounded-2xl border border-white/5"
    >
      <h4 className="text-accent-violet font-heading tracking-widest uppercase text-xs mb-6 font-bold">{category}</h4>
      <div className="flex flex-wrap gap-3">
        {skillList.map((skill, i) => (
          <SkillBadge key={i}>{skill}</SkillBadge>
        ))}
      </div>
    </m.div>
  );
};

export const ResumeContent = () => {
  const mousePointer = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePointer.current.x = e.clientX;
      mousePointer.current.y = e.clientY;
      mousePointer.current.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePointer.current.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-bg-primary pt-32 pb-32 px-4 md:px-6 relative flex flex-col items-center overflow-hidden">
      <FluidCursor mousePointer={mousePointer} />
      
      {/* Protective Dark Overlay — Keeps background visible but ensures cards/text stand out */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0.65)_0%,rgba(5,5,10,0.95)_100%)] z-0 pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col relative">
        {/* Header Section */}
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 mb-24 glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-violet/20 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight mb-4 drop-shadow-lg">
              Ashish <span className="font-semibold italic text-gradient-accent">Agrawal.</span>
            </h1>
            
            <p className="text-white/90 font-heading tracking-[0.3em] text-xs md:text-sm uppercase font-bold mb-8">
              Product Builder <span className="text-accent-violet mx-2">/</span> Frontend Developer
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-text-secondary font-mono tracking-widest uppercase">
              <a href="mailto:agrawalashish815@gmail.com" className="hover:text-accent-blue transition-colors border-b border-transparent hover:border-accent-blue pb-1">
                Email
              </a>
              <a href="https://github.com/ashishagrawalcode" target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors border-b border-transparent hover:border-accent-blue pb-1">
                GitHub
              </a>
              <a href="https://linkedin.com/in/ashish-agrawal-18a18b361" target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors border-b border-transparent hover:border-accent-blue pb-1">
                LinkedIn
              </a>
              <span className="text-white/40 border-b border-transparent pb-1">
                Siliguri, India
              </span>
            </div>
          </div>
          
          <div className="relative z-10 shrink-0">
            <a href="/Ashish_Agrawal.pdf" download="Ashish_Agrawal_Resume.pdf">
              <MagneticButton className="text-sm md:text-base">
                Download PDF
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </MagneticButton>
            </a>
          </div>
        </m.div>

        {/* Custom Resume Content */}
        <div className="relative w-full">

          {/* Education */}
          <SectionHeader title="Education" />
          <ResumeCard
            title="BML Munjal University"
            subtitle="Bachelor of Technology (B.Tech) – Computer Science & Engineering"
            location="Gurugram, India"
            date="2025 – 2029"
            bullets={[
              "Maintained an academic track record with an 8.71 / 10.0 CGPA across foundational engineering coursework.",
              "Awarded 25% Merit Scholarship at BML Munjal University based on competitive academic performance thresholds."
            ]}
          />

          {/* Technical Skills */}
          <SectionHeader title="Technical Arsenal" />
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillCategory category="Languages" skills="C, C++, Python, JavaScript, TypeScript, SQL" />
            <SkillCategory category="Frontend" skills="React.js, Next.js, HTML5, CSS3, Tailwind CSS, Responsive Design, Framer Motion" />
            <SkillCategory category="Backend & Database" skills="Next.js API Routes, Server Actions, PostgreSQL, Prisma ORM, Firebase, Neon Tech" />
            <SkillCategory category="Tools & Platforms" skills="Git, GitHub, Figma, VS Code, Vercel, Auth.js, NextAuth, TanStack Query, Zustand" />
            <div className="md:col-span-2">
              <SkillCategory category="Concepts" skills="Database Design, Product Development, Authentication Systems, State Management, Progressive Web Apps (PWA)" />
            </div>
          </div>

          {/* Projects */}
          <SectionHeader title="Select Projects" />
          <ResumeCard
            title="ArthiX V2 – Financial Literacy Platform"
            subtitle="Founder & Developer • Next.js, TypeScript, PostgreSQL, Prisma ORM, Auth.js, Tailwind CSS"
            date="Ongoing"
            bullets={[
              "Architected a scalable full-stack system designed for students and young adults leveraging financial simulations, learning modules, and behavioral tracking.",
              "Built production-oriented platform workflows for financial decision-making simulations and state-managed educational progression.",
              "Implemented high-performance server-side operations utilizing PostgreSQL and Prisma ORM for seamless relational data mapping.",
              "Spearheaded end-to-end product strategy, feature roadmap planning, UI/UX architecture, and responsive dark-theme engineering."
            ]}
          />
          <ResumeCard
            title="Ledzer – Business Operating System"
            subtitle="Founder & Developer • Next.js 14, TypeScript, Prisma, PostgreSQL, IndexedDB, Zustand"
            date="June 2026"
            bullets={[
              "Engineered a full-stack business operating platform handling invoicing, inventory, and accounting workflows within a rapid 30-hour development crunch.",
              "Designed an offline-first client architecture using IndexedDB data synchronization workflows and local data persistence mechanisms.",
              "Developed granular metrics reporting pipelines including automated P&L statements, Balance Sheets, Cash Flow trackers, and dynamic dashboard analytics.",
              "Integrated localized PDF/Excel invoice export mechanics alongside optimized state management flows via Zustand and TanStack Query."
            ]}
          />
          <ResumeCard
            title="ArthiX V1 – Financial Literacy MVP"
            subtitle="Founder & Developer • Next.js, React.js, Firebase Database, Google OAuth"
            date="2025"
            bullets={[
              "Developed and successfully deployed the initial public MVP of ArthiX to evaluate student interactions with gamified financial modules.",
              "Implemented Google OAuth authentication sequences and secure backend email validation routing via Nodemailer integrations.",
              "Validated complete core functional architecture including simulation sandboxes and modular learning milestones."
            ]}
          />
          <ResumeCard
            title="Personal Portfolio Website v2.0"
            subtitle="Sole Developer • HTML5, CSS3, Native JavaScript, UI Design"
            date="2026"
            bullets={[
              "Designed and deployed a highly interactive, responsive dark-themed portfolio incorporating a dynamic living mesh background asset.",
              "Programmed a custom masonry layout engine for a smart photography gallery with zero-latency categorization filters."
            ]}
          />

          {/* Experience */}
          <SectionHeader title="Leadership & Experience" />
          <ResumeCard
            title="Design Team Contributor"
            subtitle="Student Editorial Board, ACM BMU, TEDxBMU, BMUMUN, Ranbhoomi, 67th Milestone"
            location="BML Munjal University"
            date="2025 – 2026"
            bullets={[
              "Conceptualized and produced 30+ comprehensive design assets including high-fidelity posters, identity lanyards, and event branding kits.",
              "Maintained strict brand guideline architectures across cross-functional university organizations to execute physical and digital visual campaigns.",
              "Leveraged Figma workflows to prototype user interfaces, spatial layouts, and production-ready print vectors."
            ]}
          />
          <ResumeCard
            title="Technical Team Member"
            subtitle="Nexus BMU Student Chapter & R&D Cell"
            location="BML Munjal University"
            date="2025 – 2026"
            bullets={[
              "Collaborated in open-source engineering workshops, research roundtables, and regular code reviews to optimize project cycles."
            ]}
          />
          <ResumeCard
            title="SwasthSathi – Telehealth Platform Concept"
            subtitle="UX Contributor & Product Architect • Smart India Hackathon (SIH) Preparation"
            date="September 2025"
            bullets={[
              "Mapped user journeys and accessibility wireframes optimized specifically for remote healthcare discovery and ASHA worker interfaces.",
              "Co-authored detailed functional specification documentation governing system architectures for doctor routing and appointment pipelines."
            ]}
          />
        </div>
      </div>
    </main>
  );
};
