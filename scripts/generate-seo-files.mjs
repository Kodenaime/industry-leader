// Generates static SEO assets into public/ for the Hostinger deployment.
// Run through tsx so the typed content modules can be imported directly:
//   npm run seo:generate
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "../content/site.ts";
import { program } from "../content/programs.ts";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const INSIGHTS_DIR = path.join(ROOT, "content", "insights");
const SITE_URL = site.url.replace(/\/$/, "");

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/program/", priority: "0.9", changefreq: "monthly" },
  { path: "/projects/", priority: "0.8", changefreq: "monthly" },
  { path: "/testimonials/", priority: "0.8", changefreq: "monthly" },
  { path: "/contact/", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy/", priority: "0.3", changefreq: "yearly" },
  { path: "/terms/", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies/", priority: "0.3", changefreq: "yearly" },
];

function readPosts() {
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return { ...data, slug: file.replace(/\.mdx$/, "") };
    })
    .filter((post) => post.draft !== true)
    .filter((post) => post.slug && post.title && post.publishedAt)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function rfcDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

function buildSitemap(posts) {
  const urls = [
    ...STATIC_ROUTES.map((route) => ({
      loc: `${SITE_URL}${route.path}`,
      priority: route.priority,
      changefreq: route.changefreq,
      lastmod: undefined,
    })),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/insights/${post.slug}/`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: isoDate(post.updatedAt ?? post.publishedAt),
    })),
  ];

  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ""}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function buildRobots() {
  return `# Robots for ${SITE_URL}
User-agent: *
Allow: /
Disallow: /style-guide/
Disallow: /free-guide/thank-you/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildRss(posts) {
  const items = posts
    .slice(0, 20)
    .map((post) => {
      const url = `${SITE_URL}/insights/${post.slug}/`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <description>${xmlEscape(post.excerpt ?? "")}</description>
      <pubDate>${rfcDate(post.publishedAt)}</pubDate>
      <category>${xmlEscape(post.category ?? "Leadership")}</category>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length ? rfcDate(posts[0].updatedAt ?? posts[0].publishedAt) : rfcDate(Date.now());

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${site.name} — Insights`)}</title>
    <link>${xmlEscape(`${SITE_URL}/#insights`)}</link>
    <description>${xmlEscape("Essays on leadership, authority, influence, and executive presence.")}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const posts = readPosts();

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), buildRobots(), "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), buildRss(posts), "utf8");

  console.log(
    `seo:generate wrote sitemap.xml (${STATIC_ROUTES.length} pages, ${posts.length} posts), robots.txt, and rss.xml.`,
  );
  console.log(`Canonical origin: ${SITE_URL} · Program: ${program.slug}`);
}

main();
