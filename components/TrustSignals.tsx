import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

/* ============================================================
   Trust Signals — 8 fields rendered as label + value pairs.
   All values are placeholders ([TBD] / [لم يُحدد بعد]) until
   the firm provides real data.
   ============================================================ */
export default function TrustSignals({ dict }: Props) {
  const items = [
    {
      label: dict.about.trustMattersHandledLabel,
      value: dict.about.trustMattersHandledValue,
    },
    {
      label: dict.about.trustForeignInvestorShareLabel,
      value: dict.about.trustForeignInvestorShareValue,
    },
    {
      label: dict.about.trustTopIndustriesLabel,
      value: dict.about.trustTopIndustriesValue,
    },
    {
      label: dict.about.trustTopClientCountriesLabel,
      value: dict.about.trustTopClientCountriesValue,
    },
    {
      label: dict.about.trustResponseTimeLabel,
      value: dict.about.trustResponseTimeValue,
    },
    {
      label: dict.about.trustFreeConsultationLabel,
      value: dict.about.trustFreeConsultationValue,
    },
    {
      label: dict.about.trustAdditionalMembershipsLabel,
      value: dict.about.trustAdditionalMembershipsValue,
    },
    {
      label: dict.about.trustAdditionalLanguagesLabel,
      value: dict.about.trustAdditionalLanguagesValue,
    },
  ];

  return (
    <div className="trust-signals" role="region" aria-label="Trust signals">
      {items.map((item, i) => (
        <div className="trust-signal" key={i}>
          <span className="trust-signal-value">{item.value}</span>
          <span className="trust-signal-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}