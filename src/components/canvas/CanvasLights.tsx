import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CanvasLights = ({ mousePointer }: { mousePointer: React.MutableRefObject<{ normalizedX: number, normalizedY: number }> }) => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;

    // Move light slightly towards the mouse pointer for a dynamic highlight effect
    const targetX = mousePointer.current.normalizedX * 5;
    const targetY = mousePointer.current.normalizedY * 5;

    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.05);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={5} color="#8b5cf6" distance={20} />
    </>
  );
};
