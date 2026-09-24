interface Props {
  label: string;
}

export default function StickyContactButton({ label }: Props) {
  return (
    <a className="sticky-contact" href="tel:+966505603354" aria-label={label}>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 4h4l2 5-2.5 2a11 11 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2C10.4 22 2 13.6 2 4a2 2 0 0 1 2-2z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}