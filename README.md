# Animation layer — drop-in additions

This is **not a full project** — it's the animation/detailing layer to merge
into your existing Next.js repo (the one with `layout.tsx` and the six
`page.tsx` files you shared). Copy these paths over the matching ones in
your project.

## 1. Install the new dependencies

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

## 2. Files in this package

```
app/[locale]/layout.tsx          ← your layout.tsx + AmbientBackground/HeaderScrollEffect wired in + animations.css import
app/[locale]/animations.css      ← NEW — reveal, ambient bg, header shrink, faq accordion CSS
app/[locale]/page.tsx            ← home, with Reveal on audience cards / practice cards / steps
app/[locale]/about/page.tsx      ← about, with StatCounter (count-up) + Reveal on team cards
app/[locale]/contact/page.tsx    ← contact, with Reveal on contact list / map card / form card
app/[locale]/faq/page.tsx        ← faq, now renders <FaqAccordionList> instead of raw <details>
app/[locale]/foreign-investors/page.tsx  ← Reveal on each Q&A row
app/[locale]/practice-areas/page.tsx     ← Reveal on each practice-detail row

components/AmbientBackground.tsx  ← NEW — the site-wide Three.js ambient effect
components/Reveal.tsx             ← NEW — generic scroll-reveal wrapper (for plain elements: div, li, etc.)
components/RevealLink.tsx         ← NEW — same reveal behavior, specifically for next/link (see note below)
components/StatCounter.tsx        ← NEW — count-up number, used on the About page stats
components/FaqAccordionList.tsx   ← NEW — smooth open/close accordion for the FAQ page
components/HeaderScrollEffect.tsx ← NEW — toggles a class on scroll for the header-shrink effect
```

### Why two reveal components?

A Server Component (your `page.tsx` files) can't pass a component/function —
like `Link` — as a prop into a Client Component (`Reveal`); React only
allows serializable values across that boundary. So `Reveal` takes a plain
tag name (`as="div"`, `as="li"`) for ordinary elements, and `RevealLink`
hardcodes the `next/link` import internally for anywhere you need a
reveal-animated link (audience cards, practice cards on the home page).
If you hit the same "Functions cannot be passed directly to Client
Components" error anywhere else, it means something got wrapped in
`Reveal` with `as={SomeComponent}` — swap it for a dedicated wrapper like
`RevealLink` instead.

## 3. One assumption to check

`HeaderScrollEffect.tsx` looks for an element with `id="siteHeader"` to add
the shrink-on-scroll class to. I don't have your `SiteHeader.tsx` — if its
root element uses a different id, open `HeaderScrollEffect.tsx` and change
the `SELECTOR` constant to match. If no match is found it just does nothing
(no error), so it's safe either way — the header just won't shrink until
the selector is correct.

## 4. What each animation does

- **Ambient background** — a slow-drifting field of brass/navy points, fixed
  behind the whole site, very low opacity. This is the one deliberate motion
  moment; everything else is quiet by comparison, on purpose. Skips
  rendering entirely under `prefers-reduced-motion`.
- **Scroll reveal** — audience cards, practice cards, team cards, steps, and
  FAQ/foreign-investor rows fade + slide up as they enter the viewport,
  staggered slightly per item.
- **Count-up stats** — the About page's 1991 / 30+ / 12 / 2 count up once
  they scroll into view.
- **Header shrink** — the sticky header compacts slightly and gains a
  shadow once you scroll past ~12px.
- **FAQ accordion** — now animates open/close with a real height transition
  instead of the native `<details>` snap.
- **Page fade-in** — the whole page fades in on load (defined in
  `animations.css`, no component needed).

All of it respects `prefers-reduced-motion: reduce` — reveals show
immediately, the ambient canvas doesn't render, the page-fade is skipped.

## 5. Not touched (didn't have the source)

`SiteHeader.tsx`, `SiteFooter.tsx`, `IconSprite.tsx`, `JsonLd.tsx`,
`lib/i18n.ts`, and `lib/seo.ts` weren't shared, so they're untouched. The
contact form is still the same visual-only, disabled-button version from
your upload — wiring it to an actual submit endpoint (Formspree or
otherwise) is a separate step whenever you're ready for it.

## 6. Body background note

For the ambient canvas to actually show through (rather than sit behind an
opaque page background), make sure `<body>` doesn't paint a solid opaque
background color elsewhere in your global stylesheet. If it does, either
remove that rule or make it `transparent` — `animations.css` doesn't
override it for you.
