import type { MetadataRoute } from "next";

const BASE_URL = "https://law-five-eta.vercel.app";

const LOCALES = ["en", "ar"] as const;

const PAGES: Array<{
  path: string;
  changeFrequency: "monthly" | "yearly" | "weekly";
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1.0 },
  { path: "/practice-areas", changeFrequency: "monthly", priority: 0.9 },
  { path: "/foreign-investors", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      const otherLocale = locale === "en" ? "ar" : "en";

      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page.path}`,
            ar: `${BASE_URL}/ar${page.path}`,
            "x-default": `${BASE_URL}/en${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}