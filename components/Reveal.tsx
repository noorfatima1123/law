"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: "div" | "li" | "section" | "article" | "ul";
  className?: string;
  delay?: number;
  id?: string;
  "data-tags"?: string;
}

/* ============================================================
   Reveal — fade + slide up when scrolled into view
   Renders a <div> by default. Pass `as` to change the tag
   (e.g. as="li", as="section").
   ============================================================ */
export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  ...rest
}: Props) {
  // Typed as "div" for the compiler; at runtime it is whatever `as` is.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      {...rest}
      className={`${className} reveal${visible ? " is-visible" : ""}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}