"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeDScale = dynamic(() => import("./ThreeDScale"), {
  ssr: false,
  loading: () => <ScaleSkeleton />,
});

function ScaleSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #FBF8F0 0%, #E6DEC8 100%)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
      }}
    >
      <span style={{ color: "var(--color-stone)", fontSize: 13 }}>
        Loading…
      </span>
    </div>
  );
}

export default function JusticeScale() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      setWebgl(!!gl);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (webgl === null) return <ScaleSkeleton />;
  if (webgl === false) return <ScaleSkeleton />;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 480,
        position: "relative",
      }}
    >
      <ThreeDScale />
    </div>
  );
}