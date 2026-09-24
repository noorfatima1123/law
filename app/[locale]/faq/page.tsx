import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import IconSprite from "@/components/IconSprite";
import FaqAccordionList from "@/components/FaqAccordionList";

const FILTERS = [
  { key: "all", labelKey: "filterAll" },
  { key: "general", labelKey: "filterGeneral" },
  { key: "foreign", labelKey: "filterForeign" },
  { key: "services", labelKey: "filterServices" },
  { key: "trust", labelKey: "filterTrust" },
] as const;

export default async function FaqPage({
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

  const filteredItems =
    activeFilter === "all"
      ? dict.faq.items
      : dict.faq.items.filter((item) => item.category === activeFilter);

  const href = (path: string) => `/${locale}${path}`;

  return (
    <>
      <IconSprite />

      <div className="subpage-hero">
        <div className="container-max">
          <h1>{dict.faq.title}</h1>
          <p>{dict.faq.subtitle}</p>
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
        <div className="container-max">
          <div className="filter-tabs">
            {FILTERS.map((f) => {
              const filterHref =
                f.key === "all"
                  ? href("/faq")
                  : `${href("/faq")}?filter=${f.key}`;
              const isActive = activeFilter === f.key;
              return (
                <a
                  key={f.key}
                  className={`filter-tab${isActive ? " is-active" : ""}`}
                  href={filterHref}
                  aria-current={isActive ? "page" : undefined}
                >
                  {dict.faq[f.labelKey]}
                </a>
              );
            })}
          </div>

          <FaqAccordionList items={filteredItems} />
        </div>
      </div>
    </>
  );
}
