"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { FluidCursor } from "@/components/ui/FluidCursor";

export const CursorWrapper = ({ children }: { children: React.ReactNode }) => {
  const mousePointer = useMousePosition();

  return (
    <>
      <FluidCursor mousePointer={mousePointer} />
      {children}
    </>
  );
};
