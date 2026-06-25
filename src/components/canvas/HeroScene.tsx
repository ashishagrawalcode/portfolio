"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MousePointer {
  x: number; y: number;
  normalizedX: number; normalizedY: number;
}

interface HeroSceneProps {
  pointer?: MousePointer;
}

// ─── Smooth fBM Smoky Shader ─────────────────────────────────────────────────
const SmokyMesh = ({ pointer }: { pointer?: MousePointer }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Mouse influence maps normalised coords to world plane coords
      vec2 mouseWorld = uMouse * vec2(16.0, 10.0);
      float dist = length(pos.xy - mouseWorld);
      
      // Smooth wide influence
      float influence = smoothstep(8.0, 0.0, dist);
      
      // Fractional Brownian Motion (fBM) for fluid smoky waves
      float noise1 = snoise(pos.xy * 0.25 + uTime * 0.15);
      float noise2 = snoise(pos.xy * 0.50 - uTime * 0.20);
      float noise3 = snoise(pos.xy * 1.00 + uTime * 0.30);
      
      float elevation = noise1 * 1.5 + noise2 * 0.75 + noise3 * 0.375;
      
      // Mouse cursor "pulls" the smoke up intensely, creating a beautiful color burst
      elevation += influence * 3.5;

      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Core colors: deep background, vivid purple, and bright blue peak
      vec3 baseColor = vec3(0.03, 0.02, 0.08); // Near black/dark void
      vec3 midColor  = vec3(0.48, 0.15, 0.85); // Intense purple/violet
      vec3 peakColor = vec3(0.20, 0.50, 1.00); // Electric blue

      // Normalize elevation for color mixing
      float t = (vElevation + 2.0) / 4.5;
      
      vec3 color = mix(baseColor, midColor, smoothstep(0.0, 0.6, t));
      color = mix(color, peakColor, smoothstep(0.5, 1.1, t));

      // Fade out edges smoothly so the plane blends into the page background
      float edgeX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
      float edgeY = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      float alpha = edgeX * edgeY * 0.90;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;

    // Fast, buttery-smooth mouse follow
    if (pointer) {
      const uMouse = matRef.current.uniforms.uMouse.value as THREE.Vector2;
      uMouse.x += (pointer.normalizedX - uMouse.x) * 0.15;
      uMouse.y += (pointer.normalizedY - uMouse.y) * 0.15;
      
      // Scene Parallax: Tilt the mesh based on mouse position
      if (meshRef.current) {
        // Base X rotation is -0.4. We offset it by mouse Y.
        const targetRotX = -0.4 + pointer.normalizedY * 0.15;
        // Base Y rotation is 0. We offset by mouse X.
        const targetRotY = pointer.normalizedX * 0.20;

        meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
        meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;
      }
    }
    
    // Slow continuous rotation of the entire plane
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    // Base rotation initialized here, will be mutated in useFrame
    <mesh ref={meshRef} rotation={[-0.4, 0, 0]}>
      {/* High segment count for smooth wave displacement */}
      <planeGeometry args={[36, 24, 160, 120]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ─── Fallback for mobile ──────────────────────────────────────────────────────
const StaticFallback = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <div
      style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 70% at 50% 60%, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 45%, transparent 72%)",
      }}
    />
  </div>
);

// ─── Export ───────────────────────────────────────────────────────────────────
export default function HeroScene({ pointer }: HeroSceneProps) {
  const skipWebGL = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    skipWebGL.current = reduced || coarse;
  }, []);

  if (skipWebGL.current) return <StaticFallback />;

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio to save GPU
        performance={{ min: 0.5 }}
      >
        <SmokyMesh pointer={pointer} />
      </Canvas>
    </div>
  );
}
