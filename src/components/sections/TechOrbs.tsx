"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const skills = [
  { id: "nextjs", name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white", color: "rgba(255,255,255,0.1)", radius: 60 },
  { id: "react", name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "rgba(97,218,251,0.15)", radius: 50 },
  { id: "typescript", name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "rgba(49,120,198,0.15)", radius: 55 },
  { id: "tailwind", name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "rgba(6,182,212,0.15)", radius: 45 },
  { id: "prisma", name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white", color: "rgba(255,255,255,0.1)", radius: 48 },
  { id: "postgresql", name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "rgba(65,105,225,0.15)", radius: 50 },
  { id: "figma", name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", color: "rgba(242,78,30,0.15)", radius: 45 },
  { id: "nodejs", name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "rgba(51,153,51,0.15)", radius: 50 },
  { id: "canva", name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC", color: "rgba(0,196,204,0.15)", radius: 40 },
  { id: "neon", name: "Neon", icon: "https://cdn.simpleicons.org/neon/00E599", color: "rgba(0,229,153,0.15)", radius: 45 },
  { id: "vercel", name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white", color: "rgba(255,255,255,0.1)", radius: 50 },
  { id: "drizzle", name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle/C5F74F", color: "rgba(197,247,79,0.15)", radius: 45 },
  { id: "html", name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", color: "rgba(227,79,38,0.15)", radius: 40 },
  { id: "css", name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6", color: "rgba(21,114,182,0.15)", radius: 40 },
  { id: "js", name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", color: "rgba(247,223,30,0.15)", radius: 40 },
  { id: "render", name: "Render", icon: "https://cdn.simpleicons.org/render/white", color: "rgba(255,255,255,0.15)", radius: 45 },
  { id: "c", name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC", color: "rgba(168,185,204,0.15)", radius: 40 },
  { id: "cpp", name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C", color: "rgba(0,89,156,0.15)", radius: 45 },
  { id: "python", name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "rgba(55,118,171,0.15)", radius: 50 },
];



// ─── Physics engine (all devices) ──────────────────────────────────────────────
const TechOrbsPhysics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const orbsRef = useRef<{
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isDragging: boolean;
    element: HTMLDivElement | null;
  }[]>([]);

  const dragState = useRef({
    activeId: null as string | null,
    lastMouseX: 0,
    lastMouseY: 0,
    lastTime: 0,
  });

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    // eslint-disable-next-line
    setIsClient(true);
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    // Orbs are 65% size on mobile to fit smaller screens
    const scale = isMobile ? 0.65 : 1;

    if (orbsRef.current.length === 0) {
      orbsRef.current = skills.map((skill, index) => {
        const x = width / 2 + (Math.random() - 0.5) * 100;
        const y = height / 2 + (Math.random() - 0.5) * 100;
        const angle = (index / skills.length) * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        return {
          id: skill.id,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: skill.radius * scale,
          isDragging: false,
          element: null,
        };
      });
    }

    let animationFrameId: number;

    const updatePhysics = () => {
      const orbs = orbsRef.current;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const restitution = 1.0;

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (orb.isDragging) continue;
        const currentSpeed = Math.hypot(orb.vx, orb.vy);
        if (currentSpeed < 0.5) {
          orb.vx += (Math.random() - 0.5) * 0.1;
          orb.vy += (Math.random() - 0.5) * 0.1;
        }
        if (currentSpeed > 3) {
          orb.vx = (orb.vx / currentSpeed) * 3;
          orb.vy = (orb.vy / currentSpeed) * 3;
        }
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x - orb.radius < 0) { orb.x = orb.radius; orb.vx *= -restitution; }
        else if (orb.x + orb.radius > w) { orb.x = w - orb.radius; orb.vx *= -restitution; }
        if (orb.y - orb.radius < 0) { orb.y = orb.radius; orb.vy *= -restitution; }
        else if (orb.y + orb.radius > h) { orb.y = h - orb.radius; orb.vy *= -restitution; }
      }

      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const o1 = orbs[i];
          const o2 = orbs[j];
          const dx = o2.x - o1.x;
          const dy = o2.y - o1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = o1.radius + o2.radius;
          if (dist < minDist && dist > 0) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            if (!o1.isDragging && !o2.isDragging) {
              o1.x -= nx * (overlap / 2);
              o1.y -= ny * (overlap / 2);
              o2.x += nx * (overlap / 2);
              o2.y += ny * (overlap / 2);
            } else if (o1.isDragging) {
              o2.x += nx * overlap;
              o2.y += ny * overlap;
            } else {
              o1.x -= nx * overlap;
              o1.y -= ny * overlap;
            }
            const dvx = o1.vx - o2.vx;
            const dvy = o1.vy - o2.vy;
            const velocityAlongNormal = dvx * nx + dvy * ny;
            if (velocityAlongNormal > 0) {
              const impulse = (1 + restitution) * velocityAlongNormal / 2;
              if (!o1.isDragging) { o1.vx -= impulse * nx; o1.vy -= impulse * ny; }
              if (!o2.isDragging) { o2.vx += impulse * nx; o2.vy += impulse * ny; }
            }
          }
        }
      }

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (orb.element) {
          orb.element.style.transform = `translate3d(${orb.x - orb.radius}px, ${orb.y - orb.radius}px, 0)`;
        }
      }

      if (isInView) {
        animationFrameId = requestAnimationFrame(updatePhysics);
      }
    };

    if (isInView) updatePhysics();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    const orb = orbsRef.current.find(o => o.id === id);
    if (!orb) return;
    orb.isDragging = true;
    dragState.current.activeId = id;
    dragState.current.lastMouseX = e.clientX;
    dragState.current.lastMouseY = e.clientY;
    dragState.current.lastTime = Date.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { activeId } = dragState.current;
    if (!activeId) return;
    const orb = orbsRef.current.find(o => o.id === activeId);
    if (!orb) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    orb.x = e.clientX - containerRect.left;
    orb.y = e.clientY - containerRect.top;
    const now = performance.now();
    const dt = now - dragState.current.lastTime;
    if (dt > 0) {
      orb.vx = (e.clientX - dragState.current.lastMouseX) * (16 / dt) * 0.5;
      orb.vy = (e.clientY - dragState.current.lastMouseY) * (16 / dt) * 0.5;
    }
    dragState.current.lastMouseX = e.clientX;
    dragState.current.lastMouseY = e.clientY;
    dragState.current.lastTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const { activeId } = dragState.current;
    if (!activeId) return;
    const orb = orbsRef.current.find(o => o.id === activeId);
    if (orb) {
      orb.isDragging = false;
      orb.vx = Math.max(-40, Math.min(40, orb.vx));
      orb.vy = Math.max(-40, Math.min(40, orb.vy));
    }
    dragState.current.activeId = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1200px] mx-auto h-[60vh] md:h-[70vh] border border-white/5 rounded-[3rem] bg-bg-secondary/30 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] touch-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-violet/5 via-bg-primary to-bg-primary pointer-events-none" />
      {isClient && skills.map((skill) => {
        const scale = isMobile ? 0.65 : 1;
        const diameter = skill.radius * scale * 2;
        return (
          <div
            key={skill.id}
            ref={(el) => {
              const orb = orbsRef.current.find(o => o.id === skill.id);
              if (orb) orb.element = el;
            }}
            onPointerDown={(e) => handlePointerDown(e, skill.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              width: diameter,
              height: diameter,
              backgroundColor: skill.color,
              position: "absolute",
              top: 0,
              left: 0,
              transform: `translate(-1000px, -1000px)`,
              willChange: "transform",
            }}
            className="flex flex-col items-center justify-center rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.1),0_20px_30px_rgba(0,0,0,0.5)] border border-white/10 group cursor-none touch-none select-none"
          >
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[20%] bg-white/20 rounded-full blur-[2px] transform -rotate-12 pointer-events-none" />
            <img
              src={skill.icon}
              alt={`${skill.name} logo`}
              className="w-1/2 h-1/2 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] pointer-events-none"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/50 font-heading tracking-widest uppercase pointer-events-none whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Public export ─────────────────────────────────────────────────────────────
export const TechOrbs = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <section id="arsenal" className="relative py-32 bg-bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-12 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-violet text-xs font-heading tracking-[0.3em] uppercase mb-3"
          >
            Tech Stack
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Arsenal
          </h2>
          <p className="text-text-secondary font-heading text-sm uppercase tracking-widest">
            {isMobile ? "Touch and fling to interact" : "Grab and throw to interact"}
          </p>
        </div>
      </div>

      <TechOrbsPhysics />
    </section>
  );
};
