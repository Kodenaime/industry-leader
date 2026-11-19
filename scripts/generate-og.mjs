// Generates branded 1200x630 Open Graph images into public/og/.
//   npm run og:generate
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OG_DIR = path.join(PUBLIC_DIR, "og");
const INSIGHTS_DIR = path.join(ROOT, "content", "insights");

const BRAND = {
  ink: "#171717",
  charcoal: "#242321",
  graphite: "#4A4844",
  stone: "#6F6B64",
  mist: "#F4F2EE",
  cloud: "#FAF9F6",
  line: "#E2DED6",
  gold: "#C6A15B",
  goldSoft: "#E9DCC3",
};

const PAGES = [
  { slug: "default", eyebrow: "The Industry Leader", title: "Become the leader your industry follows.", subtitle: "Leadership coaching for capable professionals." },
  { slug: "home", eyebrow: "The Industry Leader", title: "Become the leader your industry follows.", subtitle: "One-on-one coaching for clarity, presence, and influence." },
  { slug: "program", eyebrow: "8-week 1:1 coaching program", title: "Becoming an Industry Leader", subtitle: "Turn expertise into authority, influence, and lasting impact." },
  { slug: "about", eyebrow: "About Matthew", title: "A practitioner, not just a theorist.", subtitle: "Leadership coaching by Matthew Ogieva." },
  { slug: "projects", eyebrow: "Projects", title: "Real leaders. Real shifts.", subtitle: "What changes when capability meets authority." },
  { slug: "testimonials", eyebrow: "Client testimonials", title: "In their words.", subtitle: "What leaders say about the work." },
  { slug: "contact", eyebrow: "Contact", title: "Start a conversation.", subtitle: "Applications, speaking, and advisory inquiries." },
  { slug: "free-guide", eyebrow: "Free guide", title: "The Authority Blueprint", subtitle: "Five shifts that make you the leader your industry follows." },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text, maxCharsPerLine) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= maxCharsPerLine) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function titleSize(title) {
  if (title.length > 58) return 66;
  if (title.length > 42) return 76;
  return 88;
}

function buildSvg({ eyebrow, title, subtitle }) {
  const size = titleSize(title);
  const lines = wrapText(title, size > 76 ? 18 : 22).slice(0, 3);
  const lineHeight = Math.round(size * 1.06);
  const blockHeight = lines.length * lineHeight;
  const startY = 300 - Math.round(blockHeight / 2) + lineHeight;

  const titleLines = lines
    .map(
      (line, index) =>
        `<text x="96" y="${startY + index * lineHeight}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="600" fill="${BRAND.ink}" letter-spacing="-1.5">${escapeXml(line)}</text>`,
    )
    .join("\n  ");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BRAND.mist}" />
  <rect x="0" y="0" width="1200" height="10" fill="${BRAND.gold}" />
  <rect x="1040" y="0" width="160" height="630" fill="${BRAND.charcoal}" />
  <rect x="1000" y="0" width="10" height="630" fill="${BRAND.gold}" />
  <circle cx="1120" cy="520" r="58" fill="none" stroke="${BRAND.gold}" stroke-width="1.5" opacity="0.7" />
  <text x="1120" y="548" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="52" fill="${BRAND.goldSoft}">IL</text>

  <text x="96" y="94" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="4.5" fill="${BRAND.gold}">${escapeXml(eyebrow.toUpperCase())}</text>
  <rect x="96" y="124" width="64" height="2" fill="${BRAND.gold}" />
  ${titleLines}
  <text x="96" y="536" font-family="Helvetica, Arial, sans-serif" font-size="23" fill="${BRAND.graphite}">${escapeXml(subtitle)}</text>
  <rect x="96" y="566" width="360" height="1" fill="${BRAND.line}" />
  <text x="96" y="598" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="1.2" fill="${BRAND.stone}">THEINDUSTRYLEADER.NET</text>
</svg>`;
}

function readPosts() {
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return {
        slug,
        eyebrow: data.category ? `Insights · ${data.category}` : "Insights",
        title: data.title ?? slug,
        subtitle: data.excerpt ?? "The Industry Leader",
        draft: data.draft === true,
      };
    })
    .filter((post) => !post.draft);
}

async function render(target, spec) {
  const svg = buildSvg(spec);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(target);
}

async function main() {
  fs.mkdirSync(OG_DIR, { recursive: true });
  for (const page of PAGES) {
    await render(path.join(OG_DIR, `${page.slug}.png`), page);
  }
  const posts = readPosts();
  for (const post of posts) {
    await render(path.join(OG_DIR, "insights", `${post.slug}.png`), post);
  }
  console.log(`og:generate wrote ${PAGES.length} page images and ${posts.length} post images to public/og/.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
