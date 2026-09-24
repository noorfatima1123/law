"use client";

import { useRef, useState, useEffect } from "react";
import Reveal from "./Reveal";

type FaqItem = { q: string; a: string; category?: string };

function FaqRow({ item, index, defaultOpen }: { item: FaqItem; index: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const answerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (open) {
      el.style.maxHeight = el.scrollHeight + "px";
    } else {
      el.style.maxHeight = "0px";
    }
  }, [open]);

  return (
    <Reveal
      as="div"
      className={`faq-item${open ? " is-open" : ""}`}
      delay={Math.min(index % 6, 6) * 60}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          all: "unset",
          boxSizing: "border-box",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: "18px 4px",
          fontWeight: 600,
          fontSize: 15.5,
          color: "var(--text)",
          cursor: "pointer",
        }}
      >
        {item.q}
        <svg className="faq-toggle" viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" fill="none" />
        </svg>
      </button>
      <p className="faq-a" ref={answerRef}>
        {item.a}
      </p>
    </Reveal>
  );
}

export default function FaqAccordionList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <FaqRow key={`${item.category ?? "item"}-${i}`} item={item} index={i} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
