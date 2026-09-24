"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (default 4.5) */
  maxTilt?: number;
  /** Perspective distance in px (default 900) */
  perspective?: number;
  /** Style passthrough (e.g. delay) */
  style?: CSSProperties;
}

/* ============================================================
   TiltCard — subtle 3D tilt on hover for hover-capable devices.
   - Tracks pointer inside the card, tilts up to `maxTilt` degrees
   - Resets smoothly on leave
   - Disabled entirely on touch-only devices and under
     prefers-reduced-motion
   ============================================================ */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 4.5,
  perspective = 900,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);

  /* Enable only if: hover-capable pointer AND motion not reduced */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(hoverFine.matches && !reduce.matches);
    update();

    hoverFine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      hoverFine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  /* Pointer tracking */
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (rafRef.current !== null) return; // throttle to one per frame
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0..1
      const py = (e.clientY - rect.top) / rect.height;   // 0..1
      /* Center-origin: -0.5..0.5 */
      const cx = px - 0.5;
      const cy = py - 0.5;
      /* RTL check: flip X if direction is rtl */
      const rtl = document.documentElement.dir === "rtl";
      const rx = (rtl ? -cy : cy) * maxTilt * 2; // rotateX on Y-axis of pointer
      const ry = (rtl ? -cx : cx) * maxTilt * 2; // rotateY on X-axis of pointer
      el.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    });
  };

  const handlePointerEnter = () => {
    if (!enabled) return;
    ref.current?.classList.add("tilt-active");
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.classList.remove("tilt-active");
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ ...style, perspective: `${perspective}px` }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  );
}