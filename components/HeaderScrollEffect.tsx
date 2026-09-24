"use client";

import { useEffect } from "react";

/**
 * Adds/removes an `is-scrolled` class on the header once the page scrolls
 * past a small threshold, so the header can shrink slightly via CSS.
 *
 * Assumption: SiteHeader renders its root element with id="siteHeader"
 * (this matched the previous static build). If your SiteHeader uses a
 * different id, change SELECTOR below to match.
 */
const SELECTOR = "#siteHeader";

export default function HeaderScrollEffect() {
  useEffect(() => {
    const header = document.querySelector(SELECTOR);
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
