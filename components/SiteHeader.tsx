"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function SiteHeader({ locale, dict }: Props) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Header shrink on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile nav on route change */
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  /* Helper: build link href with locale prefix */
  const href = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean === "/" ? "" : clean}`;
  };

  /* Determine active state */
  const isActive = (path: string) => {
    const full = href(path);
    if (full === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(full);
  };

  /* Language switcher: swap /en/... to /ar/... or vice versa */
  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const switcherPath =
    pathname.replace(/^\/(en|ar)/, "") || "";
  const switcherHref = `/${otherLocale}${switcherPath}`;

  const navItems: Array<{ path: string; label: string }> = [
    { path: "/", label: dict.nav.home },
    { path: "/practice-areas", label: dict.nav.practiceAreas },
    { path: "/foreign-investors", label: dict.nav.foreignInvestors },
    { path: "/about", label: dict.nav.about },
    { path: "/faq", label: dict.nav.faq },
    { path: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className={`site-header${navOpen ? " nav-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="container-max nav-row">
        <Link
          href={href("/")}
          className="brand"
          aria-label={locale === "ar" ? "الرئيسية" : "Home"}
        >
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/emblem.png"
              width={38}
              height={38}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </span>
          <span className="brand-text">{dict.site.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="primary-nav"
          id="primaryNav"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={href(item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <Link
              className="lang-toggle-link"
              href={switcherHref}
              hrefLang={otherLocale}
              lang={otherLocale}
            >
              {dict.nav.langSwitch}
            </Link>
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-controls="primaryNav"
            aria-expanded={navOpen}
            aria-label={dict.nav.menu}
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg width="22" height="22" aria-hidden="true">
              {navOpen ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}