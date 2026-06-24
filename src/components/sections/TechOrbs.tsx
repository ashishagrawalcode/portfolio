"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  { id: "nextjs", name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white", color: "rgba(255,255,255,0.1)", radius: 60 },
  { id: "react", name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "rgba(97,218,251,0.15)", radius: 50 },
  { id: "typescript", name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "rgba(49,120,198,0.15)", radius: 55 },
  { id: "tailwind", name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "rgba(6,182,212,0.15)", radius: 45 },
  { id: "prisma", name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white", color: "rgba(255,255,255,0.1)", radius: 48 },
  { id: "postgresql", name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "rgba(65,105,225,0.15)", radius: 50 },
  { id: "figma", name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", color: "rgba(242,78,30,0.15)", radius: 45 },
  { id: "nodejs", name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "rgba(51,153,51,0.15)", radius: 50 },
  { id: "canva", name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", color: "rgba(0,196,204,0.15)", radius: 40 },
  { id: "neon", name: "Neon", icon: "https://cdn.simpleicons.org/neon/00E599", color: "rgba(0,229,153,0.15)", radius: 45 },
  { id: "vercel", name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white", color: "rgba(255,255,255,0.1)", radius: 50 },
  { id: "drizzle", name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle/C5F74F", color: "rgba(197,247,79,0.15)", radius: 45 },
  { id: "html", name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "rgba(227,79,38,0.15)", radius: 40 },
  { id: "css", name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "rgba(21,114,182,0.15)", radius: 40 },
  { id: "js", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "rgba(247,223,30,0.15)", radius: 40 },
  { id: "render", name: "Render", icon: "https://cdn.simpleicons.org/render/white", color: "rgba(255,255,255,0.15)", radius: 45 },
];

export const TechOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics State
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

  // Drag interaction state
  const dragState = useRef({
    activeId: null as string | null,
    lastMouseX: 0,
    lastMouseY: 0,
    lastTime: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    // Initialize physics bodies
    if (orbsRef.current.length === 0) {
      orbsRef.current = skills.map((skill, index) => {
        const actualRadius = isMobile ? skill.radius * 0.7 : skill.radius;
        // Start in center with slight spread
        const x = width / 2 + (Math.random() - 0.5) * 100;
        const y = height / 2 + (Math.random() - 0.5) * 100;
        
        // Initial gentle explosion
        const angle = (index / skills.length) * Math.PI * 2;
        const speed = Math.random() * 5 + 5;
        
        return {
          id: skill.id,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: actualRadius,
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
      const friction = 0.99; // Air resistance
      const restitution = 0.8; // Bounciness

      // 1. Move Orbs & Apply Friction
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (orb.isDragging) continue;

        orb.x += orb.vx;
        orb.y += orb.vy;
        
        orb.vx *= friction;
        orb.vy *= friction;

        // Wall Collisions
        if (orb.x - orb.radius < 0) {
          orb.x = orb.radius;
          orb.vx *= -restitution;
        } else if (orb.x + orb.radius > w) {
          orb.x = w - orb.radius;
          orb.vx *= -restitution;
        }

        if (orb.y - orb.radius < 0) {
          orb.y = orb.radius;
          orb.vy *= -restitution;
        } else if (orb.y + orb.radius > h) {
          orb.y = h - orb.radius;
          orb.vy *= -restitution;
        }
      }

      // 2. Rigid-Body Collisions (Circle-Circle)
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const o1 = orbs[i];
          const o2 = orbs[j];

          const dx = o2.x - o1.x;
          const dy = o2.y - o1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = o1.radius + o2.radius;

          if (dist < minDist && dist > 0) {
            // Overlap resolution (push apart)
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Move each away by half the overlap, unless one is being dragged
            if (!o1.isDragging && !o2.isDragging) {
              o1.x -= nx * (overlap / 2);
              o1.y -= ny * (overlap / 2);
              o2.x += nx * (overlap / 2);
              o2.y += ny * (overlap / 2);
            } else if (o1.isDragging) {
              o2.x += nx * overlap;
              o2.y += ny * overlap;
            } else if (o2.isDragging) {
              o1.x -= nx * overlap;
              o1.y -= ny * overlap;
            }

            // Elastic Velocity Exchange (1D along normal)
            const dvx = o1.vx - o2.vx;
            const dvy = o1.vy - o2.vy;
            const velocityAlongNormal = dvx * nx + dvy * ny;

            // If moving towards each other
            if (velocityAlongNormal > 0) {
              const impulse = (1 + restitution) * velocityAlongNormal / 2;
              
              if (!o1.isDragging) {
                o1.vx -= impulse * nx;
                o1.vy -= impulse * ny;
              }
              if (!o2.isDragging) {
                o2.vx += impulse * nx;
                o2.vy += impulse * ny;
              }
            }
          }
        }
      }

      // 3. Sync DOM
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (orb.element) {
          orb.element.style.transform = `translate(${orb.x - orb.radius}px, ${orb.y - orb.radius}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    const orb = orbsRef.current.find(o => o.id === id);
    if (!orb) return;

    orb.isDragging = true;
    dragState.current.activeId = id;
    dragState.current.lastMouseX = e.clientX;
    dragState.current.lastMouseY = e.clientY;
    dragState.current.lastTime = performance.now();
    
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { activeId } = dragState.current;
    if (!activeId) return;

    const orb = orbsRef.current.find(o => o.id === activeId);
    if (!orb) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Direct movement to mouse position relative to container
    orb.x = e.clientX - containerRect.left;
    orb.y = e.clientY - containerRect.top;

    // Track velocity
    const now = performance.now();
    const dt = now - dragState.current.lastTime;
    if (dt > 0) {
      orb.vx = (e.clientX - dragState.current.lastMouseX) * (16 / dt) * 0.5; // Scale to ~60fps
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
      
      // Cap throw velocity to prevent insane speeds
      orb.vx = Math.max(-40, Math.min(40, orb.vx));
      orb.vy = Math.max(-40, Math.min(40, orb.vy));
    }

    dragState.current.activeId = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
            Grab and throw to interact
          </p>
        </div>
      </div>

      {/* Physics Container boundary */}
      <div 
        ref={containerRef} 
        className="relative w-full max-w-[1200px] mx-auto h-[60vh] md:h-[70vh] border border-white/5 rounded-[3rem] bg-bg-secondary/30 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] touch-none"
      >
        {/* Deep ambient background glow inside the container */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-violet/5 via-bg-primary to-bg-primary pointer-events-none" />

        {/* 3D Glass Spheres controlled by Custom Physics Engine */}
        {skills.map((skill) => {
          const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
          const diameter = isMobile ? skill.radius * 0.7 * 2 : skill.radius * 2;

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
                // Initial hide to prevent flash
                transform: `translate(-1000px, -1000px)`,
                willChange: "transform"
              }}
              className="flex flex-col items-center justify-center rounded-full backdrop-blur-md shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.1),0_20px_30px_rgba(0,0,0,0.5)] border border-white/10 group cursor-none touch-none select-none"
            >
              {/* Internal Glass Highlight */}
              <div className="absolute top-[10%] left-[20%] w-[30%] h-[20%] bg-white/20 rounded-full blur-[2px] transform -rotate-12 pointer-events-none" />
              
              {/* Tech SVG Logo */}
              <img 
                src={skill.icon} 
                alt={`${skill.name} logo`} 
                className="w-1/2 h-1/2 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] pointer-events-none"
                draggable={false}
              />
              
              {/* Label */}
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-xs text-white/50 font-heading tracking-widest uppercase pointer-events-none whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
