"use client";

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "../ui/MagneticButton";

const FooterWebGL = dynamic(() => import("../canvas/FooterWebGL").then((mod) => mod.FooterWebGL), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary to-transparent" />,
});

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ashishagrawalcode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashishagrawal815/" },
];

const footerLinks = [
  { label: "Resume", href: "/resume" },
];

export const FinalCTA = () => {
  return (
    <footer id="contact" className="relative bg-bg-primary overflow-hidden">
      {/* Top divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* WebGL Animated Background covering the entire footer */}
      <FooterWebGL />

      {/* CTA Section */}
      <div className="relative py-24 md:py-32 flex items-center justify-center text-center z-10">

        <div className="relative z-10 max-w-3xl px-6">
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-violet text-[10px] font-heading tracking-[0.4em] uppercase mb-5"
          >
            What&apos;s Next?
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-8 leading-[1.1]"
          >
            Let&apos;s Build Something{" "}
            <span className="text-gradient-accent italic">Meaningful.</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-light text-text-secondary text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed"
          >
            Have a project in mind, or just want to say hello? I&apos;m always
            open to discussing new ideas and opportunities.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <a href="mailto:agrawalashish815@gmail.com">
              <MagneticButton className="text-sm md:text-base">
              Start a Conversation
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
              </MagneticButton>
            </a>
          </m.div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="relative z-10 bg-bg-primary/80 backdrop-blur-xl border-t border-white/[0.05]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            
            {/* Brand Column */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Ashish Agrawal
                </h3>
                <p className="text-text-secondary/70 text-sm md:text-base leading-relaxed max-w-sm">
                  CS Undergrad &amp; Full Stack Developer crafting premium digital experiences.
                </p>
              </m.div>
              
              <div className="mt-auto pt-8">
                <a 
                  href="mailto:agrawalashish815@gmail.com" 
                  className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span className="font-heading text-sm tracking-wide">agrawalashish815@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3">
              <p className="text-[10px] font-heading tracking-[0.3em] uppercase text-white/30 mb-6">
                Navigation
              </p>
              <div className="flex flex-col gap-4">
                {footerLinks.map((link, i) => (
                  <m.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-text-secondary/60 hover:text-white text-base transition-colors duration-300 w-fit group flex items-center gap-3"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent-violet transition-colors" />
                    {link.label}
                  </m.a>
                ))}
              </div>
            </div>

            {/* Socials Column */}
            <div className="md:col-span-3">
              <p className="text-[10px] font-heading tracking-[0.3em] uppercase text-white/30 mb-6">
                Socials
              </p>
              <div className="flex flex-col gap-4">
                {socialLinks.map((link, i) => (
                  <m.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-text-secondary/60 hover:text-white text-base transition-colors duration-300 w-fit group flex items-center gap-3"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent-blue transition-colors" />
                    {link.label}
                    <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </m.a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04] relative z-10 bg-bg-primary/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-white/20 font-heading tracking-wider">
            © 2025 Ashish Agrawal
          </p>
          <p className="text-[10px] text-white/20 font-heading tracking-wider">
            Designed &amp; Developed with obsession
          </p>
        </div>
      </div>
    </footer>
  );
};
