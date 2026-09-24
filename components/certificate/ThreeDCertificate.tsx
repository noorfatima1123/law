"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { makeCertificateTexture } from "./makeCertificateTexture";

interface Props {
  text: {
    title: string;
    subtitle: string;
    recipient: string;
    bodyLines: string[];
    footerLines: string[];
    signatureLeft: string;
    signatureRight: string;
    sealText: string;
  };
}

interface PlaneProps extends Props {
  reduceMotion: boolean;
}

/* Plane dimensions — landscape A4 aspect (1.414 : 1) */
const PLANE_H = 2.4;
const PLANE_W = 2.4 * 1.414; // ≈ 3.39
const TAU = Math.PI * 2;

function CertificatePlane({ text, reduceMotion }: PlaneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const rimRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const [hovered, setHovered] = useState(false);
  const dragState = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return makeCertificateTexture(text);
  }, [text]);

  /* Bend the paper: apply vertex displacement so it looks like real paper */
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 40, 56);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const x = v.x / PLANE_W; // -0.5 .. 0.5
      const y = v.y / PLANE_H; // -0.5 .. 0.5

      /* Gentle curve: paper bows forward at center, back at edges */
      const bow = Math.cos(x * Math.PI) * Math.cos(y * Math.PI * 0.8) * 0.08;
      /* Slight random waviness for paper feel */
      const wave =
        Math.sin(x * 6.2) * 0.008 +
        Math.cos(y * 4.8) * 0.006 +
        Math.sin((x + y) * 8) * 0.004;

      pos.setZ(i, bow + wave);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  /* Release on window */
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onUp = () => {
      if (dragState.current.isDragging) {
        dragState.current.isDragging = false;
        if (typeof document !== "undefined") {
          document.body.style.cursor = "";
        }
      }
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const ds = dragState.current;
    const dt = Math.min(delta, 0.05);

    if (ds.isDragging) {
      /* Direct manipulation: always 1:1 responsive, even with reduced motion —
         this is the user driving it, not an ambient animation. */
      const targetY = pointer.x * 0.9;
      const targetX = -pointer.y * 0.55;
      const followSpeed = reduceMotion ? 1 : 0.18;
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, followSpeed);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, followSpeed);
    } else if (reduceMotion) {
      /* No inertial coasting and no idle drift — settle immediately to the
         nearest fully-turned orientation instead of animating toward it. */
      g.rotation.y = Math.round(g.rotation.y / TAU) * TAU;
      g.rotation.x = 0;
      ds.velocityX = 0;
      ds.velocityY = 0;
    } else {
      ds.velocityX *= 0.93;
      ds.velocityY *= 0.93;
      g.rotation.y += ds.velocityX * dt * 60;
      g.rotation.x += ds.velocityY * dt * 60;

      if (Math.abs(ds.velocityX) < 0.001 && Math.abs(ds.velocityY) < 0.001) {
        /* Nearest-turn settling: after a flick can carry rotation.y through
           several full turns, settle toward the closest multiple of 2π
           rather than literal 0 — otherwise it visibly unwinds backwards
           through every turn it just spun. */
        const nearestY = Math.round(g.rotation.y / TAU) * TAU;
        g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, nearestY, 0.04);
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0, 0.04);
      }

      if (hovered) {
        g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.12, 0.05);
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.06, 0.05);
      }

      g.rotation.x = THREE.MathUtils.clamp(g.rotation.x, -0.5, 0.5);
    }

    /* Hover lift — kept small so the plate never grows past the visible frame */
    const targetZ = hovered ? 0.06 : 0;
    const targetScale = hovered ? 1.015 : 1;
    const liftSpeed = reduceMotion ? 1 : 0.1;
    g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, liftSpeed);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, liftSpeed));

    /* Material glow */
    if (materialRef.current) {
      const glowSpeed = reduceMotion ? 1 : 0.12;
      const targetEmissive = hovered ? 0.28 : 0.0;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        glowSpeed
      );
      const targetMetal = hovered ? 0.16 : 0.02;
      materialRef.current.metalness = THREE.MathUtils.lerp(
        materialRef.current.metalness,
        targetMetal,
        glowSpeed
      );
    }

    /* Rim glow ring */
    if (rimRef.current) {
      const mat = rimRef.current.material as THREE.MeshBasicMaterial;
      const rimSpeed = reduceMotion ? 1 : 0.12;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, hovered ? 0.5 : 0, rimSpeed);
    }
  });

  const onPointerDown = (e: any) => {
    e.stopPropagation();
    if (typeof document !== "undefined") document.body.style.cursor = "grabbing";
    dragState.current.isDragging = true;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    dragState.current.velocityX = 0;
    dragState.current.velocityY = 0;
  };

  const onPointerMove = (e: any) => {
    const ds = dragState.current;
    if (!ds.isDragging) return;
    const dx = e.clientX - ds.lastX;
    const dy = e.clientY - ds.lastY;
    ds.lastX = e.clientX;
    ds.lastY = e.clientY;
    ds.velocityX = dx * 0.0015;
    ds.velocityY = dy * 0.0015;
  };

  if (!texture) return null;

  return (
    <group ref={groupRef}>
      {/* Warm halo behind paper */}
      <mesh ref={rimRef} position={[0, 0, -0.15]}>
        <planeGeometry args={[PLANE_W + 0.6, PLANE_H + 0.6]} />
        <meshBasicMaterial
          color="#D8BE84"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main certificate */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (typeof document !== "undefined") document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (typeof document !== "undefined" && !dragState.current.isDragging)
            document.body.style.cursor = "";
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        {/* meshPhysicalMaterial (not Standard) so the plate reads as a thin,
            faintly translucent sheet — light glancing through at the edges —
            rather than an opaque, printer-flat card. Kept subtle: high
            roughness so it stays a matte paper stock, not glass. */}
        <meshPhysicalMaterial
          ref={materialRef}
          map={texture}
          roughness={0.85}
          metalness={0.02}
          emissive="#D8BE84"
          emissiveIntensity={0}
          transmission={0.06}
          thickness={0.04}
          ior={1.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight
        position={[0, 0, 1.2]}
        intensity={hovered ? 2.0 : 0.35}
        color="#D8BE84"
        distance={5}
      />
    </group>
  );
}

export default function ThreeDCertificate({ text }: Props) {
  /* Reactive to OS-level changes, not just the value at mount. */
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.0], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
      frameloop="always"
    >
      {/* Warm ambient */}
      <ambientLight intensity={0.65} />

      {/* Soft sky/ground ambient — a lightweight stand-in for a full
          procedural environment map, without pulling in a new dependency. */}
      <hemisphereLight args={["#FFFDF5", "#3A2F22", 0.35]} />

      {/* Key light — upper-left, warm */}
      <directionalLight
        position={[-2.5, 2.5, 3]}
        intensity={1.0}
        color="#FFFAEE"
      />

      {/* Cool fill — lower-right */}
      <directionalLight
        position={[2, -1.5, 2]}
        intensity={0.35}
        color="#D8E4F0"
      />

      {/* Top rim light for paper edges */}
      <directionalLight
        position={[0, 3, 2]}
        intensity={0.3}
        color="#FFFFFF"
      />

      <CertificatePlane text={text} reduceMotion={reduceMotion} />

      <EffectComposer>
        <Bloom
          intensity={0.25}
          luminanceThreshold={0.88}
          luminanceSmoothing={0.3}
          mipmapBlur
          radius={0.4}
        />
        <Vignette eskil={false} offset={0.35} darkness={0.15} />
      </EffectComposer>
    </Canvas>
  );
}