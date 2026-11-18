// Generates a clearly marked placeholder PDF for the free guide so the
// download flow can be tested end to end. Replace the output with the
// client-approved guide before launch.
//   node scripts/generate-guide-placeholder.mjs
import fs from "node:fs";
import path from "node:path";

const OUTPUT = path.join(
  process.cwd(),
  "public",
  "downloads",
  "the-authority-blueprint-placeholder.pdf",
);

const GOLD = "0.776 0.631 0.357 rg";
const INK = "0.09 0.09 0.09 rg";

function escapeText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, "?");
}

function block(lines, { x = 72, y, size = 11, font = "F2", leading = 16 } = {}) {
  const text = lines.map((line) => `(${escapeText(line)}) Tj T*`).join("\n");
  return `BT /${font} ${size} Tf ${leading} TL ${x} ${y} Td\n${text}\nET`;
}

const titlePage = [
  `${GOLD} 0 782 612 10 re f`,
  `${GOLD} 0 0 612 10 re f`,
  `BT ${GOLD} /F1 11 Tf 4 Tc 72 700 Td (FREE GUIDE) Tj ET`,
  `${GOLD} 72 684 64 1.5 re f`,
  `BT ${INK} /F1 40 Tf 72 610 Td (The Authority) Tj ET`,
  `BT ${INK} /F1 40 Tf 72 562 Td (Blueprint) Tj ET`,
  block(["Five shifts that make you the leader", "your industry follows."], {
    y: 500,
    size: 16,
    leading: 24,
  }),
  `${GOLD} 72 430 468 0.75 re f`,
  block(["INSIDE"], { y: 396, size: 9, font: "F1", leading: 12 }),
  block(
    [
      "Own your leadership identity",
      "Sharpen a point of view that commands attention",
      "Build influence without relying on title",
      "Communicate with executive presence",
      "Turn clarity into a 90-day plan",
    ],
    { y: 364, size: 13, leading: 26 },
  ),
  block(["THE INDUSTRY LEADER"], { y: 150, size: 9, font: "F1", leading: 12 }),
  block(["Matthew Ogieva"], { y: 126, size: 14, font: "F1", leading: 18 }),
  block(["Business Reimagined Incorporated"], { y: 106, size: 10, leading: 12 }),
].join("\n");

const shiftsPage = [
  `${GOLD} 0 782 612 10 re f`,
  block(["PLACEHOLDER PDF"], { y: 720, size: 10, font: "F1", leading: 14 }),
  block(
    [
      "This file exists so the download flow can be tested. Replace it with",
      "the approved guide before launch. Section copy below is intentionally",
      "left as a placeholder and is not final content.",
    ],
    { y: 700, size: 10, leading: 15 },
  ),
  block(["The five shifts"], { y: 630, size: 24, font: "F1", leading: 30 }),
  ...buildShiftBlocks(),
  block(["theindustryleader.net"], { y: 56, size: 9, leading: 12 }),
].join("\n");

function buildShiftBlocks() {
  const shifts = [
    "Own your leadership identity",
    "Sharpen a point of view that commands attention",
    "Build influence without relying on title",
    "Communicate with executive presence",
    "Turn clarity into a 90-day plan",
  ];

  return shifts.flatMap((title, index) => {
    const y = 580 - index * 92;
    return [
      block([`0${index + 1}`], { y, size: 11, font: "F1", leading: 14 }),
      block([title], { y: y - 24, size: 14, font: "F1", leading: 18 }),
      block(["[Section content to be supplied in the final approved guide.]"], {
        y: y - 46,
        size: 10,
        leading: 13,
      }),
    ];
  });
}

const objects = [];
const add = (value) => {
  objects.push(value);
  return objects.length;
};

const catalog = add("<< /Type /Catalog /Pages 2 0 R >>");
const pages = add("<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>");
add(
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 7 0 R >>",
);
add(
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 8 0 R >>",
);
add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
add(`<< /Length ${Buffer.byteLength(titlePage)} >>\nstream\n${titlePage}\nendstream`);
add(`<< /Length ${Buffer.byteLength(shiftsPage)} >>\nstream\n${shiftsPage}\nendstream`);

if (catalog !== 1 || pages !== 2) throw new Error("Unexpected PDF object order.");

const header = "%PDF-1.4\n";
const offsets = [];
let body = "";
objects.forEach((value, index) => {
  offsets[index + 1] = Buffer.byteLength(header + body);
  body += `${index + 1} 0 obj\n${value}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(header + body);
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let index = 1; index <= objects.length; index += 1) {
  xref += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}

const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, header + body + xref + trailer);
console.log(`Wrote placeholder guide to ${path.relative(process.cwd(), OUTPUT)}`);
