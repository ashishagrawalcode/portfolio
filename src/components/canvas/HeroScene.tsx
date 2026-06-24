"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { MeshBlob } from "./MeshBlob";
import { CanvasLights } from "./CanvasLights";
import { motion } from "framer-motion";

interface HeroSceneProps {
  mousePointer: React.MutableRefObject<{
    normalizedX: number;
    normalizedY: number;
  }>;
}

/** Forces the demand-mode Canvas to keep rendering while mounted. */
function Invalidator() {
  useFrame(({ invalidate }) => invalidate());
  return null;
}

export const HeroScene = ({ mousePointer }: HeroSceneProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Setup listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) return null;

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 flex items-center justify-center overflow-hidden">
        {/* CSS Fallback for Mobile: A glowing animated blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-[150vw] h-[150vw] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <CanvasLights mousePointer={mousePointer} />
        <MeshBlob mousePointer={mousePointer} />

        <Environment preset="city" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.3} mipmapBlur intensity={1} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <Invalidator />
      </Canvas>
    </div>
  );
};
