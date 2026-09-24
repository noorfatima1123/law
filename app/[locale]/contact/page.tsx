import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import IconSprite from "@/components/IconSprite";
import Reveal from "@/components/Reveal";

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
                <Reveal as="li" delay={0}>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-pin" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.officeTitle}</h4>
                    <p>{dict.contact.officeAddress}</p>
                  </div>
                </Reveal>
                <Reveal as="li" delay={60}>
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
                </Reveal>
                <Reveal as="li" delay={120}>
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
                </Reveal>
                <Reveal as="li" delay={180}>
                  <span className="ic">
                    <svg height={22} width={22}><use href="#ic-clock" /></svg>
                  </span>
                  <div>
                    <h4>{dict.contact.hoursTitle}</h4>
                    <p>{dict.contact.hoursValue}</p>
                  </div>
                </Reveal>
              </ul>
              <div className="hours-note">
                <p style={{ margin: 0 }}>{dict.contact.note}</p>
              </div>
            </div>

            <Reveal as="div" className="map-card" delay={100}>
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
            </Reveal>
          </div>

          {/* CONTACT FORM — Visual only, backend wired later */}
          <Reveal as="div" className="form-card" delay={0}>
            <div className="form-card-head">
              <h2>{isAr ? "أرسلوا لنا رسالة" : "Send Us a Message"}</h2>
              <p>
                {isAr
                  ? "أخبرونا بإيجاز عن قضيتكم وسيتواصل معكم المحامي المختص من فريقنا."
                  : "Tell us briefly about your matter and the right lawyer on our team will get back to you."}
              </p>
            </div>

            <form className="contact-form" noValidate>
              <div className="form-field">
                <label htmlFor="cf-name">
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  autoComplete="name"
                  id="cf-name"
                  name="name"
                  placeholder={isAr ? "اسمك الكامل" : "Your full name"}
                  type="text"
                />
              </div>

              <div className="form-field">
                <label htmlFor="cf-email">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  autoComplete="email"
                  dir="ltr"
                  id="cf-email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <div className="form-field">
                <label htmlFor="cf-phone">
                  {isAr ? "رقم الهاتف (اختياري)" : "Phone (optional)"}
                </label>
                <input
                  autoComplete="tel"
                  dir="ltr"
                  id="cf-phone"
                  name="phone"
                  placeholder="+966 5X XXX XXXX"
                  type="tel"
                />
              </div>

              <div className="form-field">
                <label htmlFor="cf-topic">
                  {isAr ? "كيف يمكننا مساعدتكم؟" : "How can we help?"}
                </label>
                <select id="cf-topic" name="topic" defaultValue="general">
                  <option value="general">
                    {isAr ? "استفسار عام" : "General Inquiry"}
                  </option>
                  <option value="foreign-investment">
                    {isAr ? "خدمات المستثمرين الأجانب" : "Foreign Investor Services"}
                  </option>
                  <option value="contracts">
                    {isAr ? "مراجعة وصياغة العقود" : "Contract Review / Drafting"}
                  </option>
                  <option value="commercial">
                    {isAr ? "نزاع تجاري" : "Commercial Dispute"}
                  </option>
                  <option value="labor">
                    {isAr ? "قضية عمالية" : "Labor / Employment Matter"}
                  </option>
                  <option value="real-estate">
                    {isAr ? "عقارات" : "Real Estate"}
                  </option>
                  <option value="other">
                    {isAr ? "أخرى" : "Other"}
                  </option>
                </select>
              </div>

              <div className="form-field full">
                <label htmlFor="cf-message">
                  {isAr ? "الرسالة" : "Message"}
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder={
                    isAr
                      ? "اكتبوا وصفًا موجزًا لقضيتكم هنا."
                      : "Write a short description of your matter here."
                  }
                  rows={5}
                />
              </div>

              <div className="form-submit-row">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled
                  aria-disabled="true"
                  title={
                    isAr
                      ? "سيتم تفعيل النموذج قريبًا."
                      : "The form will be enabled soon."
                  }
                >
                  {isAr ? "إرسال الرسالة" : "Send Message"}
                </button>
                <span style={{ fontSize: 13, color: "var(--text-soft)" }}>
                  {isAr
                    ? "سيتم تفعيل المراسلة الإلكترونية قريبًا. للتواصل الفوري، يُرجى استخدام الهاتف أو البريد الإلكتروني أعلاه."
                    : "Email messaging will be enabled soon. For immediate contact, please use the phone or email above."}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </>
  );
}
