/* Icon sprite — inline SVG symbols used across the site.
   Drop once per page; reference via <svg><use href="#ic-name" /></svg> */
export default function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      height="0"
      style={{ position: "absolute" }}
      width="0"
    >
      <defs>
        <symbol id="ic-consult" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M8 12h32v20H20l-8 7v-7H8z" />
          <path d="M16 21h16M16 26h10" />
        </symbol>
        <symbol id="ic-scales" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M24 6v34M14 40h20M8 14h32M8 14l-5 11a6 6 0 0 0 10 0L8 14zM40 14l-5 11a6 6 0 0 0 10 0L40 14z" />
        </symbol>
        <symbol id="ic-contract" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M13 5h16l8 8v30H13z" />
          <path d="M29 5v8h8M18 24h12M18 30h12M18 36h8" />
          <path d="M33 27l4-4 3 3-4 4-3 1z" />
        </symbol>
        <symbol id="ic-briefcase" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <rect height="24" rx="1" width="36" x="6" y="16" />
          <path d="M17 16v-5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5" />
          <path d="M6 26h36M21 26v4h6v-4" />
        </symbol>
        <symbol id="ic-labor" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M24 26a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M9 42c1-8 7-13 15-13s14 5 15 13" />
          <path d="M4 21l6-9h28l6 9" />
        </symbol>
        <symbol id="ic-gavel" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M27 9l12 12M31 5l12 12-4 4-12-12zM6 30l12-12 8 8-12 12zM4 44l10-10M27 21l-6 6" />
        </symbol>
        <symbol id="ic-realestate" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M7 22L24 7l17 15" />
          <path d="M11 20v20h26V20" />
          <path d="M20 40V28h8v12" />
        </symbol>
        <symbol id="ic-trademark" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M24 5l6 4 7-1 2 7 5 5-4 6 1 7-7 2-4 6-7-2-7 2-4-6-7-2 1-7-4-6 5-5 2-7 7 1z" />
          <path d="M19 24l4 4 8-8" />
        </symbol>
        <symbol id="ic-handshake" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M4 20l9-7 8 3 5-2 4 3-11 11-5-3-10 2z" />
          <path d="M21 27l5 5-3 3-6-4M26 22l6 5-3 4" />
        </symbol>
        <symbol id="ic-hr" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <circle cx="17" cy="16" r="6" />
          <circle cx="33" cy="18" r="5" />
          <path d="M6 41c1-8 5-13 11-13s10 5 11 13M28 41c1-6 4-10 9-10s8 4 9 10" />
        </symbol>
        <symbol id="ic-globe" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" />
          <path d="M6 24h36M24 6c5 5 8 11 8 18s-3 13-8 18c-5-5-8-11-8-18s3-13 8-18z" />
        </symbol>
        <symbol id="ic-formation" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 48 48">
          <path d="M24 4c6 4 9 11 9 18 0 5-2 9-4 12l-5 6-5-6c-2-3-4-7-4-12 0-7 3-14 9-18z" />
          <circle cx="24" cy="18" r="4" />
          <path d="M15 28l-6 6 3 1 1 3 6-6M33 28l6 6-3 1-1 3-6-6" />
        </symbol>
        <symbol id="ic-badge" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M12 2l2.5 1.6 3-.4 1 2.8 2.4 1.7-1 2.9 1 2.9-2.4 1.7-1 2.8-3-.4L12 19l-2.5-1.6-3 .4-1-2.8-2.4-1.7 1-2.9-1-2.9 2.4-1.7 1-2.8 3 .4z" />
          <path d="M9 12l2 2 4-4" />
        </symbol>
        <symbol id="ic-scale-small" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 5.5a3 3 0 0 0 5 0L4 7zM20 7l-2.5 5.5a3 3 0 0 0 5 0L20 7z" />
        </symbol>
        <symbol id="ic-clock" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </symbol>
        <symbol id="ic-check" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </symbol>
        <symbol id="ic-user" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
  <circle cx="12" cy="8" r="4" />
  <path d="M4 21c1-4.5 4-7 8-7s7 2.5 8 7" />
        </symbol>
        <symbol id="ic-pin" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2c-4.4 0-8 3.5-8 8 0 6 8 12 8 12s8-6 8-12c0-4.5-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
</symbol>
<symbol id="ic-phone" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
  <path d="M5 4h4l2 5-2.5 2a11 11 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2C10.4 22 2 13.6 2 4a2 2 0 0 1 2-2z" />
</symbol>
<symbol id="ic-mail" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
  <rect height="14" rx="1.5" width="18" x="3" y="5" />
  <path d="M3.5 6l8.5 7 8.5-7" />
</symbol>
      </defs>
    </svg>
  );
}