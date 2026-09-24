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
          <div className="member-detail-grid">
            {/* Avatar + name */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.avatar}
                alt={member.name}
                className="member-detail-avatar"
              />
              <div className="member-detail-name-block">
                <div className="member-detail-name">{member.name}</div>
                <div className="member-detail-role">{member.role}</div>
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="member-detail-bio">{member.bio}</p>

              <Section title={dict.about.detailFocusLabel}>
                <ul className="member-detail-list">
                  {member.focus.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailEducationLabel}>
                <ul className="member-detail-list">
                  {member.education.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailBarAdmissionLabel}>
                <p className="member-detail-text">{member.barAdmissionYear}</p>
              </Section>

              <Section title={dict.about.detailCourtsLabel}>
                <ul className="member-detail-list">
                  {member.courtsAppearedBefore.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailLanguagesLabel}>
                <p className="member-detail-text">
                  {member.languages.join(" · ")}
                </p>
              </Section>

              <Section title={dict.about.detailMembershipsLabel}>
                <ul className="member-detail-list">
                  {member.memberships.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Section>

              <Section title={dict.about.detailContactLabel}>
                <p className="member-detail-text" style={{ marginBottom: 6 }}>
                  <a
                    href={`mailto:${member.email}`}
                    className="member-detail-link"
                  >
                    {member.email}
                  </a>
                </p>
                <p className="member-detail-text" style={{ margin: 0 }}>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    dir="ltr"
                    className="member-detail-link"
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
    <div className="member-detail-section">
      <h3 className="member-detail-section-title">{title}</h3>
      {children}
    </div>
  );
}