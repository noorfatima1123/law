import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export default function JsonLd({ locale }: Props) {
  const isAr = locale === "ar";

  const data = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: isAr
      ? "حامد دهلوي وسعود لارادي"
      : "Hamed Dehlawi & Saud Laradhi Company",
    alternateName: isAr
      ? "Hamed Dehlawi & Saud Laradhi Company"
      : "حامد دهلوي وسعود لارادي",
    url: `https://law-five-eta.vercel.app/${locale}`,
    logo: "https://law-five-eta.vercel.app/emblem.png",
    image: "https://law-five-eta.vercel.app/emblem.png",
    telephone: "+966505603354",
    email: "hdehlawi@gmail.com",
    foundingDate: "1991",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jeddah",
      addressRegion: "Makkah Province",
      addressCountry: "SA",
      streetAddress: isAr
        ? "مبنى رقم 3243، شارع المعادي، حي الرويس"
        : "Building No. 3243, Al-Muaadi Street, Ar Ruwais District",
      postalCode: "23211",
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    memberOf: {
      "@type": "Organization",
      name: "Saudi Bar Association",
      url: "https://eservice.sba.gov.sa/en/directory/9908",
    },
    knowsLanguage: ["ar", "en"],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}