import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function SiteFooter({ locale, dict }: Props) {
  const href = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean === "/" ? "" : clean}`;
  };

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-max">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/emblem.png"
                width={34}
                height={34}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span>{dict.site.name}</span>
            </div>
            <p>{dict.footer.established}</p>
          </div>

          <div className="footer-col">
            <h5>{dict.footer.quickLinks}</h5>
            <ul>
              <li>
                <Link href={href("/practice-areas")}>
                  {dict.nav.practiceAreas}
                </Link>
              </li>
              <li>
                <Link href={href("/foreign-investors")}>
                  {dict.nav.foreignInvestors}
                </Link>
              </li>
              <li>
                <Link href={href("/about")}>{dict.nav.about}</Link>
              </li>
              <li>
                <Link href={href("/faq")}>{dict.nav.faq}</Link>
              </li>
              <li>
                <Link href={href("/contact")}>{dict.nav.contact}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>{dict.footer.office}</h5>
            <p style={{ maxWidth: "none", color: "rgba(255,255,255,0.65)" }}>
              {dict.footer.officeAddress}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {dict.site.name}. {dict.footer.rights}
          </span>
          <a
            href="https://eservice.sba.gov.sa/en/directory/9908"
            target="_blank"
            rel="noopener"
            style={{ textDecoration: "underline" }}
          >
            {dict.footer.verifiedSba}
          </a>
        </div>
      </div>
    </footer>
  );
}