"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface Member {
  name: string;
  role: string;
  avatar: string;
  alt: string;
  slug: string;   // NEW — for linking to detail page
}

interface Props {
  locale: Locale;
  members: Member[];
}

const CONFIG = [
  { stack: { x: 50, y: 50, rot: -6 }, row: { x: 30, y: 50, rot: 0 } },
  { stack: { x: 50, y: 50, rot: 5 }, row: { x: 70, y: 50, rot: 0 } },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function TeamStackReveal({ locale, members }: Props) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const traversed = viewportH - rect.top;
      const raw = Math.max(0, Math.min(1, traversed / total));
      const compressed = Math.max(0, Math.min(1, (raw - 0.15) / 0.2));
      setProgress(compressed);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const eased = easeInOutCubic(progress);
  const mirrorX = (x: number) => (isAr ? 100 - x : x);

  return (
    <div
      ref={containerRef}
      className="team-stack"
      style={{
        position: "relative",
        width: "100%",
        height: "360px",
        margin: "40px auto 0",
        maxWidth: 900,
      }}
    >
      {members.map((member, i) => {
        const cfg = CONFIG[i] ?? CONFIG[CONFIG.length - 1];

        const x = mirrorX(cfg.stack.x + (cfg.row.x - cfg.stack.x) * eased);
        const y = cfg.stack.y + (cfg.row.y - cfg.stack.y) * eased;
        const rot = cfg.stack.rot + (cfg.row.rot - cfg.stack.rot) * eased;
        const zIndex = i === 0 ? 1 : 2;
        const detailHref = `/${locale}/team/${member.slug}`;

        return (
          <Link
            key={i}
            href={detailHref}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              zIndex,
              width: "clamp(160px, 22vw, 220px)",
              willChange: "transform, left, top",
              textDecoration: "none",
              display: "block",
              cursor: "pointer",
            }}
          >
            <div
              className="team-stack-card"
              style={{
                textAlign: "center",
                transition: "transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.avatar}
                alt={member.alt}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "50%",
                  background: "var(--color-parchment-2)",
                  border: "2px solid var(--color-brass-soft)",
                  boxShadow:
                    "0 12px 30px -12px rgba(18,35,63,0.25), 0 4px 12px -4px rgba(18,35,63,0.12)",
                  display: "block",
                  transition:
                    "transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1), border-color 0.35s, box-shadow 0.35s",
                }}
              />
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "var(--font-heading), serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--color-ink-navy)",
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-stone)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  marginTop: 3,
                }}
              >
                {member.role}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}