"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const match = value.match(/(\d+)/);
    if (reduceMotion || !match || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          io.unobserve(entry.target);

          const target = parseInt(match[1], 10);
          const prefix = value.slice(0, match.index);
          const suffix = value.slice((match.index ?? 0) + match[1].length);
          const duration = 900;
          let start: number | null = null;

          const step = (ts: number) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(value);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className={`pillar-stat reveal${visible ? " is-visible" : ""}`}>
      <span className="num" ref={ref}>
        {display}
      </span>
      <span className="label">{label}</span>
    </div>
  );
}
