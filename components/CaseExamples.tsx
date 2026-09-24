import type { CaseExample } from "@/lib/i18n";

interface Props {
  heading: string;
  situationLabel: string;
  outcomeLabel: string;
  items: CaseExample[];
}

/* ============================================================
   CaseExamples — anonymized situation / outcome pairs.
   Renders nothing if `items` is empty (client permission gated).
   ============================================================ */
export default function CaseExamples({
  heading,
  situationLabel,
  outcomeLabel,
  items,
}: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="case-examples">
      <h3 className="case-examples-heading">{heading}</h3>
      <div className="case-examples-grid">
        {items.map((item, i) => (
          <article className="case-example" key={i}>
            <div className="case-example-row">
              <span className="case-example-label">{situationLabel}</span>
              <p className="case-example-text">{item.situation}</p>
            </div>
            <div className="case-example-row">
              <span className="case-example-label case-example-label-outcome">
                {outcomeLabel}
              </span>
              <p className="case-example-text">{item.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}