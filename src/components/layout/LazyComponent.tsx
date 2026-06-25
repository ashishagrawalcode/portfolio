"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const LazyComponent = ({ children, minHeight = "100vh", id }: { children: React.ReactNode, minHeight?: string, id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "500px", once: true });
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (isInView && !hasRendered) {
      setHasRendered(true);
    }
  }, [isInView, hasRendered]);

  return (
    <div id={id} ref={ref} style={{ minHeight: hasRendered ? 'auto' : minHeight }} className="w-full relative">
      {hasRendered ? children : null}
    </div>
  );
};
