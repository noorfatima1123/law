import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import IconSprite from "@/components/IconSprite";
import Reveal from "@/components/Reveal";
import RevealLink from "@/components/RevealLink";

/* Map icon name → SVG symbol id */
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") notFound();

  const dict = getDictionary(locale as Locale);
  const href = (path: string) =>
    `/${locale}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <>
      <IconSprite />

      <div className="hero">
        <div aria-hidden="true" className="hero-pillars">
          <span style={{ height: "38%", animationDelay: ".05s" }} />
          <span style={{ height: "64%", animationDelay: ".15s" }} />
          <span style={{ height: "48%", animationDelay: ".25s" }} />
          <span style={{ height: "78%", animationDelay: ".1s" }} />
          <span style={{ height: "55%", animationDelay: ".3s" }} />
          <span style={{ height: "70%", animationDelay: ".2s" }} />
          <span style={{ height: "40%", animationDelay: ".35s" }} />
        </div>
        <div className="hero-inner">
          <div className="hero-medallion">
            <div aria-hidden="true" className="globe-meridians">
              <span /><span /><span />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={dict.site.name}
              src="/emblem.png"
              width={132}
              height={132}
            />
          </div>

          <h1>{dict.site.name}</h1>

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

          <p className="hero-tagline">{dict.home.heroTagline}</p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href={href("/practice-areas")}>
              {dict.home.heroExplore}
            </Link>
            <Link className="btn btn-outline-light" href={href("/contact")}>
              {dict.home.heroContact}
            </Link>
          </div>
        </div>
      </div>

      <div className="credential-strip">
        <div className="container-max">
          <span className="credential-item">
            <svg><use href="#ic-badge" /></svg>
            <span>
              <strong>{dict.home.credentialEstablished}</strong>
              {" · "}
              {dict.home.credentialEstablishedLabel}
            </span>
          </span>
          <span className="credential-item">
            <svg><use href="#ic-scale-small" /></svg>
            <span>
              <strong>{dict.home.credentialMember}</strong>
              {", "}
              {dict.home.credentialMemberLabel}
            </span>
          </span>
          <span className="credential-item">
            <svg><use href="#ic-globe" /></svg>
            <span>{dict.home.credentialBilingual}</span>
          </span>
          <a
            className="credential-item is-link"
            href="https://eservice.sba.gov.sa/en/directory/9908"
            rel="noopener"
            target="_blank"
          >
            <span className="badge-check">
              <svg><use href="#ic-check" /></svg>
            </span>
            <span>
              <strong>{dict.home.credentialVerified}</strong>
              {" "}
              {dict.home.credentialVerifiedLabel}
            </span>
          </a>
        </div>
      </div>

      <div className="section">
        <div className="container-max">
          <div className="section-head">
            <h2>{dict.home.audienceTitle}</h2>
            <p>{dict.home.audienceSubtitle}</p>
          </div>
          <div className="audience-select">
            <RevealLink
              className="audience-card"
              href={`${href("/practice-areas")}?filter=individuals`}
              delay={0}
            >
              <svg className="aud-icon" viewBox="0 0 48 48">
                <use href="#ic-labor" />
              </svg>
              <h3>{dict.home.audienceIndividualTitle}</h3>
              <p>{dict.home.audienceIndividualDesc}</p>
              <span className="aud-cta">{dict.home.audienceCta} →</span>
            </RevealLink>
            <RevealLink
              className="audience-card"
              href={`${href("/practice-areas")}?filter=business`}
              delay={90}
            >
              <svg className="aud-icon" viewBox="0 0 48 48">
                <use href="#ic-briefcase" />
              </svg>
              <h3>{dict.home.audienceBusinessTitle}</h3>
              <p>{dict.home.audienceBusinessDesc}</p>
              <span className="aud-cta">{dict.home.audienceCta} →</span>
            </RevealLink>
            <RevealLink
              className="audience-card"
              href={href("/foreign-investors")}
              delay={180}
            >
              <svg className="aud-icon" viewBox="0 0 48 48">
                <use href="#ic-globe" />
              </svg>
              <h3>{dict.home.audienceInvestorTitle}</h3>
              <p>{dict.home.audienceInvestorDesc}</p>
              <span className="aud-cta">{dict.home.audienceCta} →</span>
            </RevealLink>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="section-divider">
        <svg viewBox="0 0 150 16">
          <path
            d="M4 4c30 0 30 9 60 9s30-9 60-9"
            fill="none"
            stroke="#A9812E"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="section section-alt">
        <div className="container-max">
          <div className="section-head">
            <h2>{dict.home.practiceTitle}</h2>
            <p>{dict.home.practiceSubtitle}</p>
          </div>
          <div className="practice-grid">
            {dict.practiceAreas.areas.map((area, i) => (
              <RevealLink
                key={area.slug}
                className="practice-card"
                href={`${href("/practice-areas")}#${area.slug}`}
                delay={Math.min(i % 6, 6) * 60}
              >
                <svg className="practice-icon" width="42" height="42">
                  <use href={ICON_MAP[area.icon] || "#ic-consult"} />
                </svg>
                <h3>{area.title}</h3>
                <span className="view-more">{dict.home.practiceLearnMore}</span>
              </RevealLink>
            ))}
          </div>
          <div className="section-footer-cta">
            <Link className="btn btn-outline" href={href("/practice-areas")}>
              {dict.home.practiceViewAll}
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container-max">
          <div className="about-block" style={{ textAlign: "center" }}>
            <h2>{dict.home.aboutTitle}</h2>
            <p style={{ marginInline: "auto" }}>{dict.home.aboutBody}</p>
            <div style={{ marginTop: 22 }}>
              <Link className="btn btn-outline" href={href("/about")}>
                {dict.home.aboutCta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-alt">
        <div className="container-max">
          <div className="section-head">
            <h2>{dict.home.stepsTitle}</h2>
            <p>{dict.home.stepsSubtitle}</p>
          </div>
          <div className="steps-strip">
            <Reveal as="div" className="step-item" delay={0}>
              <span className="step-num">01</span>
              <h4>{dict.home.step1Title}</h4>
              <p>{dict.home.step1Body}</p>
            </Reveal>
            <Reveal as="div" className="step-item" delay={90}>
              <span className="step-num">02</span>
              <h4>{dict.home.step2Title}</h4>
              <p>{dict.home.step2Body}</p>
            </Reveal>
            <Reveal as="div" className="step-item" delay={180}>
              <span className="step-num">03</span>
              <h4>{dict.home.step3Title}</h4>
              <p>{dict.home.step3Body}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
