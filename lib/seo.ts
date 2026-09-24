import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://law-five-eta.vercel.app";

interface PageSeo {
  locale: Locale;
  path: string; // "/", "/about", "/contact", etc.
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export function buildPageMetadata({ locale, path, title, description }: PageSeo): Metadata {
  const isAr = locale === "ar";
  const otherLocale = isAr ? "en" : "ar";

  // Normalize: "/" stays "", other paths keep leading slash
  const cleanPath = path === "/" ? "" : path;

  const canonical = `${BASE_URL}/${locale}${cleanPath}`;
  const enUrl = `${BASE_URL}/en${cleanPath}`;
  const arUrl = `${BASE_URL}/ar${cleanPath}`;

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Hamed Dehlawi & Saud Laradhi Company",
      title: title[locale],
      description: description[locale],
      url: canonical,
      images: [
        {
          url: `${BASE_URL}/og-banner.png`,
          width: 1200,
          height: 630,
          alt: title[locale],
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale],
      description: description[locale],
      images: [`${BASE_URL}/og-banner.png`],
    },
  };
}