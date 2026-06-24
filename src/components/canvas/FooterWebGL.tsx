"use client";

import { lazy, Suspense, useEffect, useState } from "react";

// ─── Static CSS fallback for mobile — ZERO JS cost ─────────────────────────────
const FooterMobileGlow = () => (
  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-bg-primary">
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(139,92,246,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
      }}
    />
    <div
      className="absolute bottom-0 left-0 w-full h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)",
      }}
    />
  </div>
);

// React.lazy ensures FooterWebGLDesktop.tsx (+ Three.js) is NEVER downloaded
// on mobile — it only loads when a pointer:fine (mouse) device is detected.
const FooterWebGLDesktopLazy = lazy(() =>
  import("./FooterWebGLDesktop").then((m) => ({ default: m.FooterWebGLDesktop }))
);

// ─── Public export ─────────────────────────────────────────────────────────────
export const FooterWebGL = () => {
  // SSR-safe default: assume mobile until client hydrates
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // (pointer: coarse) = touchscreen, (pointer: fine) = mouse/desktop
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) return <FooterMobileGlow />;

  return (
    <Suspense fallback={<FooterMobileGlow />}>
      <FooterWebGLDesktopLazy />
    </Suspense>
  );
};
