// Audits the static export in out/ for metadata, structured data, links, and
// placeholder content. Run after `npm run build`:
//   npm run seo:audit
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const REPORT_DIR = path.join(ROOT, "reports");
const SITE = "https://theindustryleader.net";

if (!fs.existsSync(OUT_DIR)) {
  console.error("out/ not found. Run `npm run build` before `npm run seo:audit`.");
  process.exit(1);
}

const errors = [];
const warnings = [];
const error = (page, message) => errors.push({ page, message });
const warn = (page, message) => warnings.push({ page, message });

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target, files);
    else files.push(target);
  }
  return files;
}

function routeFor(file) {
  const relative = path.relative(OUT_DIR, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function decode(value) {
  return String(value)
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function firstMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1].trim()) : null;
}

function metaContent(html, key, attribute = "name") {
  const pattern = new RegExp(
    `<meta[^>]*${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
    "i",
  );
  const tag = html.match(pattern)?.[0];
  return tag ? firstMatch(tag, /content=["']([^"']*)["']/i) : null;
}

function linkHref(html, rel) {
  const pattern = new RegExp(
    `<link[^>]*rel=["']${rel}["'][^>]*>|<link[^>]*href=["'][^"']*["'][^>]*rel=["']${rel}["'][^>]*>`,
    "i",
  );
  const tag = html.match(pattern)?.[0];
  return tag ? firstMatch(tag, /href=["']([^"']*)["']/i) : null;
}

const REQUIRED_SCHEMA_FIELDS = {
  Article: ["headline", "datePublished", "author"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Person: ["name"],
  ProfessionalService: ["name"],
  Service: ["name"],
  WebSite: ["name", "url"],
  Organization: ["name"],
};

const EXPECTED_TYPES = {
  "/": ["ProfessionalService", "Person"],
  "/program/": ["Service", "FAQPage"],
  "/projects/": ["BreadcrumbList"],
  "/testimonials/": ["BreadcrumbList"],
  "/contact/": ["BreadcrumbList"],
  "/insights/strategic-judgment/": ["Article", "BreadcrumbList"],
};

function collectSchemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
  } else if (value && typeof value === "object") {
    if (value["@type"]) {
      const list = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
      list.forEach((type) => types.add(type));
    }
    Object.values(value).forEach((item) => collectSchemaTypes(item, types));
  }
  return types;
}

function schemaUrlStrings(value, urls = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => schemaUrlStrings(item, urls));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === "string" && /^(url|image|logo|sameAs|item|@id|contentUrl)$/.test(key)) {
        urls.push(item);
      } else if (typeof item === "string" && /^https?:\/\//.test(item)) {
        urls.push(item);
      } else {
        schemaUrlStrings(item, urls);
      }
    }
  }
  return urls;
}

function targetExists(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return fs.existsSync(path.join(OUT_DIR, "index.html"));
  const relative = clean.replace(/^\//, "");
  const candidates = [
    path.join(OUT_DIR, relative),
    path.join(OUT_DIR, relative, "index.html"),
    path.join(OUT_DIR, `${relative}.html`),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

const htmlFiles = walk(OUT_DIR)
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !path.relative(OUT_DIR, file).startsWith("_next"));

const titles = new Map();
const descriptions = new Map();
const pages = [];

for (const file of htmlFiles) {
  const page = routeFor(file);
  const html = fs.readFileSync(file, "utf8");
  const isNotFound = page === "/404.html" || page === "/404/";
  const isSpecial = isNotFound || page === "/_not-found/";
  const record = { page, title: null, description: null, schemaTypes: [] };
  pages.push(record);

  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  record.title = title;
  if (!title) error(page, "Missing <title>.");
  else {
    if (!isSpecial && title.length > 65) {
      warn(page, `Title is ${title.length} characters (aim for 60 or fewer).`);
    }
    if (!isSpecial && title.length < 20) warn(page, `Title is only ${title.length} characters.`);
    if (!isSpecial) titles.set(title, [...(titles.get(title) ?? []), page]);
  }

  const description = metaContent(html, "description");
  record.description = description;
  if (!description) error(page, "Missing meta description.");
  else {
    if (!isSpecial && description.length > 165) {
      warn(page, `Description is ${description.length} characters (aim for 155 or fewer).`);
    }
    if (!isSpecial && description.length < 70) {
      warn(page, `Description is only ${description.length} characters.`);
    }
    if (!isSpecial) {
      descriptions.set(description, [...(descriptions.get(description) ?? []), page]);
    }
  }

  const canonical = linkHref(html, "canonical");
  if (!canonical) error(page, "Missing canonical link.");
  else {
    if (!canonical.startsWith(`${SITE}/`) && canonical !== `${SITE}/`) {
      error(page, `Canonical is not on the production origin: ${canonical}`);
    }
    if (!canonical.endsWith("/") && !canonical.endsWith(".html") && !isNotFound) {
      warn(page, `Canonical does not use the trailing-slash form: ${canonical}`);
    }
  }

  const og = {
    title: metaContent(html, "og:title", "property"),
    description: metaContent(html, "og:description", "property"),
    url: metaContent(html, "og:url", "property"),
    type: metaContent(html, "og:type", "property"),
    image: metaContent(html, "og:image", "property"),
    imageWidth: metaContent(html, "og:image:width", "property"),
    imageHeight: metaContent(html, "og:image:height", "property"),
    imageAlt: metaContent(html, "og:image:alt", "property"),
  };
  for (const [key, value] of Object.entries(og)) {
    if (!value) error(page, `Missing Open Graph field og:${key}.`);
  }
  if (og.image && !og.image.startsWith("https://")) {
    error(page, `Open Graph image is not an absolute HTTPS URL: ${og.image}`);
  }
  if (og.image && og.image.startsWith(SITE)) {
    const imagePath = path.join(OUT_DIR, og.image.slice(SITE.length));
    if (!fs.existsSync(imagePath)) error(page, `Open Graph image file is missing: ${og.image}`);
  }

  const twitter = {
    card: metaContent(html, "twitter:card"),
    title: metaContent(html, "twitter:title"),
    description: metaContent(html, "twitter:description"),
    image: metaContent(html, "twitter:image"),
  };
  for (const [key, value] of Object.entries(twitter)) {
    if (!value) error(page, `Missing Twitter card field twitter:${key}.`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) error(page, `Expected exactly one H1, found ${h1Count}.`);

  const lang = firstMatch(html, /<html[^>]*lang=["']([^"']+)["']/i);
  if (lang !== "en-US") error(page, `Expected <html lang="en-US">, found ${lang ?? "none"}.`);

  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLdBlocks.length) error(page, "Missing JSON-LD structured data.");

  const schemaTypes = new Set();
  for (const [, raw] of jsonLdBlocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      error(page, `JSON-LD does not parse: ${parseError.message}`);
      continue;
    }
    if (data["@context"] !== "https://schema.org" && data["@context"] !== "http://schema.org") {
      const topLevel = Array.isArray(data) ? data : [data];
      const missing = topLevel.filter(
        (node) => node && typeof node === "object" && !node["@context"],
      );
      if (missing.length) {
        error(page, "JSON-LD is missing an @context of https://schema.org.");
      }
    }
    collectSchemaTypes(data, schemaTypes);
    const urls = schemaUrlStrings(data);
    for (const url of urls) {
      if (!/^https:\/\//.test(url)) warn(page, `JSON-LD URL is not HTTPS: ${url}`);
    }
  }
  record.schemaTypes = [...schemaTypes];

  if (schemaTypes.has("Review") || schemaTypes.has("AggregateRating")) {
    error(page, "Review/AggregateRating schema is not permitted for this site.");
  }

  for (const [type, fields] of Object.entries(REQUIRED_SCHEMA_FIELDS)) {
    if (!schemaTypes.has(type)) continue;
    for (const field of fields) {
      if (!jsonLdBlocks.some(([, raw]) => {
        try {
          const parsed = JSON.parse(raw);
          return JSON.stringify(parsed).includes(`"${field}"`);
        } catch {
          return false;
        }
      })) {
        warn(page, `${type} schema is missing ${field}.`);
      }
    }
  }

  for (const expected of EXPECTED_TYPES[page] ?? []) {
    if (!schemaTypes.has(expected)) error(page, `Expected ${expected} schema on ${page}.`);
  }

  const placeholderPatterns = [
    ["example.com", /example\.com/i],
    ["localhost", /localhost/i],
    ["127.0.0.1", /127\.0\.0\.1/],
    ["your-domain", /your-domain/i],
    ["TODO", /\bTODO\b/],
    ["TBD", /\bTBD\b/],
    ["http:// production link", new RegExp(`http://theindustryleader\\.net`, "i")],
  ];
  // The internal style guide uses deliberate examples (e.g. jane@example.com)
  // to document form states. It is noindex and disallowed in robots.txt.
  if (page !== "/style-guide/") {
    for (const [label, pattern] of placeholderPatterns) {
      if (pattern.test(html)) error(page, `Placeholder or local URL found: ${label}.`);
    }
  }

  const hrefs = [...html.matchAll(/<a[^>]*href=["']([^"']+)["']/gi)].map((match) => decode(match[1]));
  for (const href of hrefs) {
    if (
      /^(mailto:|tel:|https?:|#)/i.test(href) ||
      href.startsWith("/_next/") ||
      href.startsWith("//")
    ) {
      continue;
    }
    if (href.startsWith("/") && !targetExists(href)) {
      error(page, `Broken internal link: ${href}`);
    }
  }
}

for (const [title, pagesWithTitle] of titles) {
  if (pagesWithTitle.length > 1) {
    warn(pagesWithTitle.join(", "), `Duplicate title: “${title}”`);
  }
}
for (const [, pagesWithDescription] of descriptions) {
  if (pagesWithDescription.length > 1) {
    warn(pagesWithDescription.join(", "), "Duplicate meta description.");
  }
}

const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  error("/sitemap.xml", "Sitemap is missing from the export.");
} else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  for (const location of locations) {
    if (!location.startsWith(SITE)) {
      error("/sitemap.xml", `Sitemap URL is off-origin: ${location}`);
      continue;
    }
    if (!targetExists(location.slice(SITE.length))) {
      error("/sitemap.xml", `Sitemap URL has no exported page: ${location}`);
    }
  }
  if (!locations.length) error("/sitemap.xml", "Sitemap contains no URLs.");
}

for (const required of ["robots.txt", "rss.xml"]) {
  if (!fs.existsSync(path.join(OUT_DIR, required))) {
    error(`/${required}`, "Required SEO file is missing from the export.");
  }
}

fs.mkdirSync(REPORT_DIR, { recursive: true });
const report = { generatedAt: new Date().toISOString(), pagesAudited: pages.length, errors, warnings, pages };
fs.writeFileSync(path.join(REPORT_DIR, "seo-audit.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`SEO audit: ${pages.length} HTML pages, ${errors.length} errors, ${warnings.length} warnings.`);
for (const item of errors) console.error(`ERROR  ${item.page}  ${item.message}`);
for (const item of warnings) console.warn(`WARN   ${item.page}  ${item.message}`);
console.log(`Report: ${path.relative(ROOT, path.join(REPORT_DIR, "seo-audit.json"))}`);

if (errors.length) process.exit(1);
