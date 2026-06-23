"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { MeshBlob } from "./MeshBlob";
import { CanvasLights } from "./CanvasLights";

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
