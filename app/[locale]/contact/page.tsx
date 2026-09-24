import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") return {};
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: {
      en: "Contact",
      ar: "تواصل معنا",
    },
    description: {
      en: "Contact our Jeddah office: Ar Ruwais District. Phone +966 50 560 3354. Consultations in Arabic or English.",
      ar: "تواصل مع مكتبنا في جدة، حي الرويس. هاتف +966 50 560 3354. استشارات باللغتين العربية والإنجليزية.",
    },
  });
}

export default async function ContactPage({
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
          <h1>{dict.contact.title}</h1>
          <p>{dict.contact.subtitle}</p>
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
          height={280}
          src="/emblem.png"
          width={280}
          style={{ bottom: -50, insetInlineStart: -70 }}
        />
        <div className="container-max">
          <div className="contact-grid">
            <div>
              <ul className="contact-list">
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-pin" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.officeTitle}</h4>
                    <p>{dict.contact.officeAddress}</p>
                  </div>
                </li>
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-phone" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.phoneTitle}</h4>
                    <p>
                      <a
                        href="tel:+966505603354"
                        dir="ltr"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {dict.contact.phoneValue}
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-mail" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.emailTitle}</h4>
                    <p>
                      <a
                        href="mailto:hdehlawi@gmail.com"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {dict.contact.emailValue}
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-clock" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.hoursTitle}</h4>
                    <p>{dict.contact.hoursValue}</p>
                  </div>
                </li>
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-globe" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.videoTitle}</h4>
                    <p>{dict.contact.videoValue}</p>
                  </div>
                </li>
                <li>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-pin" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.parkingTitle}</h4>
                    <p>{dict.contact.parkingValue}</p>
                  </div>
                </li>
              </ul>
              <div className="hours-note">
                <p style={{ margin: 0 }}>{dict.contact.note}</p>
              </div>
            </div>

            <div className="map-card">
              <div className="map-visual">
                <svg className="map-pin" viewBox="0 0 24 24">
                  <use href="#ic-pin" />
                </svg>
              </div>
              <div className="map-card-foot">
                <p>{dict.contact.mapLocation}</p>
                <a
                  className="btn btn-outline"
                  href="https://www.google.com/maps/search/?api=1&query=Ar+Ruwais+District+Jeddah+Saudi+Arabia"
                  rel="noopener"
                  target="_blank"
                >
                  {dict.contact.mapCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}