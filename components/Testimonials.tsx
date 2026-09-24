import type { Testimonial } from "@/lib/i18n";

interface Props {
  heading: string;
  items: Testimonial[];
}

/* ============================================================
   Testimonials — quote + attribution.
   Renders nothing if `items` is empty (client permission gated).
   ============================================================ */
export default function Testimonials({ heading, items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="testimonials">
      <h3 className="testimonials-heading">{heading}</h3>
      <div className="testimonials-grid">
        {items.map((item, i) => (
          <figure className="testimonial" key={i}>
            <svg
              className="testimonial-quote-mark"
              viewBox="0 0 32 24"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M0 24V14C0 6.3 4.7 0 12 0v5c-3.6 0-6 2.7-6 6h6v13H0zm20 0V14c0-7.7 4.7-14 12-14v5c-3.6 0-6 2.7-6 6h6v13H20z" />
            </svg>
            <blockquote className="testimonial-quote">{item.quote}</blockquote>
            <figcaption className="testimonial-attribution">
              — {item.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}