import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";

export async function generateStaticParams() {
  return [
    { locale: "en", slug: "hamed-dehlawi" },
    { locale: "en", slug: "saud-laradhi" },
    { locale: "ar", slug: "hamed-dehlawi" },
    { locale: "ar", slug: "saud-laradhi" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "ar") return {};

  const dict = getDictionary(locale as Locale);
  const member = dict.about.teamMembers.find((m) => m.slug === slug);
  if (!member) return {};

  return buildPageMetadata({
    locale,
    path: `/team/${slug}`,
    title: {
      en: `${member.name} — ${member.role}`,
      ar: `${member.name} — ${member.role}`,
    },
    description: {
      en: member.bio.slice(0, 155),
      ar: member.bio.slice(0, 155),
    },
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  const dict = getDictionary(locale as Locale);
  const member = dict.about.teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  const isAr = locale === "ar";
  const href = (path: string) => `/${locale}${path}`;

  return (
    <>
      <IconSprite />

      <div className="subpage-hero">
        <div className="container-max">
          <h1>{member.name}</h1>
          <p>{member.role}</p>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 280px) 1fr",
              gap: 48,
              alignItems: "start",
              maxWidth: 900,
              marginInline: "auto",
            }}
            className="member-detail-grid"
          >
            {/* Avatar + Contact */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.avatar}
                alt={member.name}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "50%",
                  background: "var(--color-parchment-2)",
                  border: "2px solid var(--color-brass-soft)",
                  boxShadow:
                    "0 12px 30px -12px rgba(18,35,63,0.25), 0 4px 12px -4px rgba(18,35,63,0.12)",
                  display: "block",
                }}
              />
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading), serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "var(--color-ink-navy)",
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--color-stone)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  {member.role}
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text)" }}>
                {member.bio}
              </p>

              <Section title={dict.about.detailFocusLabel}>
                <ul style={{ paddingInlineStart: 20, margin: 0 }}>
                  {member.focus.map((item, i) => (
                    <li key={i} style={{ marginBottom: 6, color: "var(--text-soft)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailEducationLabel}>
                <ul style={{ paddingInlineStart: 20, margin: 0 }}>
                  {member.education.map((item, i) => (
                    <li key={i} style={{ marginBottom: 6, color: "var(--text-soft)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailLanguagesLabel}>
                <p style={{ margin: 0, color: "var(--text-soft)" }}>
                  {member.languages.join(" · ")}
                </p>
              </Section>

              <Section title={dict.about.detailMembershipsLabel}>
                <ul style={{ paddingInlineStart: 20, margin: 0 }}>
                  {member.memberships.map((item, i) => (
                    <li key={i} style={{ marginBottom: 6, color: "var(--text-soft)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailContactLabel}>
                <p style={{ margin: "0 0 6px 0" }}>
                  <a
                    href={`mailto:${member.email}`}
                    style={{ color: "var(--color-brass)", textDecoration: "none" }}
                  >
                    {member.email}
                  </a>
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    dir="ltr"
                    style={{ color: "var(--color-brass)", textDecoration: "none" }}
                  >
                    {member.phone}
                  </a>
                </p>
              </Section>

              <div style={{ marginTop: 40 }}>
                <Link
                  className="btn btn-outline"
                  href={href("/about")}
                  style={{ marginInlineEnd: 12 }}
                >
                  ← {dict.about.detailBackLabel}
                </Link>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="about-block"
            style={{ textAlign: "center", marginTop: 80 }}
          >
            <h2>{dict.about.detailCtaTitle}</h2>
            <p style={{ marginInline: "auto" }}>{dict.about.detailCtaBody}</p>
            <div style={{ marginTop: 22 }}>
              <Link className="btn btn-primary" href={href("/contact")}>
                {dict.about.detailCtaButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: 28 }}>
      <h3
        style={{
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-brass)",
          marginBottom: 10,
          fontWeight: 700,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}