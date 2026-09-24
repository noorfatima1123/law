"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;    // path to image
  alt: string;
}

interface Props {
  locale: Locale;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  headingLine4: string;
  members: [TeamMember, TeamMember];
}

export default function TeamEditorial({
  locale,
  headingLine1,
  headingLine2,
  headingLine3,
  headingLine4,
  members,
}: Props) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  /* Scroll-trigger reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Mouse parallax — subtle depth */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x, y });
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`team-editorial${visible ? " is-visible" : ""}${
        isAr ? " is-rtl" : ""
      }`}
    >
      {/* Big editorial text */}
      <div className="team-editorial-text" aria-hidden="true">
        <span className="te-line te-line-1">{headingLine1}</span>
        <span className="te-line te-line-2">{headingLine2}</span>
        <span className="te-line te-line-3">{headingLine3}</span>
        <span className="te-line te-line-4">{headingLine4}</span>
      </div>

      {/* Avatars — overlapping the text */}
      <div className="team-editorial-avatars">
        <div
          className="te-avatar te-avatar-1"
          style={{
            transform: `translate(${pointer.x * 8}px, ${pointer.y * 8}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={members[0].avatar} alt={members[0].alt} />
          <div className="te-avatar-label">
            <span className="te-avatar-name">{members[0].name}</span>
            <span className="te-avatar-role">{members[0].role}</span>
          </div>
        </div>

        <div
          className="te-avatar te-avatar-2"
          style={{
            transform: `translate(${pointer.x * -8}px, ${pointer.y * -8}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={members[1].avatar} alt={members[1].alt} />
          <div className="te-avatar-label">
            <span className="te-avatar-name">{members[1].name}</span>
            <span className="te-avatar-role">{members[1].role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}