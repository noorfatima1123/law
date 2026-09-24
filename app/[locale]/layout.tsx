import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Libre_Caslon_Text, Cairo, Markazi_Text } from "next/font/google";
import "../globals.css";
import "./animations.css";
import { getDictionary, type Locale } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyContactButton from "@/components/StickyContactButton";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const markazi = Markazi_Text({
  subsets: ["arabic", "latin"],
  variable: "--font-markazi",
  display: "swap",
});

const LOCALES = ["en", "ar"] as const;

export const metadata: Metadata = {
  metadataBase: new URL("https://law-five-eta.vercel.app"),
  title: {
    default: "Hamed Dehlawi & Saud Laradhi Company | Attorneys at Law, Jeddah",
    template: "%s | Hamed Dehlawi & Saud Laradhi Company",
  },
  description:
    "Jeddah law firm since 1991. Member of the Saudi Bar Association. Legal consultations, Sharia court litigation, contracts, commercial & labor cases.",
  icons: {
    icon: "/emblem.png",
    apple: "/apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) notFound();

  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  return (
    <html
      lang={loc}
      dir={loc === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${libreCaslon.variable} ${cairo.variable} ${markazi.variable}`}
    >
      <body>
        <JsonLd locale={loc} />
        <SiteHeader locale={loc} dict={dict} />
        {children}
        <SiteFooter locale={loc} dict={dict} />
        <StickyContactButton label={dict.stickyCall} />
      </body>
    </html>
  );
}
