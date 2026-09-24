"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ThreeDCertificate = dynamic(() => import("./ThreeDCertificate"), {
  ssr: false,
  loading: () => <CertificateSkeleton />,
});

function CertificateSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1.414 / 1",
        background: "linear-gradient(135deg, #FBF8F0 0%, #E6DEC8 100%)",
        border: "1px solid var(--border)",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
      }}
    >
      <span style={{ color: "var(--color-stone)", fontSize: 13 }}>
        Loading certificate…
      </span>
    </div>
  );
}

const CERTIFICATE_TEXT = {
  title: "Certificate of Membership",
  subtitle: "Saudi Bar Association",
  recipient: "Hamed Dehlawi & Saud Laradhi Company",
  bodyLines: [
    "is hereby recognized as a registered member of the",
    "Saudi Bar Association in the Kingdom of Saudi Arabia",
    "pursuant to the regulations governing the legal profession.",
  ],
  footerLines: [
    "Registration No. 9908 · Established 1991 · Jeddah, Saudi Arabia",
    "Verify at eservice.sba.gov.sa/en/directory/9908",
  ],
  signatureLeft: "Hamed Dehlawi",
  signatureRight: "Saud Laradhi",
  sealText: "SAUDI BAR\nASSOCIATION\n· 1991 ·",
};

export default function CertificateCard() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      setWebgl(!!gl);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (webgl === null) return <CertificateSkeleton />;
  if (webgl === false) return <CertificateSkeleton />;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 640,
        aspectRatio: "1.414 / 1",
        position: "relative",
        margin: "0 auto",
      }}
    >
      {/* Soft contact shadow — grounds the paper on the page instead of
          boxing it in a frame that doesn't belong to the page's own theme. */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "-4%",
          height: "14%",
          background:
            "radial-gradient(50% 100% at 50% 50%, rgba(20,15,5,0.22) 0%, rgba(20,15,5,0) 75%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />
      <ThreeDCertificate text={CERTIFICATE_TEXT} />
    </div>
  );
}