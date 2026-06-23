"use client";

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { initLenis, getLenis } from '../lib/lenis';

export const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = initLenis();
    setLenis(instance);

    return () => {
      // Lenis instance is global, we don't destroy it on unmount of a single hook usage
      // unless we want to reset it completely.
    };
  }, []);

  return lenis;
};
