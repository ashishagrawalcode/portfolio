"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks mouse position using a ref instead of state to avoid
 * triggering React re-renders on every single mouse move.
 * Ideal for Canvas or highly fluid animations (like cursors)
 * that read from the ref in their own requestAnimationFrame loop.
 */
export const useMousePosition = () => {
  const mouse = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
};
