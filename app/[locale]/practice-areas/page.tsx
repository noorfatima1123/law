import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";

const ICON_MAP: Record<string, string> = {
  consult: "#ic-consult",
  scales: "#ic-scales",
  contract: "#ic-contract",
  briefcase: "#ic-briefcase",
  labor: "#ic-labor",
  gavel: "#ic-gavel",
  realestate: "#ic-realestate",
  trademark: "#ic-trademark",
  handshake: "#ic-handshake",
  hr: "#ic-hr",
  globe: "#ic-globe",
  formation: "#ic-formation",
};

const FILTERS = [
  { key: "all", labelKey: "filterAll" },
  { key: "individuals", labelKey: "filterIndividuals" },
  { key: "business", labelKey: "filterBusiness" },
  { key: "investors", labelKey: "filterInvestors" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") return {};
  return buildPageMetadata({
    locale,
    path: "/practice-areas",
    title: {
      en: "Practice Areas",
      ar: "مجالات الممارسة",
    },
    description: {
      en: "Legal consultations, Sharia court litigation, contracts, commercial & labor cases, real estate, IP, and business setup in Saudi Arabia.",
      ar: "استشارات قانونية، تقاضٍ أمام المحاكم الشرعية، صياغة العقود، القضايا التجارية والعمالية، التنفيذ، العقارات، العلامات التجارية.",
    },
  });
}

export default async function PracticeAreasPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  const { filter } = await searchParams;
  const activeFilter = filter || "all";
  const dict = getDictionary(locale as Locale);

  const filteredAreas =
    activeFilter === "all"
      ? dict.practiceAreas.areas
      : dict.practiceAreas.areas.filter((a) => a.tags.includes(activeFilter));

  const href = (path: string) => `/${locale}${path}`;

  return (
    <>
      <IconSprite />

      <div className="subpage-hero">
        <div className="container-max">
          <h1>{dict.practiceAreas.title}</h1>
          <p>{dict.practiceAreas.subtitle}</p>
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
        <div className="container-max">
          <div className="filter-tabs">
            {FILTERS.map((f) => {
              const filterHref =
                f.key === "all"
                  ? href("/practice-areas")
                  : `${href("/practice-areas")}?filter=${f.key}`;
              const isActive = activeFilter === f.key;
              return (
                <Link
                  key={f.key}
                  className={`filter-tab${isActive ? " is-active" : ""}`}
                  href={filterHref}
                  aria-current={isActive ? "page" : undefined}
                >
                  {dict.practiceAreas[f.labelKey]}
                </Link>
              );
            })}
          </div>

          <div className="practice-detail-list">
            {filteredAreas.map((area, i) => (
              <div
                className="practice-detail"
                data-tags={area.tags.join(",")}
                id={area.slug}
                key={area.slug}
              >
                <div className="practice-detail-icon">
                  <svg width={26} height={26}>
                    <use href={ICON_MAP[area.icon] || "#ic-consult"} />
                  </svg>
                </div>
                <div>
                  <span className="practice-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>

                  <div className="practice-meta">
                    <div className="practice-meta-item">
                      <span className="practice-meta-label">
                        {dict.practiceAreas.timelineLabel}
                      </span>
                      <span className="practice-meta-value">
                        {area.timeline}
                      </span>
                    </div>
                    {area.caseCount && (
                      <div className="practice-meta-item">
                        <span className="practice-meta-label">
                          {dict.practiceAreas.caseCountLabel}
                        </span>
                        <span className="practice-meta-value">
                          {area.caseCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section section-alt">
        <div className="container-max">
          <div className="fees-block">
            <h2 className="fees-title">{dict.practiceAreas.feesTitle}</h2>
            <p className="fees-note">{dict.practiceAreas.feesNote}</p>
          </div>
        </div>
      </div>
    </>
  );
}