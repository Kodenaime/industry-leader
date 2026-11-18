#!/usr/bin/env node
/**
 * Package the static export for Hostinger.
 *
 * Usage:
 *   npm run build
 *   npm run release
 *
 * Creates releases/industry-leader-<timestamp>.zip containing the CONTENTS of
 * out/ at the archive root (so it can be extracted directly into public_html/).
 * Hidden files such as .htaccess are included.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const releasesDir = path.join(root, "releases");

const REQUIRED = [
  "index.html",
  ".htaccess",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "rss.xml",
  "icon.svg",
];

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function commandExists(command) {
  try {
    execFileSync(command, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function listArchive(file, method) {
  const args = method === "tar" ? ["-tf", file] : ["-Z1", file];
  return execFileSync(method, args, { encoding: "utf8" });
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

if (!existsSync(path.join(outDir, "index.html"))) {
  fail("out/index.html not found. Run `npm run build` before packaging a release.");
}

const missing = REQUIRED.filter((file) => !existsSync(path.join(outDir, file)));
if (missing.length > 0) {
  fail(`The static export is missing required files: ${missing.join(", ")}`);
}

const placeholderPdf = path.join(outDir, "downloads", "the-authority-blueprint-placeholder.pdf");
if (existsSync(placeholderPdf)) {
  console.warn(
    "⚠ Placeholder free-guide PDF detected. Replace it with the client-approved PDF before launch.",
  );
}

mkdirSync(releasesDir, { recursive: true });

const stamp = new Date()
  .toISOString()
  .replace(/\.\d+Z$/, "")
  .replace(/[-:]/g, "")
  .replace("T", "-");
const archiveName = `industry-leader-${stamp}.zip`;
const archivePath = path.join(releasesDir, archiveName);

let method;
if (process.platform === "win32") {
  if (!commandExists("tar")) fail("`tar` is required to create the release archive on Windows.");
  execFileSync("tar", ["-a", "-cf", archivePath, "-C", outDir, "."], { stdio: "inherit" });
  method = "tar";
} else if (commandExists("zip")) {
  execFileSync("zip", ["-r", "-q", archivePath, "."], { cwd: outDir, stdio: "inherit" });
  method = "zip";
} else if (commandExists("tar")) {
  execFileSync("tar", ["-a", "-cf", archivePath, "-C", outDir, "."], { stdio: "inherit" });
  method = "tar";
} else {
  fail("Neither `zip` nor `tar` is available. Install one and retry.");
}

const entries = new Set(
  listArchive(archivePath, method)
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^\.\//, ""))
    .filter(Boolean),
);
const missingInArchive = REQUIRED.filter((file) => !entries.has(file));
if (missingInArchive.length > 0) {
  fail(`Archive verification failed. Missing: ${missingInArchive.join(", ")}`);
}

const hash = createHash("sha256").update(readFileSync(archivePath)).digest("hex");
const relativeArchive = path.relative(root, archivePath).replaceAll("\\", "/");
const size = statSync(archivePath).size;
const fileCount = readdirSync(outDir, { recursive: true }).length;

// A small checksum file makes upload verification possible on the server.
writeFileSync(
  `${archivePath}.sha256`,
  `${hash}  ${archiveName}\n`,
  "utf8",
);

console.log(`
✓ Release archive created

  File:    ${relativeArchive}
  Size:    ${formatBytes(size)}
  SHA-256: ${hash}
  Entries: ${fileCount} files/folders in out/

Next steps
  1. Upload ${archiveName} to Hostinger (File Manager or SFTP).
  2. Extract it directly into public_html/ so index.html and .htaccess sit at the root.
  3. Confirm "Show hidden files" is enabled and .htaccess was uploaded.
  4. Run the checks in docs/hostinger-deployment.md.
`);
