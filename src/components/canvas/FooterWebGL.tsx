"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const WavePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Grid parameters
  const countX = 120;
  const countZ = 80;
  const separation = 1.5;

  // Generate initial particle grid
  const positions = useMemo(() => {
    const pos = new Float32Array(countX * countZ * 3);
    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        pos[i] = ix * separation - (countX * separation) / 2; // x
        pos[i + 1] = 0; // y
        pos[i + 2] = iz * separation - (countZ * separation) / 2; // z
        i += 3;
      }
    }
    return pos;
  }, [countX, countZ, separation]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;

    let i = 0;
    
    // Convert normalized mouse coordinates (-1 to 1) to rough 3D world plane coordinates
    // With camera at z=20, fov=75, the visible width at z=0 is approx 2 * 20 * Math.tan(75/2) = ~60
    const mouseX3D = mouse.x * 40; 
    const mouseZ3D = -mouse.y * 30;
    
    // Sharper, faster repulsion physics
    const repelRadius = 15; // smaller radius for sharper effect
    const repelForce = 12; // stronger jump

    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        const x = ix * separation - (countX * separation) / 2;
        const z = iz * separation - (countZ * separation) / 2;

        // Base procedural wave (slightly faster rolling wave)
        let y =
          Math.sin((ix + time * 1.5) * 0.15) * 2 +
          Math.cos((iz + time * 1.0) * 0.15) * 2 +
          Math.sin((ix + iz - time * 2.0) * 0.1) * 1.5;

        // Interactive Mouse Repulsion (Instant/Snappy)
        const dx = x - mouseX3D;
        const dz = z - mouseZ3D;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        if (distance < repelRadius) {
          // Sharp exponential falloff
          const force = Math.pow(1 - distance / repelRadius, 3);
          y -= force * repelForce;
        }

        posArray[i + 1] = y;
        i += 3;
      }
    }
    positionAttribute.needsUpdate = true;

    // Instant parallax response (zero delay)
    const targetRotationX = (mouse.y * Math.PI) / 15;
    const targetRotationY = (mouse.x * Math.PI) / 15;
    
    pointsRef.current.rotation.x = targetRotationX;
    pointsRef.current.rotation.y = targetRotationY;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#8b5cf6" // accent-violet
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const FooterWebGL = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-bg-primary touch-none pointer-events-auto">
      {/* Dark overlay gradient to blend into the section above */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
      
      <Canvas 
        camera={{ position: [0, 10, 20], fov: 75 }}
        className="w-full h-full"
      >
        <fog attach="fog" args={["#06070a", 10, 50]} /> {/* Fade to bg-primary */}
        <WavePoints />
      </Canvas>
    </div>
  );
};
