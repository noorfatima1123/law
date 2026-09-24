"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentProps } from "react";

type RevealLinkProps = ComponentProps<typeof Link> & {
  className?: string;
  delay?: number;
};

/**
 * Same behavior as Reveal, but for next/link specifically. A Server
 * Component can't pass `as={Link}` into a Client Component (passing a
 * component/function as a prop across that boundary isn't allowed) —
 * so this component imports Link itself instead of receiving it as a prop.
 */
export default function RevealLink({
  children,
  className = "",
  delay = 0,
  ...rest
}: RevealLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      className={`${className} reveal${visible ? " is-visible" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
