import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import IconSprite from "@/components/IconSprite";
import Reveal from "@/components/Reveal";

const ICON_MAP: Record<string, string> = {
  globe: "#ic-globe",
  formation: "#ic-formation",
  clock: "#ic-clock",
  "scale-small": "#ic-scale-small",
  contract: "#ic-contract",
  consult: "#ic-consult",
};

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
          <svg
            aria-hidden="true"
            className="hero-swoosh"
            viewBox="0 0 150 16"
          >
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
          <div className="practice-detail-list">
            {dict.foreignInvestors.qas.map((qa, i) => (
              <Reveal
                as="div"
                className="practice-detail"
                key={i}
                delay={Math.min(i % 6, 6) * 60}
              >
                <div className="practice-detail-icon">
                  <svg width={26} height={26}>
                    <use href={ICON_MAP[qa.icon] || "#ic-consult"} />
                  </svg>
                </div>
                <div>
                  <span className="practice-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{qa.q}</h3>
                  <p>{qa.a}</p>
                </div>
              </Reveal>
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
