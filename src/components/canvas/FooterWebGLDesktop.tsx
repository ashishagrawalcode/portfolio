"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "framer-motion";

const WavePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  useThree();

  const countX = 100;
  const countZ = 72;
  const separation = 1.8;

  const positions = useMemo(() => {
    const pos = new Float32Array(countX * countZ * 3);
    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        pos[i] = ix * separation - (countX * separation) / 2;
        pos[i + 1] = 0;
        pos[i + 2] = iz * separation - (countZ * separation) / 2;
        i += 3;
      }
    }
    return pos;
  }, []);

  const globalMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const time = performance.now() * 0.001;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;
    let i = 0;
    const mouseX3D = globalMouse.current.x * 40;
    const mouseZ3D = -globalMouse.current.y * 30;
    const repelRadius = 20;
    const repelForce = 25;
    const repelRadiusSq = repelRadius * repelRadius;
    const t1 = time * 0.9;
    const t2 = time * 0.75;
    const t3 = time * 0.8;
    const sinIX = new Float32Array(countX);
    for (let ix = 0; ix < countX; ix++) sinIX[ix] = Math.sin(ix * 0.15 + t1) * 2;
    const cosIZ = new Float32Array(countZ);
    for (let iz = 0; iz < countZ; iz++) cosIZ[iz] = Math.cos(iz * 0.15 + t2) * 2;
    for (let ix = 0; ix < countX; ix++) {
      const sx = sinIX[ix];
      const cx_base = ix * 0.1;
      const x = ix * separation - (countX * separation) / 2;
      const dx = x - mouseX3D;
      for (let iz = 0; iz < countZ; iz++) {
        const z = iz * separation - (countZ * separation) / 2;
        const dz = z - mouseZ3D;
        let y = sx + cosIZ[iz] + Math.sin(cx_base + iz * 0.1 - t3) * 1.5;
        const distSq = dx * dx + dz * dz;
        if (distSq < repelRadiusSq) {
          const distance = Math.sqrt(distSq);
          const force = 1 - distance / repelRadius;
          y -= force * force * repelForce;
        }
        posArray[i + 1] = y;
        i += 3;
      }
    }
    positionAttribute.needsUpdate = true;
    const targetRotationX = (globalMouse.current.y * Math.PI) / 4;
    const targetRotationY = (globalMouse.current.x * Math.PI) / 4;
    pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.4;
    pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.4;
  });

  const circleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
      gradient.addColorStop(0.5, "rgba(139,92,246,0.4)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        color="#ffffff"
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

// This file is ONLY loaded on desktop via React.lazy — Three.js never appears in mobile bundle
export const FooterWebGLDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-bg-primary touch-none pointer-events-auto"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
      <Canvas
        frameloop={isInView ? "always" : "demand"}
        camera={{ position: [0, 10, 20], fov: 75 }}
        className="w-full h-full"
        dpr={1}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={["#06070a", 10, 50]} />
        <WavePoints />
      </Canvas>
    </div>
  );
};

export default FooterWebGLDesktop;
