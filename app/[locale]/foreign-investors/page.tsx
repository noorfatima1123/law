import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";

const ICON_MAP: Record<string, string> = {
  globe: "#ic-globe",
  formation: "#ic-formation",
  clock: "#ic-clock",
  "scale-small": "#ic-scale-small",
  contract: "#ic-contract",
  consult: "#ic-consult",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") return {};
  return buildPageMetadata({
    locale,
    path: "/foreign-investors",
    title: {
      en: "Foreign Investor Services",
      ar: "خدمات المستثمرين الأجانب",
    },
    description: {
      en: "Legal support for foreign investors entering the Saudi market: company formation, licensing, contracts, and market-entry guidance in Jeddah.",
      ar: "دعم قانوني للمستثمرين الأجانب الراغبين في دخول السوق السعودي: تأسيس الشركات، التراخيص، العقود، وإرشادات دخول السوق.",
    },
  });
}

export default async function ForeignInvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  const dict = getDictionary(locale as Locale);
  const href = (path: string) => `/${locale}${path}`;

  return (
    <>
      <IconSprite />

      <div className="subpage-hero">
        <div className="container-max">
          <h1>{dict.foreignInvestors.title}</h1>
          <p>{dict.foreignInvestors.subtitle}</p>
          <svg aria-hidden="true" className="hero-swoosh" viewBox="0 0 150 16">
            <path
              d="M4 4c30 0 30 9 60 9s30-9 60-9"
              fill="none"
              stroke="#A9812E"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* TIMELINE BADGE */}
      <div className="fi-badge-strip">
        <div className="container-max">
          <div className="fi-badge">
            <svg
              className="fi-badge-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            <span className="fi-badge-label">
              {dict.foreignInvestors.timelineBadgeLabel}
            </span>
            <span className="fi-badge-value">
              {dict.foreignInvestors.timelineBadgeValue}
            </span>
          </div>
        </div>
      </div>

      <div className="section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className="emblem-watermark"
          height={340}
          src="/emblem.png"
          width={340}
          style={{ top: -40, insetInlineStart: -60 }}
        />
        <div className="container-max">
          {/* FAQ ACCORDION — 9 entries */}
          <div className="faq-list">
            {dict.foreignInvestors.qas.map((qa, i) => (
              <details className="faq-item" key={i} open={i === 0}>
                <summary>
                  <span className="fi-faq-summary">
                    <svg
                      className="fi-faq-icon"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <use href={ICON_MAP[qa.icon] || "#ic-consult"} />
                    </svg>
                    <span>{qa.q}</span>
                  </span>
                  <svg
                    className="faq-toggle"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </summary>
                <p className="faq-a">{qa.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="section section-alt">
        <div className="container-max">
          <div className="about-block" style={{ textAlign: "center" }}>
            <h2>{dict.foreignInvestors.ctaTitle}</h2>
            <p style={{ marginInline: "auto" }}>
              {dict.foreignInvestors.ctaBody}
            </p>
            <div style={{ marginTop: 22 }}>
              <Link
                className="btn btn-primary"
                href={`${href("/contact")}?topic=foreign-investment`}
              >
                {dict.foreignInvestors.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}