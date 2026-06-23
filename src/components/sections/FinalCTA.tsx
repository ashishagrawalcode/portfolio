"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";

const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

const footerLinks = [
  { label: "Resume", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Uses", href: "#" },
];

export const FinalCTA = () => {
  return (
    <footer id="contact" className="relative bg-bg-primary overflow-hidden">
      {/* Top divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* CTA Section */}
      <div className="relative py-24 md:py-32 flex items-center justify-center text-center">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent-violet/6 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-3xl px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-violet text-[10px] font-heading tracking-[0.4em] uppercase mb-5"
          >
            What&apos;s Next?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-8 leading-[1.1]"
          >
            Let&apos;s Build Something{" "}
            <span className="text-gradient-accent italic">Meaningful.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed"
          >
            Have a project in mind, or just want to say hello? I&apos;m always
            open to discussing new ideas and opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
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
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Column */}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-xl text-white mb-3"
              >
                Ashish Agrawal
              </motion.h3>
              <p className="text-text-secondary/60 text-xs leading-relaxed max-w-xs">
                Founder &amp; Full Stack Developer crafting premium digital experiences.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <p className="text-[10px] font-heading tracking-[0.3em] uppercase text-white/30 mb-4">
                Quick Links
              </p>
              <div className="flex flex-col gap-2.5">
                {footerLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-text-secondary/50 hover:text-white text-sm transition-colors duration-300 w-fit group flex items-center gap-2"
                  >
                    {link.label}
                    <span className="inline-block w-0 group-hover:w-4 h-[1px] bg-accent-violet transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Socials Column */}
            <div>
              <p className="text-[10px] font-heading tracking-[0.3em] uppercase text-white/30 mb-4">
                Connect
              </p>
              <div className="flex flex-col gap-2.5">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-text-secondary/50 hover:text-white text-sm transition-colors duration-300 w-fit group flex items-center gap-2"
                  >
                    {link.label}
                    <span className="inline-block w-0 group-hover:w-4 h-[1px] bg-accent-violet transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-white/20 font-mono tracking-wider">
            © 2024 Ashish Agrawal
          </p>
          <p className="text-[10px] text-white/20 font-mono tracking-wider">
            Designed &amp; Developed with obsession
          </p>
        </div>
      </div>
    </footer>
  );
};
