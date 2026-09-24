import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";
import StatCounter from "@/components/StatCounter";
import CertificateCard from "@/components/certificate/CertificateCard";
import JusticeScale from "@/components/scale/JusticeScale";
import TeamStackReveal from "@/components/team/TeamStackReveal";
import TrustSignals from "@/components/TrustSignals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") return {};
  return buildPageMetadata({
    locale,
    path: "/about",
    title: { en: "About the Firm", ar: "عن الشركة" },
    description: {
      en: "Jeddah law firm established 1991. Member of the Saudi Bar Association. Bilingual practice serving individuals, families, and businesses across Saudi Arabia.",
      ar: "مكتب محاماة في جدة تأسس عام 1991، عضو في الهيئة السعودية للمحامين. ثلاثة عقود من الممارسة القانونية.",
    },
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  const dict = getDictionary(locale as Locale);
  const isAr = locale === "ar";

  return (
    <>
      <IconSprite />

      <div className="subpage-hero">
        <div className="container-max">
          <h1>{dict.about.title}</h1>
          <p>{dict.about.subtitle}</p>
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

      <div className="section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          className="emblem-watermark"
          height={340}
          src="/emblem.png"
          width={340}
          style={{ top: -40, insetInlineEnd: -60 }}
        />

        <div className="container-max">
          {/* HISTORY + SCALE */}
          <div className="about-split">
            <div className="about-split-visual">
              <JusticeScale />
            </div>

            <div className="about-split-text">
              <h2>{dict.about.historyTitle}</h2>
              <p>{dict.about.historyBody1}</p>
              <p>{dict.about.historyBody2}</p>
              <p>{dict.about.historyBody3}</p>
            </div>
          </div>

          {/* TEAM — Scroll-driven stack reveal */}
          <div style={{ marginTop: 60 }}>
            <h2 style={{ marginBottom: 12 }}>{dict.about.teamTitle}</h2>
            <p style={{ color: "var(--text-soft)", marginBottom: 0 }}>
              {dict.about.teamSubtitle}
            </p>

            <TeamStackReveal
              locale={locale as Locale}
              members={dict.about.teamMembers.map((m) => ({
                name: m.name,
                role: m.role,
                avatar: m.avatar,
                alt: m.name,
                slug: m.slug,
              }))}
            />
          </div>

          {/* TRUST SIGNALS — 8-item grid */}
          <TrustSignals dict={dict} />

          {/* Stats row */}
          <div className="pillars-row" style={{ marginTop: 48 }}>
            <StatCounter
              value={dict.about.statEstablished}
              label={dict.about.statEstablishedLabel}
            />
            <StatCounter
              value={dict.about.statYears}
              label={dict.about.statYearsLabel}
            />
            <StatCounter
              value={dict.about.statAreas}
              label={dict.about.statAreasLabel}
            />
            <StatCounter
              value={dict.about.statLanguages}
              label={dict.about.statLanguagesLabel}
            />
          </div>

          {/* Certifications section */}
          <div style={{ marginTop: 60 }}>
            <h2>{isAr ? "شهاداتنا" : "Our Certifications"}</h2>
            <p style={{ color: "var(--text-soft)" }}>
              {isAr
                ? "الشركة عضو مسجّل في الهيئة السعودية للمحامين. يمكنكم التحقق من سجلنا الرسمي مباشرةً."
                : "The firm is a registered member of the Saudi Bar Association. Our official record can be verified directly."}
            </p>
            <div
              style={{
                marginTop: 24,
                maxWidth: 720,
                marginInline: "auto",
              }}
            >
              <CertificateCard />
            </div>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <a
                className="btn btn-outline"
                href="https://eservice.sba.gov.sa/en/directory/9908"
                rel="noopener"
                target="_blank"
              >
                {isAr ? "التحقق من الملف الرسمي" : "Verify the Official Record"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}