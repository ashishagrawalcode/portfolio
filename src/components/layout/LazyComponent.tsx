"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const LazyComponent = ({ children, minHeight = "100vh" }: { children: React.ReactNode, minHeight?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "500px", once: true });
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (isInView && !hasRendered) {
      setHasRendered(true);
    }
  }, [isInView, hasRendered]);

  return (
    <div ref={ref} style={{ minHeight: hasRendered ? 'auto' : minHeight }} className="w-full relative">
      {hasRendered ? children : null}
    </div>
  );
};
