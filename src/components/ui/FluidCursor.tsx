"use client";

import { useEffect, useRef } from "react";

export const FluidCursor = ({ mousePointer }: { mousePointer: React.MutableRefObject<{ x: number, y: number }> }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let cursorX = 0;
    let cursorY = 0;
    let glowX = 0;
    let glowY = 0;

    const render = () => {
      const targetX = mousePointer.current.x;
      const targetY = mousePointer.current.y;

      // Sharp cursor perfectly syncs with mouse for instant feel
      cursorX = targetX;
      cursorY = targetY;

      // Glow follows more lazily
      glowX += (targetX - glowX) * 0.06;
      glowY += (targetY - glowY) * 0.06;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(-15deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePointer]);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden sm:block fixed top-0 left-0 w-5 h-5 bg-white mix-blend-difference pointer-events-none z-[100]"
        style={{
          borderRadius: "0 50% 50% 50%",
          boxShadow: "0 0 20px rgba(255,255,255,0.4)"
        }}
      />
      <div
        ref={glowRef}
        className="hidden sm:block fixed top-0 left-0 w-64 h-64 bg-accent-violet rounded-full pointer-events-none z-[90] opacity-15 blur-[80px]"
      />
      <style dangerouslySetInnerHTML={{ __html: `@media (pointer: fine) { * { cursor: none !important; } html, body { cursor: none !important; } }` }} />
    </>
  );
};
