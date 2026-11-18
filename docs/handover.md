# Handover guide

**Site:** The Industry Leader — https://theindustryleader.net
**Stack:** Next.js 16 static export (`output: "export"`), no backend, no database.
**Hosting:** Hostinger shared hosting, files in `public_html/`.
**Repository:** this folder. Build output lives in `out/` (generated, not committed).

**Pages:** Home (`/`), Program, Projects, Testimonials, and Contact. About, Apply,
Insights, and Free Guide are homepage sections (`#about`, `#apply`, `#insights`,
`#free-guide`). Individual insight articles stay at `/insights/<slug>/`, and the
guide confirmation stays at `/free-guide/thank-you/`. Redirects for retired URLs
live in `public/.htaccess`.

## 1. Before the first deploy

1. Install Node.js 20.9 or newer (Node 24 was used for QA).
2. Run `npm install` once.
3. Copy `.env.example` to `.env.local` and fill in the values you have:

   | Variable | Purpose | If empty |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Defaults to `https://theindustryleader.net` |
   | `NEXT_PUBLIC_BOOKING_URL` | Cal.com/Calendly scheduling link | Booking buttons go to `/contact/` |
   | `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` | Contact form endpoint | Form shows a development notice |
   | `NEXT_PUBLIC_FORMSPREE_APPLICATION_ENDPOINT` | Application form endpoint | Form shows a development notice |
   | `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT` | Newsletter endpoint | Form shows a development notice |
   | `NEXT_PUBLIC_FORMSPREE_GUIDE_ENDPOINT` | Free-guide endpoint | Form shows a development notice |
   | `NEXT_PUBLIC_ANALYTICS_ID` | GA4 measurement ID (`G-…`) | No analytics and no consent banner |

   These values are baked in at build time. After changing them, rebuild and
   re-upload the site.

4. Replace `public/downloads/the-authority-blueprint-placeholder.pdf` with the
   client-approved guide PDF. Keep the same filename or update the link in
   `content/lead-magnet.ts` and the thank-you page.
5. Replace placeholder imagery/copy if approved assets have arrived:
   - `content/case-studies.ts` outcome text (marked placeholders)
   - `content/testimonials.ts` — real quotes and headshots were recovered from the
     old site archive, but re-publication permission must be confirmed
   - `public/images/portrait-placeholder.svg`
   - `public/images/authority-blueprint-cover.svg`
   - social URLs in `content/site.ts`
6. Create the Formspree forms and a Cal.com/Calendly event, then put the public
   endpoints in `.env.local`.

## 2. Edit content

| What | Where |
| --- | --- |
| Site name, email, location, socials, description | `content/site.ts` |
| Author bio, credentials, book | `content/author.ts` |
| About section copy (homepage) | `content/about.ts` |
| Program modules, outcomes, pricing/offer text | `content/programs.ts` |
| Testimonials | `content/testimonials.ts` |
| Case studies | `content/case-studies.ts` |
| FAQs | `content/faqs.ts` |
| Free-guide copy | `content/lead-magnet.ts` |
| Header/footer navigation | `content/navigation.ts` |
| Blog posts | `content/insights/<slug>.mdx` |
| Privacy, terms, cookies | `content/legal/*.mdx` |
| Page titles/descriptions/schema | `src/app/**/page.tsx` and `src/lib/seo/` |

### Add an insight post

1. Create `content/insights/my-new-post.mdx` with the same frontmatter shape as an
   existing post (title, description, date, category, author, image, draft flag).
2. Add a 1200×630 image at `public/og/insights/my-new-post.png` (or run
   `npm run og:generate` after adding it to the generator list).
3. Run the build checks below. The post, homepage Insights section, RSS feed,
   sitemap, and structured data are generated automatically.

## 3. Build and publish

From the project folder:

```bash
npm install
npm run lint
npm run typecheck
npm run content:check
npm run build
npm run seo:audit
npm run release
```

`npm run release` creates `releases/industry-leader-<timestamp>.zip` and a
`.sha256` checksum. The zip contains the **contents** of `out/` at its root,
including `.htaccess`.

1. In Hostinger hPanel, open **Files → File Manager** and go to `public_html/`.
2. Enable **Show hidden files** (settings menu).
3. Upload the release zip (or use SFTP).
4. Extract it directly in `public_html/` so `index.html` and `.htaccess` are at the
   root — not inside an extra folder.
5. Confirm `.htaccess` exists after extraction. Without it, HTTPS redirects,
   legacy redirects, 404 handling, and cache/security headers will not work.
6. Visit the site and run the checks in `docs/hostinger-deployment.md`.

Tip: upload to a staging subdomain first if Hostinger provides one.

## 4. Roll back

Keep the last two release zips (and the `.sha256` files).

- **Fast rollback:** upload and extract the previous zip over `public_html/`,
  replacing files. Hidden files are included.
- **Hostinger backup:** hPanel → **Files → Backups** → restore the last automatic
  backup.
- **Code rollback:** `git checkout <known-good-commit>`, rebuild, and run
  `npm run release` again.

Do not delete the previous release until the new one has passed the deployment
checklist.

## 5. Regular maintenance

- Rebuild and re-upload after any content or `.env` change.
- Keep dependencies current with `npm outdated` and re-run the full release check.
- Review form submissions in Formspree and bookings in Cal.com/Calendly.
- Check Google Search Console and Bing Webmaster for crawl errors monthly.
- The visual style reference is `/style-guide/` (noindex, not linked publicly).

## 6. Need help?

- Build/QA details: `docs/qa-report.md`
- Hostinger checklist: `docs/hostinger-deployment.md`
- Apache rules: `public/.htaccess`
- Release packaging: `scripts/release.mjs`
