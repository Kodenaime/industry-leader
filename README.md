# The Industry Leader

Static marketing site for **The Industry Leader** — leadership coaching by
Matthew Ogieva, Business Reimagined Incorporated.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4.
The site exports to plain HTML/CSS/JS and is hosted on Hostinger. There is no
backend, database, API route, server action, ISR, or middleware.

## Pages

The site has six standalone pages: `/` (Home), `/program/`, `/about/`,
`/projects/`, `/testimonials/`, and `/contact/`. Apply lives on the homepage;
the Free Guide and FAQs live on `/contact/`, and How It Works lives on
`/projects/`. Insight publishing is paused until archive-approved article copy
is available; the `/insights/<slug>/` route can be restored when approved posts
exist. Old URLs are redirected in `public/.htaccess`.

All four forms post to one public Formspree endpoint (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`).
Each submission carries a form name, submission ID, and analytics event so a
single Formspree inbox can be filtered and tracked.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in optional form/booking/analytics values
npm run dev                  # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm run content:check
npm run build
npm run seo:audit
npm run test:e2e
```

`npm run build` writes the static site to `out/`. `npm run release` packages
`out/` (including `.htaccess`) into `releases/industry-leader-<timestamp>.zip`
for upload to Hostinger `public_html/`.

## Documentation

- [Handover guide](docs/handover.md) — edit content, rebuild, upload, roll back.
- [Hostinger deployment checklist](docs/hostinger-deployment.md) — DNS, SSL,
  redirects, headers, forms, sitemap submission, monitoring.
- [QA report](docs/qa-report.md) — Lighthouse, Axe, SEO audit, bundle findings,
  placeholders, and launch warnings.
- [Image sources](docs/image-sources.md) — provenance and licensing for section photography.
- `plan.md` and `prompts.md` — original content, IA, and build specification.

## Environment variables

Copy `.env.example` to `.env.local`. All values are public and are baked in at
build time; never put secrets in `NEXT_PUBLIC_*` variables.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com/Calendly link (falls back to `/contact/`) |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` | Contact form |
| `NEXT_PUBLIC_FORMSPREE_APPLICATION_ENDPOINT` | Application form |
| `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT` | Newsletter form |
| `NEXT_PUBLIC_FORMSPREE_GUIDE_ENDPOINT` | Free-guide form |
| `NEXT_PUBLIC_ANALYTICS_ID` | GA4 ID; analytics and consent banner stay off when empty |

## Before launch

Replace the placeholder free-guide PDF
(`public/downloads/the-authority-blueprint-placeholder.pdf`), obtain permission
to republish the recovered client quotes and headshots in
`content/testimonials.ts`, and configure Formspree and booking endpoints. See
`docs/qa-report.md` for the full list of placeholders and warnings.
