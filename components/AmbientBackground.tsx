"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================
   AmbientBackground — subtle floating particles behind content
   ============================================================ */

const PARTICLE_COUNT = 60;
const BOUNDS = 4;

export default function AmbientBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * BOUNDS * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;
      sz[i] = Math.random() * 0.02 + 0.005;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#A9812E"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}