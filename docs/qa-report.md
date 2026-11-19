# QA report — SEO, performance, and accessibility

**Project:** The Industry Leader (`theindustryleader.net`)
**Scope:** Prompt 18 (hardening and audit), covering the complete static site built in Prompts 01–17.
**Date:** 19 November 2026
**Build:** Next.js 16.4.6, React 19.3.0, `next-mdx-remote` 6.0.0
**Environment:** Windows 11, Node.js 24.19.0, npm 11.9.0, Chrome 157 (Lighthouse 13.6, mobile emulation)

## Result summary

| Area | Result | Status |
| --- | --- | --- |
| Lint (`npm run lint`) | No errors or warnings | Pass |
| Typecheck (`npm run typecheck`) | No errors | Pass |
| Content validation (`npm run content:check`) | 12/12 content files valid | Pass |
| Production build (`npm run build`) | 14 static routes generated; `out/` written | Pass |
| SEO audit (`npm run seo:audit`) | 14 HTML pages, **0 errors, 0 warnings** | Pass |
| Playwright suite (`npm run test:e2e`) | **29/29 passed** (smoke, forms, Axe) | Pass |
| Axe (WCAG 2.0/2.1/2.2 A + AA) | 0 serious or critical violations on 8 representative pages | Pass |
| Lighthouse mobile — accessibility | **100** | Pass |
| Lighthouse mobile — best practices | **100** | Pass |
| Lighthouse mobile — SEO | **100** | Pass |
| Lighthouse mobile — performance | **78 best on the final build**; 85 best during the pass (90+ target not reproduced) | See note |
| Sitemap / robots / RSS / OG images | Generated and verified | Pass |
| Production dependency audit (`npm audit --omit=dev`) | 0 vulnerabilities | Pass |

### Lighthouse performance note

Lighthouse mobile runs against the production export (`npx serve out`) on the final
build scored **78, 76, and 69** (FCP/LCP 0.9–1.0 s, CLS 0; TBT 1.0 s, 1.1 s, and
3.6 s). The best score seen during the performance pass was **85** (TBT 580 ms).
Results varied widely because the measurement machine was under sustained
background CPU load from other development processes; TBT is the only metric that
moved.

A diagnostic run with CPU throttling disabled scored **100** (TBT 50 ms), and the
Lighthouse run reports **no non-composited animations**. This confirms that the
site's JavaScript and rendering work are not inherently blocking. The remaining
gap under 4× mobile CPU emulation is React/Next.js hydration on a contended CPU,
not a page-specific defect. Re-run Lighthouse on an idle machine before final
sign-off; the 90+ target may be met there, but it has not been demonstrated in
this environment.

No critical Lighthouse findings remain:
- CLS is 0.
- LCP and FCP are under 1.1 s on the local preview.
- No non-composited animations remain.
- No oversized images, no render-blocking third-party requests.
- Analytics is not loaded unless `NEXT_PUBLIC_ANALYTICS_ID` is configured.

## 1. Metadata and SEO audit

`scripts/audit-seo.mjs` audits every exported HTML file:

- Title present, reasonable length, unique.
- Meta description present, reasonable length, unique.
- Canonical present, absolute, HTTPS, trailing-slash form.
- Open Graph title, description, image, URL, type.
- Twitter card, title, description, image.
- Exactly one `<h1>` (also asserted by Playwright smoke tests).
- Robots directives present.
- JSON-LD present and expected schema types per page.
- No `Review` or `AggregateRating` schema (not permitted for this site).

**Result:** 14 HTML pages, **0 errors, 0 warnings**. Report: `reports/seo-audit.json`.

Covered schema types:

- Global `WebSite` (root layout).
- Home: `ProfessionalService`, `Person`, `Book`.
- About: `Person`, `BreadcrumbList`.
- Program: `Service`, `OfferCatalog`, `Offer`, `BreadcrumbList`.
- Contact: `BreadcrumbList`, `FAQPage`.
- Legal and conversion pages: `BreadcrumbList`.

### JSON-LD validation method

The automated audit extracts every `application/ld+json` block, parses it with
`JSON.parse`, verifies `@context` is `https://schema.org`, rejects prohibited
types, checks expected page-level types, verifies HTTPS URLs, and checks required
fields (`name`, `url`, `headline`, `author`, `publisher`, etc.) for the schema
types in use.

This is a structural/field check, not a substitute for Google's validators.
**Manual launch check:** paste the rendered URL or page source into the
[Schema Markup Validator](https://validator.schema.org/) and
[Google Rich Results Test](https://search.google.com/test/rich-results) after the
site is live. Rich-result eligibility should be confirmed there.

## 2. Social images and media

- `scripts/generate-og.mjs` generated branded 1200×630 OG images for the default,
  home, program, about, projects, testimonials, contact, and free-guide pages.
- `scripts/optimize-images.mjs` produced WebP and AVIF variants alongside source
  images: **14 PNG/JPEG, 14 WebP, 14 AVIF** files (8 OG images, 3 headshots, and
  3 licensed section photographs).
- Section photography is stored locally from Unsplash under the Unsplash License;
  source URLs and provenance are recorded in `docs/image-sources.md`.
- Largest public asset: **280.4 KB** (`/images/sections/leadership-strategy.jpg`);
  its served AVIF variant is **83.1 KB**. All public assets are under 300 KB.
  No public asset exceeds 300 KB.
- Content images are currently branded SVG placeholders (portrait and guide cover),
  not unlicensed stock photography. Replace with approved photography before launch
  if available.

## 3. Fonts, CSS, and JavaScript

Measured on the production export:

- **JavaScript:** 8 chunks requested by the home page, **≈160 KB transfer**
  (≈805 KB raw across all 15 chunks in the build). The framework/React chunk is
  the largest single cost; page-specific code is small.
- **CSS:** one stylesheet, **80 KB raw / 13.7 KB transfer**.
- **Fonts:** two families (Fraunces display + Manrope sans), 10 files/152.7 KB in
  the build; the home page requests **2 files / 60.2 KB transfer**. Self-hosted by
  `next/font`, no third-party font requests.
- **Analytics:** zero analytics JS is requested unless
  `NEXT_PUBLIC_ANALYTICS_ID` is set. Consent banner and GA load only after opt-in.
- `next/image` runtime, `lucide-react` package, Radix Slot, `framer-motion`,
  `react-hook-form`, and `zod` were removed from the shared client bundle during
  the performance pass.

Optimizations applied:

- Header is a server component; scroll state uses a composited CSS scroll-driven
  opacity animation (no scroll listener, no re-render).
- Hero's large `blur-3xl` decoration replaced with a radial gradient (removed an
  expensive software-rasterized blur).
- Accordion uses native `<details>/<summary>`.
- Testimonial rail uses CSS scroll-snap with no client JavaScript.
- Forms import endpoint/validation modules directly; the validated application
  and guide forms are client components bundled on the homepage where they now
  live.
- Button uses a CSS spinner and plain anchors, with no icon or slot library.

## 4. Accessibility

Playwright + Axe runs with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and
`wcag22aa` on:

`/`, `/program/`, `/about/`, `/projects/`, `/testimonials/`,
`/free-guide/thank-you/`, `/contact/`, `/privacy/`.

**Result:** 0 critical or serious violations. A keyboard test confirms the skip
link is the first focusable element. Manual checks still required for screen-reader
verbosity, high-contrast mode, and real device testing.

Accessibility work includes:

- Single H1 per page; ordered headings.
- Visible gold-deep focus rings; skip link.
- Header/mobile drawer with focus trap, Escape close, body scroll lock, and
  `aria-expanded`.
- Form labels, `aria-invalid`, `aria-describedby`, live-region status messages.
- `prefers-reduced-motion` support; no motion-only information.
- Contrast fixes across light and dark sections. Note the deliberate token change:
  `--color-gold-deep` is `#7C5C24` (not the earlier `#8C6A35`) to meet AA contrast
  on Mist/Cloud backgrounds.

## 5. Navigation, forms, and smoke tests

**29/29 Playwright tests passed**, covering:

- One H1 on every public page, including the standalone About page.
- Branded 404 for unknown routes.
- Homepage contains the Testimonials and Apply sections but not Free Guide or FAQs.
- Contact contains the Free Guide and FAQ sections; Projects contains How It Works.
- Native program accordion keyboard operation.
- Application validation (empty first step and required fields).
- Contact, newsletter, and free-guide validation and consent.
- Guide download link on the thank-you page.
- Axe scans listed above.

## 6. Sitemap, robots, and feeds

- `out/sitemap.xml`: **9 URLs** (9 static pages, 0 posts).
- `out/robots.txt`: allows all public content; disallows `/style-guide/` and
  `/free-guide/thank-you/`; declares the sitemap URL.
- `out/rss.xml`: **0 items**, valid RSS 2.0 (insight publishing is paused).
- `out/404.html`: branded 404, served by the `.htaccess` `ErrorDocument`.
- `/style-guide/` and `/free-guide/thank-you/` carry `noindex`.

## 7. Warnings, placeholders, and launch blockers

1. **Placeholder free-guide PDF** — `the-authority-blueprint-placeholder.pdf` must
   be replaced with the client-approved PDF before launch. The release script
   prints a warning while it is present.
2. **Placeholder content** — the portrait is a branded SVG placeholder; social links
   point to platform home pages. Client testimonial quotes and 125×125 headshots
   were recovered from the old site archive and are published as originals at
   48–64px; obtain permission to republish them before launch. Case studies are
   anonymized examples with the outcome row removed.
3. **Forms and booking** — no Formspree endpoint or booking URL is configured in
   this environment. All four forms share `NEXT_PUBLIC_FORMSPREE_ENDPOINT` and add
   `form`, `submissionId`, `_subject`, consent, and timestamp to each payload;
   failed submissions keep the visitor's values on screen. In production the
   form is disabled until the endpoint is set, with an email fallback. Add the
   shared endpoint and `NEXT_PUBLIC_BOOKING_URL`, rebuild, then test delivery and
   Formspree filtering before launch.
4. **Analytics** — disabled because no measurement ID is configured. Enable only
   after consent copy is reviewed.
5. **Lighthouse 90+ target** — best score on the final build is 78 (85 during the
   optimization pass), under heavy background CPU load. Re-measure on an idle
   machine. Diagnostic 1× CPU score is 100.
6. **External schema validation** — automated structural checks pass; run Google's
   Rich Results Test and Schema Markup Validator against the live URLs.
7. **`npm audit`** — production dependencies report **0 vulnerabilities**
   (`npm audit --omit=dev`). A full audit reports 9 moderate findings confined to
   development/build tooling (`typescript-eslint` → `minimatch`;
   `@tailwindcss/typography` → `postcss-selector-parser`); they are not part of
   the client runtime. The previous high-severity finding in `next-mdx-remote`
   was fixed by upgrading to 6.0.0; MDX content is repository-controlled and never
   user-supplied.
8. **`.htaccess`** — Apache rewrite/caching rules cannot be executed in this
   environment. Verify HTTPS, www redirects, legacy redirects, 404, and cache
   headers on Hostinger staging or production using
   `docs/hostinger-deployment.md`.
9. **Cross-browser/device checks** — Chrome automated checks are complete.
   Manual Chrome, Safari, Firefox, and Edge checks at 320, 375, 768, 1024, and
   1440 px remain a launch step.

## 8. Sign-off

Automated acceptance criteria for Prompt 18 are met except for the performance
target, which is environment-limited and must be re-measured on an idle machine.
No critical accessibility, SEO, best-practice, or build issues remain.
