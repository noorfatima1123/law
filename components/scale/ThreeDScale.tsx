"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/models/weighing-scale-puzzle-plinth.glb";

function ScaleModel({ reduceMotion }: { reduceMotion: boolean }) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const { scene, height, width } = useMemo(() => {
    const s = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    /* Re-center — X/Z to center, Y so base sits at y=0 */
    s.position.x -= center.x;
    s.position.z -= center.z;
    s.position.y -= box.min.y;

    s.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    return {
      scene: s,
      height: size.y,
      width: size.x,
    };
  }, [gltf]);

  /* Play "tilt" animation as slow ping-pong */
  useEffect(() => {
    if (!gltf.animations?.length) return;
    const mixer = new THREE.AnimationMixer(scene);
    const clip =
      THREE.AnimationClip.findByName(gltf.animations, "tilt") ??
      gltf.animations[0];
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopPingPong, Infinity);
    action.timeScale = 0.35;
    action.play();
    mixerRef.current = mixer;
    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf, scene]);

  useFrame((_, delta) => {
    if (!reduceMotion) {
      mixerRef.current?.update(Math.min(delta, 0.05));
      if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
    }
  });

  /* Keep model at natural size — camera handles framing */
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

/* Fallback if model fails to load */
function ScaleFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.8, 1.2, 0.5]} />
      <meshStandardMaterial color="#A9812E" wireframe />
    </mesh>
  );
}

/* Dynamic camera framing based on actual model height */
function CameraSetup({ targetHeight }: { targetHeight: number }) {
  const { camera } = require("@react-three/fiber").useThree?.() ?? {};
  return null;
}

export default function ThreeDScale() {
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
      /* Camera pulled back and raised to frame the full 1.26m model */
      camera={{ position: [0, 0.8, 3.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#FFFDF5", "#3A2F22", 0.4]} />

      {/* Warm key light — upper-left */}
      <directionalLight
        position={[-2.5, 3, 3]}
        intensity={1.2}
        color="#FFFAEE"
      />
      {/* Cool fill — lower-right */}
      <directionalLight
        position={[2, -0.5, 2]}
        intensity={0.35}
        color="#D8E4F0"
      />
      {/* Rim light behind */}
      <directionalLight
        position={[0, 2.5, -2]}
        intensity={0.5}
        color="#FFFFFF"
      />

      {/* Model — with fallback if GLB fails */}
      <Suspense fallback={<ScaleFallback />}>
        <ScaleModel reduceMotion={reduceMotion} />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.18}
          luminanceThreshold={0.92}
          luminanceSmoothing={0.3}
          mipmapBlur
          radius={0.3}
        />
        <Vignette eskil={false} offset={0.4} darkness={0.12} />
      </EffectComposer>
    </Canvas>
  );
}