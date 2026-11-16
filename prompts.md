# The Industry Leader — Code Generation Prompt Pack

## How to Use

- Run prompts in order. Each prompt assumes the previous one is complete.
- Provide the code-generation LLM with the repository and `plan.md`.
- Do not skip prompts; later prompts depend on earlier files.
- Each prompt ends with integration and verification.
- After every prompt: run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Keep the site frontend-only. Do not introduce a backend, database, CMS, API routes, server actions, ISR, or middleware.
- Do not invent claims, testimonials, prices, or metrics. Use approved content or clearly marked placeholders.

## Global Context

```text
PROJECT: The Industry Leader — theindustryleader.net
POSITIONING: Coaching-first leadership brand for Matthew Ogieva / Business Reimagined Inc.
CORE OFFER: 8-week "Becoming an Industry Leader" 1:1 coaching program.
STACK: Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, static export.
HOSTING: Hostinger static hosting. Build output is `out/`.
CONSTRAINTS: No backend, database, CMS, API routes, server actions, ISR, or middleware.
CONTENT: Local MDX and typed TS files under `content/`.
FORMS: Formspree/Web3Forms endpoints. BOOKING: Cal.com/Calendly.
BRAND: warm grey backgrounds, charcoal text, gold CTA accent, Fraunces display + Manrope body.
QUALITY: SEO-optimised, WCAG 2.2 AA intent, reduced motion, mobile-first.
RULES: Do not invent claims, testimonials, prices, or metrics. Use approved content or clearly marked placeholders.
```

---

### Prompt 01 — Bootstrap the Next.js project

```text
You are implementing Step 01 of The Industry Leader website. Read `plan.md` and the Global Context first.

OBJECTIVE
Create the project foundation with Next.js App Router, TypeScript, Tailwind CSS v4, static export, and tooling.

TASKS
1. In the current empty directory, create a Next.js app with TypeScript, Tailwind, ESLint, App Router, `src/`, and npm.
2. Install: framer-motion, lucide-react, clsx, tailwind-merge, zod, react-hook-form, @hookform/resolvers, gray-matter, next-mdx-remote, reading-time, remark-gfm, rehype-slug, rehype-autolink-headings, @radix-ui/react-slot.
3. Install dev deps: prettier, prettier-plugin-tailwindcss, tsx, @tailwindcss/typography.
4. Configure `next.config.ts` with `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`.
5. Create the folder structure from plan.md: app, components, content, lib, public, scripts, tests.
6. Add `.env.example`, `.prettierrc`, and npm scripts: `typecheck`, `content:check`, `preview`.
7. Add `src/lib/utils.ts` with `cn()`.
8. Add `src/lib/constants.ts` with site name, URL, nav placeholders, and social links.
9. Keep the default page minimal; do not build sections yet.

ACCEPTANCE
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- `out/` is generated.
- No backend, API route, or server action exists.
- Report files created and any assumptions.
```

### Prompt 02 — Design tokens, fonts, and base styles

```text
Continuing from Prompt 01.

OBJECTIVE
Implement the brand's visual foundation.

TASKS
1. In `src/app/globals.css`, add Tailwind v4 theme tokens for the exact colors, typography, spacing, radii, shadows, and motion from plan.md.
2. Add base styles: body background Mist, text Ink, selection gold, focus-visible ring, smooth scroll, image defaults, and a subtle grain overlay utility.
3. Load Fraunces and Manrope with `next/font/google` in `src/app/layout.tsx`; expose `--font-display` and `--font-sans`.
4. Add typography utilities for display, h1–h4, lead, eyebrow, prose, and balanced text.
5. Add container widths and section spacing utilities.
6. Add reduced-motion CSS.
7. Update the default page to demonstrate only the type scale and color swatches.
8. Do not build reusable components yet.

ACCEPTANCE
- Tokens match plan.md exactly.
- Gold buttons will use Ink text, not white.
- Fonts load without layout shift.
- Build passes.
```

### Prompt 03 — Core UI primitives

```text
Continuing from Prompt 02.

OBJECTIVE
Build the reusable UI layer.

TASKS
1. Create `Button` with variants: primary (gold bg, Ink text), secondary (outline), ghost, text-link; sizes sm/md/lg; loading state; optional icon; support `href` via Radix Slot.
2. Create `Badge`, `Card`, `Container`, `Section`, `SectionHeading`, `Divider`, `Stat`, and `Prose`.
3. Create form primitives: `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `FormError`, `SubmitButton`.
4. Ensure all components accept `className`, forward refs where appropriate, and use `cn()`.
5. Add accessible labels, descriptions, and error styling.
6. Create `src/app/style-guide/page.tsx` that renders every primitive, including form states. Mark it `noindex`.
7. Keep components presentational; no page-specific copy.

ACCEPTANCE
- All primitives render in the style guide.
- Keyboard focus is visible.
- Gold button contrast passes AA.
- Build passes.
```

### Prompt 04 — Motion and accessibility primitives

```text
Continuing from Prompt 03.

OBJECTIVE
Add a restrained, accessible motion system.

TASKS
1. Create `src/components/motion/MotionProvider.tsx` using Framer Motion `LazyMotion` and `domAnimation`.
2. Create `Reveal`, `Stagger`, `StaggerItem`, and `Parallax` components.
3. Respect `useReducedMotion`; disable transforms and non-essential motion when reduced motion is on.
4. Create an accessible `Accordion` with button triggers, `aria-expanded`, `aria-controls`, keyboard support, and animated height.
5. Add motion and accordion examples to the style guide.
6. Avoid animating layout properties; use opacity and transform.
7. Ensure no hydration mismatches in static export.

ACCEPTANCE
- Animations are subtle and performant.
- Reduced-motion mode removes motion.
- Accordion works with keyboard and screen readers.
- Build passes.
```

### Prompt 05 — Header, footer, navigation, and page shell

```text
Continuing from Prompt 04.

OBJECTIVE
Build the site shell and navigation.

TASKS
1. Create `Header` with logo wordmark, desktop nav, and primary gold CTA.
2. Add scroll state: transparent over hero, solid Mist background with border after scroll.
3. Create `MobileNav` drawer with focus trap, Escape close, body scroll lock, and `aria-expanded`.
4. Create `Footer` with nav, newsletter placeholder, social links, contact email, and legal links.
5. Create `SkipLink`, `Breadcrumbs`, and `PageShell`.
6. Create a branded `not-found.tsx` with helpful links.
7. Wire Header and Footer into `src/app/layout.tsx`.
8. Add navigation data to `content/navigation.ts`.
9. Ensure the mobile drawer is fully keyboard accessible.

ACCEPTANCE
- Header/footer appear on every page.
- Mobile nav traps focus and closes with Escape.
- 404 page renders.
- Build passes.
```

### Prompt 06 — Content schemas, seed content, and loaders

```text
Continuing from Prompt 05.

OBJECTIVE
Build the typed content layer that replaces a database.

TASKS
1. Create Zod schemas in `src/lib/content/schemas.ts` for SiteSettings, Author, Program, CurriculumWeek, Testimonial, Post, Category, FAQ, LeadMagnet, LegalPage, and form payloads.
2. Add seed content: `content/site.ts`, `author.ts`, `navigation.ts`, `programs.ts`, `testimonials.ts`, `faqs.ts`, `lead-magnet.ts`, `legal/*.mdx`, and six `insights/*.mdx` posts.
3. Use only approved/verified details from plan.md; mark unknown fields clearly.
4. Create loaders: `getAllPosts`, `getPostBySlug`, `getCategories`, `getPostsByCategory`, `getTestimonials`, `getProgram`, `getFaqs`, `getLegalPage`, `getLeadMagnet`.
5. Build the MDX pipeline with remark-gfm, rehype-slug, and autolink headings; extract reading time and TOC.
6. Add `scripts/check-content.ts` and wire `npm run content:check`.
7. Ensure invalid content fails the build.

ACCEPTANCE
- All seed content validates.
- Loaders are typed and return sorted data.
- `npm run content:check` passes.
- Build fails when a required field is removed.
```

### Prompt 07 — SEO infrastructure

```text
Continuing from Prompt 06.

OBJECTIVE
Add metadata, structured data, sitemap, robots, and RSS.

TASKS
1. Create `src/lib/seo/metadata.ts` with `buildMetadata()` for title, description, canonical, OG, and Twitter.
2. Create JSON-LD components and builders for ProfessionalService, Person, WebSite, Service, FAQPage, Article, and BreadcrumbList.
3. Create `scripts/generate-seo-files.mjs` to generate `public/sitemap.xml`, `public/robots.txt`, and `public/rss.xml` from content.
4. Add a default branded OG image in `public/og/`.
5. Wire default metadata and JSON-LD into the root layout.
6. Add noindex metadata to the style guide.
7. Add `npm run seo:generate` and run it before build.

ACCEPTANCE
- Sitemap includes all static pages and published posts.
- Robots points to the sitemap.
- RSS validates.
- JSON-LD has no placeholder URLs.
- Build passes.
```

### Prompt 08 — Homepage part 1

```text
Continuing from Prompt 07.

OBJECTIVE
Build the top half of the homepage.

TASKS
1. Create `Hero` with eyebrow, H1, subcopy, primary CTA to `/apply/`, secondary CTA to `/program/`, trust markers, and portrait with offset gold frame.
2. Create `CredibilityStrip` with approved credentials/media names.
3. Create `PainPoints` with three pain cards.
4. Create `Outcomes` with six outcome cards.
5. Use `Reveal`/`Stagger` and respect reduced motion.
6. Use the exact copy direction from plan.md.
7. Compose these sections in `src/app/page.tsx`.
8. Add homepage metadata and ProfessionalService/Person JSON-LD.

ACCEPTANCE
- Hero is impactful and responsive.
- CTAs link correctly.
- No layout shift.
- Homepage metadata and schema are present.
- Build passes.
```

### Prompt 09 — Homepage part 2

```text
Continuing from Prompt 08.

OBJECTIVE
Complete the homepage.

TASKS
1. Add `ProgramPreview` as a dark charcoal section with the 8-week promise and CTA.
2. Add `AboutPreview` with portrait, short bio, credentials, and link to `/about/`.
3. Add `HowItWorks` with three steps.
4. Add `Testimonials` using the accessible carousel/grid.
5. Add `InsightsPreview` with the three latest posts.
6. Add `LeadMagnet` section for the free guide.
7. Add `FAQ` accordion.
8. Add `FinalCTA`.
9. Wire all sections in order and add internal links.
10. Verify mobile spacing and section rhythm.

ACCEPTANCE
- Homepage has all planned sections.
- Testimonials are keyboard accessible.
- All links work.
- Build passes.
```

### Prompt 10 — About page

```text
Continuing from Prompt 09.

OBJECTIVE
Build the About page.

TASKS
1. Create `/about/page.tsx` with metadata and Person JSON-LD.
2. Build hero: portrait, headline, short intro.
3. Build story section: dockside-to-boardroom narrative, 25+ years, engineering + business background.
4. Build philosophy section: clarity, credibility, connection; influence is not control.
5. Build credentials/timeline: Maersk/APM Terminals, Egogo, Business Reimagined, Asaph Services, TEDx, books.
6. Build books/media strip with links.
7. Add CTA to program and contact.
8. Add About to navigation.

ACCEPTANCE
- Content is accurate and approved.
- Page is responsive and accessible.
- Person schema is valid.
- Build passes.
```

### Prompt 11 — Program page

```text
Continuing from Prompt 10.

OBJECTIVE
Build the core offer page.

TASKS
1. Create `/program/page.tsx` with metadata and Service JSON-LD.
2. Build hero: program name, promise, duration, format, primary CTA to `/apply/`.
3. Build "Who it's for / not for" section.
4. Build outcomes grid.
5. Build 8-week curriculum as an accessible accordion/timeline.
6. Build inclusions and investment note.
7. Add testimonials and FAQ with FAQPage schema.
8. Add sticky mobile CTA.
9. Link from header, footer, and homepage.

ACCEPTANCE
- All 8 weeks render.
- Accordion is keyboard accessible.
- Apply CTA works.
- FAQPage schema is valid.
- Build passes.
```

### Prompt 12 — Application form and page

```text
Continuing from Prompt 11.

OBJECTIVE
Build the program application flow.

TASKS
1. Create `src/components/forms/ApplicationForm.tsx` with three steps and a progress indicator.
2. Define the application Zod schema and TypeScript type.
3. Use React Hook Form with Zod resolver.
4. Add fields from plan.md, including role, company, challenge, outcome, why now, commitment, investment readiness, referral source, and consent.
5. Add honeypot, submission timing check, and `aria-live` status.
6. Submit JSON to `NEXT_PUBLIC_FORMSPREE_APPLICATION_ENDPOINT` via a shared `submitForm` helper.
7. Build `/apply/page.tsx` with reassurance copy, privacy link, and success state containing a booking link.
8. Handle missing endpoint gracefully in development.
9. Test validation and error states.

ACCEPTANCE
- Cannot submit invalid data.
- Success and error states work.
- No PII is logged.
- Build passes.
```

### Prompt 13 — Results page

```text
Continuing from Prompt 12.

OBJECTIVE
Build the social-proof page.

TASKS
1. Create `/results/page.tsx` with metadata.
2. Build hero: "Real leaders. Real shifts."
3. Add a stats/credibility strip using only verified figures.
4. Build a featured testimonial.
5. Build a testimonial grid with optional tag filter.
6. Build three case study cards using approved or anonymised content.
7. Add CTA to apply/book.
8. Link from homepage, about, and program.
9. Do not add Review/AggregateRating schema.

ACCEPTANCE
- Testimonials are accurate and approved.
- Filtering works with keyboard.
- No fake metrics.
- Build passes.
```

### Prompt 14 — Insights index and categories

```text
Continuing from Prompt 13.

OBJECTIVE
Build the article index.

TASKS
1. Create `/insights/page.tsx` with metadata.
2. Build hero and featured post.
3. Build category filter and client-side search.
4. Build responsive post grid.
5. Create `/insights/category/[category]/page.tsx` with `generateStaticParams`.
6. Add empty states for no results.
7. Link Insights in navigation and footer.
8. Add the latest posts to the homepage preview.
9. Verify static generation for all categories.

ACCEPTANCE
- All posts and categories render.
- Search and filter work without a backend.
- Empty states are clear.
- Build passes.
```

### Prompt 15 — Insight post template

```text
Continuing from Prompt 14.

OBJECTIVE
Build the MDX article page.

TASKS
1. Create `/insights/[slug]/page.tsx` with `generateStaticParams` and `dynamicParams = false`.
2. Render MDX with custom components for headings, images, quotes, callouts, and CTA.
3. Add breadcrumbs, category, title, date, reading time, and cover image.
4. Add a sticky TOC on desktop and collapsible TOC on mobile.
5. Add author box, share links, and related posts.
6. Add Article and Breadcrumb JSON-LD.
7. Add a newsletter CTA at the end.
8. Ensure all six seed posts render.
9. Test invalid slug returns 404.

ACCEPTANCE
- Posts render with correct typography.
- TOC links work.
- Article schema is valid.
- Build generates all post pages.
```

### Prompt 16 — Free guide, contact, newsletter, booking

```text
Continuing from Prompt 15.

OBJECTIVE
Complete all lead-capture paths.

TASKS
1. Create `/free-guide/page.tsx` with the guide cover, benefits, and email form.
2. Add `GuideForm` with validation, consent, honeypot, and Formspree submission.
3. Redirect success to `/free-guide/thank-you/` with a download link and next-step CTA.
4. Create `/contact/page.tsx` with contact form, booking link/embed, email, location, response time, and social links.
5. Add `ContactForm` with validation and success/error states.
6. Add `NewsletterForm` to the footer and insights pages.
7. Add analytics events for form start, submit, success, error, booking click, and guide download.
8. Test all forms with a staging endpoint.

ACCEPTANCE
- All forms validate and submit.
- Thank-you page works.
- Booking link opens correctly.
- No PII in analytics.
- Build passes.
```

### Prompt 17 — Legal pages, 404, and redirects

```text
Continuing from Prompt 16.

OBJECTIVE
Add legal pages and production routing.

TASKS
1. Create `/privacy/`, `/terms/`, and `/cookies/` from MDX with metadata.
2. Ensure footer links to all three.
3. Create a branded `public/404.html` or confirm `not-found.tsx` exports correctly.
4. Create `public/.htaccess` with:
   - HTTPS redirect
   - www to non-www redirect
   - 301 redirects:
     - /services/ -> /program/
     - /testimonials/ -> /results/
     - /blog/ -> /insights/
     - /becoming-a-top-1/ -> /insights/becoming-a-top-1/
     - /feed/ and /comments/feed/ -> /rss.xml
     - /sitemap.rss -> /sitemap.xml
   - 410 for /wp-admin/, /wp-login.php, and /wp-json/
   - ErrorDocument 404 /404.html
   - cache headers and security headers
5. Add `Options -Indexes`.
6. Verify redirects in a local Apache-like preview or on Hostinger staging.

ACCEPTANCE
- Legal pages render.
- Redirect map is complete.
- HTTPS and canonical host rules are correct.
- Build passes.
```

### Prompt 18 — SEO, performance, and accessibility audit

```text
Continuing from Prompt 17.

OBJECTIVE
Harden the site before launch.

TASKS
1. Audit every page for title, description, canonical, OG, Twitter, and single H1.
2. Validate JSON-LD with a schema validator.
3. Create `scripts/generate-og.mjs` to generate branded 1200x630 OG images for key pages and posts.
4. Create `scripts/optimize-images.mjs` to produce WebP/AVIF variants and report oversized images.
5. Audit fonts, JS bundle, and below-fold media.
6. Add Playwright smoke tests for home, program, insights, post, apply validation, contact validation, and 404.
7. Add Axe checks to the Playwright suite.
8. Add optional analytics wrapper and consent banner if `NEXT_PUBLIC_ANALYTICS_ID` is set.
9. Run Lighthouse mobile and fix critical issues.
10. Report scores and remaining warnings.

ACCEPTANCE
- Lighthouse mobile performance 90+ target.
- No critical Axe issues.
- Sitemap, robots, RSS, and OG images correct.
- Smoke tests pass.
- Build passes.
```

### Prompt 19 — Hostinger deployment and launch

```text
Continuing from Prompt 18.

OBJECTIVE
Deploy and verify the production site.

TASKS
1. Run the full release check: lint, typecheck, content:check, seo:generate, build.
2. Create a zip of `out/` and document upload steps to Hostinger `public_html/`.
3. Ensure `.htaccess` is uploaded and hidden files are included.
4. Verify HTTPS, non-www canonical, 404, redirects, and cache headers.
5. Test contact, application, newsletter, free-guide, and booking flows on production.
6. Verify sitemap and robots URLs.
7. Submit sitemap to Google Search Console and Bing Webmaster.
8. Set up uptime monitoring.
9. Write a one-page handover guide: how to edit content, rebuild, upload, and roll back.
10. Do not change design or content unless fixing a launch blocker.

ACCEPTANCE
- Site is live on theindustryleader.net.
- SSL is active.
- All forms and redirects work.
- Sitemap is submitted.
- Handover guide is complete.
```
