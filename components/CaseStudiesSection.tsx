import type { CaseExample, Testimonial } from "@/lib/i18n";
import CaseExamples from "./CaseExamples";
import Testimonials from "./Testimonials";

interface Props {
  sectionTitle: string;
  sectionSubtitle: string;
  caseExamplesHeading: string;
  situationLabel: string;
  outcomeLabel: string;
  testimonialsHeading: string;
  caseExamples: CaseExample[];
  testimonials: Testimonial[];
}

/* ============================================================
   CaseStudiesSection — container for CaseExamples + Testimonials.
   Renders nothing if both arrays are empty (client permission gated).
   ============================================================ */
export default function CaseStudiesSection({
  sectionTitle,
  sectionSubtitle,
  caseExamplesHeading,
  situationLabel,
  outcomeLabel,
  testimonialsHeading,
  caseExamples,
  testimonials,
}: Props) {
  const hasCases = caseExamples && caseExamples.length > 0;
  const hasTestimonials = testimonials && testimonials.length > 0;
  if (!hasCases && !hasTestimonials) return null;

  return (
    <div className="section section-alt">
      <div className="container-max">
        <div className="section-head">
          <h2>{sectionTitle}</h2>
          <p>{sectionSubtitle}</p>
        </div>

        {hasCases && (
          <CaseExamples
            heading={caseExamplesHeading}
            situationLabel={situationLabel}
            outcomeLabel={outcomeLabel}
            items={caseExamples}
          />
        )}

        {hasTestimonials && (
          <div style={{ marginTop: hasCases ? 64 : 0 }}>
            <Testimonials
              heading={testimonialsHeading}
              items={testimonials}
            />
          </div>
        )}
      </div>
    </div>
  );
}