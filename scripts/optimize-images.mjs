// Generates WebP and AVIF variants for raster images in public/ and flags
// oversized files. Originals are kept so <picture> fallbacks keep working.
//   npm run images:optimize
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const VARIANT_FORMATS = [
  { extension: ".webp", format: "webp", options: { quality: 82, effort: 5 } },
  { extension: ".avif", format: "avif", options: { quality: 55, effort: 5 } },
];
const OVERSIZE_KB = 300;

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target, files);
    else files.push(target);
  }
  return files;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const files = walk(PUBLIC_DIR);
const raster = files.filter((file) => RASTER_EXTENSIONS.has(path.extname(file).toLowerCase()));
const oversized = files
  .filter((file) => /\.(png|jpe?g|webp|avif|gif|svg|pdf)$/i.test(file))
  .map((file) => ({ file, size: fs.statSync(file).size }))
  .filter((entry) => entry.size > OVERSIZE_KB * 1024)
  .sort((a, b) => b.size - a.size);

if (!raster.length) {
  console.log("images:optimize found no PNG or JPEG source images in public/.");
  console.log("Add client photography under public/images/, then rerun this script.");
} else {
  console.log(`images:optimize processing ${raster.length} source image(s).`);
}

let generated = 0;
for (const source of raster) {
  const metadata = await sharp(source).metadata();
  const base = source.replace(/\.(png|jpe?g)$/i, "");
  console.log(`\n${path.relative(PUBLIC_DIR, source)} — ${metadata.width}x${metadata.height}, ${kb(fs.statSync(source).size)}`);

  for (const variant of VARIANT_FORMATS) {
    const target = `${base}${variant.extension}`;
    const sourceTime = fs.statSync(source).mtimeMs;
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= sourceTime) {
      console.log(`  ${path.extname(target)} up to date`);
      continue;
    }
    await sharp(source)[variant.format](variant.options).toFile(target);
    generated += 1;
    const sourceSize = fs.statSync(source).size;
    const targetSize = fs.statSync(target).size;
    const saved = Math.max(0, Math.round((1 - targetSize / sourceSize) * 100));
    console.log(`  wrote ${path.basename(target)} (${kb(targetSize)}, ${saved}% smaller)`);
  }
}

console.log(`\nGenerated ${generated} variant(s).`);
if (oversized.length) {
  console.warn(`Oversized assets over ${OVERSIZE_KB} KB:`);
  for (const entry of oversized) {
    console.warn(`  ${path.relative(PUBLIC_DIR, entry.file)} — ${kb(entry.size)}`);
  }
} else {
  console.log(`No public assets exceed ${OVERSIZE_KB} KB.`);
}
