"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const WavePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Grid parameters - Balanced for performance and visual density (7200 vertices)
  const countX = 100;
  const countZ = 72;
  const separation = 1.8;

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

  // Track global mouse position since the canvas is behind other elements
  const globalMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    // Use performance.now() to avoid THREE.Clock deprecation warnings
    const time = performance.now() * 0.001;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;

    let i = 0;
    
    // Convert normalized global mouse coordinates to rough 3D world plane coordinates
    const mouseX3D = globalMouse.current.x * 40; 
    const mouseZ3D = -globalMouse.current.y * 30;
    
    // Sharper, faster repulsion physics
    const repelRadius = 20; 
    const repelForce = 25; 
    const repelRadiusSq = repelRadius * repelRadius; // Precalculate squared radius

    // Precalculate wave components to drastically reduce Math.sin/Math.cos calls
    const t1 = time * 0.9; // time * 6.0 * 0.15
    const t2 = time * 0.75; // time * 5.0 * 0.15
    const t3 = time * 0.8; // time * 8.0 * 0.1
    
    const sinIX = new Float32Array(countX);
    for (let ix = 0; ix < countX; ix++) {
      sinIX[ix] = Math.sin(ix * 0.15 + t1) * 2;
    }
    
    const cosIZ = new Float32Array(countZ);
    for (let iz = 0; iz < countZ; iz++) {
      cosIZ[iz] = Math.cos(iz * 0.15 + t2) * 2;
    }

    for (let ix = 0; ix < countX; ix++) {
      const sx = sinIX[ix];
      const cx_base = ix * 0.1;
      const x = ix * separation - (countX * separation) / 2;
      const dx = x - mouseX3D;

      for (let iz = 0; iz < countZ; iz++) {
        const z = iz * separation - (countZ * separation) / 2;
        const dz = z - mouseZ3D;

        // Base procedural wave utilizing precalculated 1D arrays
        let y = sx + cosIZ[iz] + Math.sin(cx_base + iz * 0.1 - t3) * 1.5;

        // Interactive Mouse Repulsion (Optimized using Squared Distance)
        const distSq = dx * dx + dz * dz;
        
        if (distSq < repelRadiusSq) {
          const distance = Math.sqrt(distSq); // Only calc sqrt if within bounding box
          const force = 1 - distance / repelRadius;
          y -= force * force * repelForce;
        }

        posArray[i + 1] = y;
        i += 3;
      }
    }
    positionAttribute.needsUpdate = true;

    // Extreme parallax response for fast tracking using global mouse
    const targetRotationX = (globalMouse.current.y * Math.PI) / 4;
    const targetRotationY = (globalMouse.current.x * Math.PI) / 4;
    
    // Lerp it slightly for smoothness but keep it ultra-fast
    pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.4;
    pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.4;
  });

  // Generate a glowing circle texture for the points
  const circleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (context) {
      // Draw a soft glowing circle
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.4)"); // accent-violet glow
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4} // Slightly larger for better visibility
        color="#ffffff" // Base color is white, glow comes from texture
        map={circleTexture}
        transparent
        opacity={0.9}
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
        dpr={1}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={["#06070a", 10, 50]} /> {/* Fade to bg-primary */}
        <WavePoints />
      </Canvas>
    </div>
  );
};
