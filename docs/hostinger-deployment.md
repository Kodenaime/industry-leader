# Hostinger deployment and verification checklist

Use this after uploading a release. Record the date, release zip, and checker
initials at the bottom.

## 0. Pre-flight (local)

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run content:check`
- [ ] `npm run seo:generate`
- [ ] `npm run build`
- [ ] `npm run seo:audit` — 0 errors, 0 warnings
- [ ] `npm run test:e2e` — all tests pass
- [ ] `npm run release` — zip created, `.htaccess` included
- [ ] `.env.local` has the production form endpoints, booking URL, site URL, and
      (if approved) analytics ID; the build was made after setting them
- [ ] Placeholder guide PDF replaced with the approved PDF
- [ ] Release zip checksum recorded: `________________`

## 1. Upload

- [ ] Hostinger hPanel → **Files → File Manager** → `public_html/`
- [ ] **Show hidden files** enabled
- [ ] Existing site backed up (download current files or use hPanel Backups)
- [ ] Release zip uploaded and extracted **directly** into `public_html/`
- [ ] `public_html/index.html` exists (not `public_html/out/index.html`)
- [ ] `public_html/.htaccess` exists
- [ ] `public_html/404.html`, `robots.txt`, `sitemap.xml`, `rss.xml` exist
- [ ] No stale files from the previous site remain (especially old WordPress PHP)

## 2. DNS and SSL

- [ ] Domain DNS points to Hostinger (A record for `@`, CNAME for `www`)
- [ ] Hostinger **SSL → Let's Encrypt** issued and active for `theindustryleader.net`
- [ ] `https://theindustryleader.net/` loads with a valid padlock
- [ ] `http://theindustryleader.net/` redirects to HTTPS (301)
- [ ] `https://www.theindustryleader.net/` redirects to `https://theindustryleader.net/` (301)
- [ ] HSTS header present over HTTPS
- [ ] Certificate renewal is automatic (Hostinger default)

## 3. Redirects and errors

Replace `example` values as needed. `curl -I` should show `301`, `404`, or `410`.

| Request | Expected |
| --- | --- |
| `http://theindustryleader.net/` | `301` → `https://theindustryleader.net/` |
| `https://www.theindustryleader.net/` | `301` → `https://theindustryleader.net/` |
| `/services/` | `301` → `/program/` |
| `/apply/` | `301` → `/#apply` |
| `/insights/` and `/insights/category/<topic>/` | `301` → `/` |
| `/free-guide/` | `301` → `/contact/#free-guide` |
| `/results/` | `301` → `/projects/` |
| `/blog/` | `301` → `/` |
| `/becoming-a-top-1/` | `301` → `/` |
| `/feed/` and `/comments/feed/` | `301` → `/rss.xml` |
| `/sitemap.rss` | `301` → `/sitemap.xml` |
| `/wp-admin/`, `/wp-login.php`, `/wp-json/` | `410 Gone` |
| `/this-page-does-not-exist/` | `404` with the branded 404 page |
| `/style-guide/` | `200` with `noindex`; not linked publicly |
| `/free-guide/thank-you/` | `200` with `noindex` and `Disallow` in robots.txt |
| `/program/`, `/about/`, `/projects/`, `/testimonials/`, `/contact/` | `200` |

- [ ] Fragment redirects preserve `#` (check the `Location` header is
      `/contact/#free-guide`, not `/contact/%23free-guide`) — the rules use
      Apache's `[NE]` flag

- [ ] All redirects above verified
- [ ] 404 page shows the branded design and returns HTTP 404 (not 200)
- [ ] No mixed-content warnings in DevTools console

## 4. Headers and caching

Check with browser DevTools → Network → Headers, or:

```bash
curl -I https://theindustryleader.net/
curl -I https://theindustryleader.net/_next/static/chunks/<file>.js
curl -I https://theindustryleader.net/og/home.png
```

- [ ] HTML: `Cache-Control: public, max-age=0, must-revalidate`
- [ ] Hashed `_next/static` JS/CSS and images: `max-age=31536000, immutable`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy` present
- [ ] `Strict-Transport-Security` present over HTTPS
- [ ] `Content-Security-Policy` present and does not block fonts, images, forms,
      Cal.com/Calendly, or GA (if enabled)
- [ ] gzip/brotli compression active for HTML, CSS, JS, XML

## 5. SEO files and metadata

- [ ] `https://theindustryleader.net/robots.txt` returns 200 and references the sitemap
- [ ] `https://theindustryleader.net/sitemap.xml` returns 200 and lists 9 URLs
- [ ] `https://theindustryleader.net/rss.xml` returns 200 and validates
- [ ] `/og/home.png` returns 200, 1200×630
- [ ] Canonicals use `https://theindustryleader.net/...` with trailing slashes
- [ ] No `noindex` on public pages; `noindex` on style guide and thank-you page
- [ ] Rich Results Test passes for home, about, program, projects, testimonials, and contact
- [ ] Schema Markup Validator reports no errors
- [ ] Submit sitemap in **Google Search Console** (Domain property, DNS verification)
- [ ] Submit sitemap in **Bing Webmaster Tools** (import from GSC is fastest)
- [ ] Request indexing for the home page and key pages in GSC

## 6. Functional tests (production)

Use real data and confirm delivery, not just the success message.

| Flow | Steps | Expected |
| --- | --- | --- |
| Contact | Submit a valid message | Success message; email arrives in Formspree/inbox; Reply-To is the sender |
| Application | Complete both steps | Success state with booking link; submission arrives |
| Newsletter | Enter email, tick consent, submit | Inline confirmation; contact appears in Formspree/audience |
| Free guide | Enter email, tick consent, submit | Redirect to thank-you page; guide download works; submission arrives |
| Booking | Click every booking CTA | Opens the configured Cal.com/Calendly page in a new tab |
| Mobile nav | Open at 375 px, Tab through links, Escape | Focus trapped, Escape closes, background scroll locked |
| Forms validation | Submit empty/invalid values | Inline errors, focus moves to first error, no network request |
| Honeypot/timing | Submit immediately after load | Rejected gracefully; no spam delivery |

- [ ] All flows above pass
- [ ] Spam protection/honeypot verified
- [ ] Form notification email and thank-you copy are correct
- [ ] Analytics events appear in GA4 DebugView/Realtime (only if enabled)
- [ ] Consent banner appears only when analytics is enabled; accepting loads GA;
      declining loads nothing

## 7. Accessibility and responsive checks

- [ ] Keyboard-only pass: skip link, header, mobile drawer, forms, accordion
- [ ] Screen reader spot check (NVDA/VoiceOver): headings, form labels, status messages
- [ ] Zoom to 200% at 1280 px: no clipping or horizontal scroll
- [ ] Widths 320, 375, 768, 1024, 1440 px: layout intact
- [ ] Chrome, Safari, Firefox, Edge: no console errors
- [ ] Reduced motion: no non-essential animation

## 8. Monitoring and backup

- [ ] Uptime monitor configured (e.g., UptimeRobot or Hostinger monitoring) for
      `https://theindustryleader.net/` — 5-minute interval, email alert
- [ ] Monitor `/sitemap.xml` or a form page as a second check
- [ ] Hostinger automatic backups confirmed (daily/weekly as plan allows)
- [ ] Google Search Console email alerts enabled
- [ ] Bing Webmaster alerts enabled
- [ ] Keep the deployed release zip and checksum for rollback

## 9. Sign-off

- Release date: `________________`
- Release zip: `________________`
- Deployed by: `________________`
- Verified by: `________________`
- Notes / exceptions:

```text

```

If a check fails, roll back with the previous release zip (see
`docs/handover.md`) before troubleshooting in production.
