import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

export const MeshBlob = ({ mousePointer }: { mousePointer: React.MutableRefObject<{ normalizedX: number, normalizedY: number }> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Slowly rotate the mesh
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    // React to mouse pointer gently
    const targetX = mousePointer.current.normalizedX * 0.5;
    const targetY = mousePointer.current.normalizedY * 0.5;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);
    
    // Animate distortion speed based on pointer proximity to center
    const dist = Math.sqrt(targetX * targetX + targetY * targetY);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, 2 + dist * 3, 0.05);
  });

  return (
    <Icosahedron ref={meshRef} args={[2.5, 12]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#8B5CF6"
        envMapIntensity={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.9}
        roughness={0.1}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.8}
      />
    </Icosahedron>
  );
};
