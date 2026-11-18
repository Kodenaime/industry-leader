import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  aboutPageSchema,
  authorSchema,
  caseStudySchema,
  categorySchema,
  faqSchema,
  leadMagnetSchema,
  legalPageSchema,
  postFrontmatterSchema,
  programSchema,
  siteSettingsSchema,
  testimonialSchema,
} from "../src/lib/content/schemas";
import { author } from "../content/author";
import { aboutPage } from "../content/about";
import { caseStudies } from "../content/case-studies";
import { categories } from "../content/categories";
import { faqs } from "../content/faqs";
import { leadMagnet } from "../content/lead-magnet";
import { program } from "../content/programs";
import { site } from "../content/site";
import { testimonials } from "../content/testimonials";

const CONTENT_DIR = path.join(process.cwd(), "content");
const INSIGHTS_DIR = path.join(CONTENT_DIR, "insights");
const LEGAL_DIR = path.join(CONTENT_DIR, "legal");

type Check = {
  label: string;
  run: () => unknown | Promise<unknown>;
};

function validate<T>(schema: z.ZodType<T>, value: unknown, label: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(`${label} is invalid:\n${result.error.message}`);
  }
  return result.data;
}

async function main() {
  const errors: string[] = [];
  const checks: Check[] = [
    {
      label: "content/site.ts",
      run: () => validate(siteSettingsSchema, site, "content/site.ts"),
    },
    {
      label: "content/author.ts",
      run: () => validate(authorSchema, author, "content/author.ts"),
    },
    {
      label: "content/about.ts",
      run: () => validate(aboutPageSchema, aboutPage, "content/about.ts"),
    },
    {
      label: "content/programs.ts",
      run: () => validate(programSchema, program, "content/programs.ts"),
    },
    {
      label: "content/testimonials.ts",
      run: () => validate(z.array(testimonialSchema), testimonials, "content/testimonials.ts"),
    },
    {
      label: "content/faqs.ts",
      run: () => validate(z.array(faqSchema), faqs, "content/faqs.ts"),
    },
    {
      label: "content/lead-magnet.ts",
      run: () => validate(leadMagnetSchema, leadMagnet, "content/lead-magnet.ts"),
    },
    {
      label: "content/categories.ts",
      run: () => validate(z.array(categorySchema), categories, "content/categories.ts"),
    },
    {
      label: "content/case-studies.ts",
      run: () => validate(z.array(caseStudySchema), caseStudies, "content/case-studies.ts"),
    },
  ];

  for (const check of checks) {
    try {
      await check.run();
      console.log(`✓ ${check.label}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ ${check.label}\n${message}`);
      errors.push(check.label);
    }
  }

  const categorySlugs = new Set(categories.map((category) => category.slug));
  const validCategorySlugs = categories.map((category) => category.slug);

  const insightFiles = fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  for (const file of insightFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const label = `content/insights/${file}`;
    try {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = validate(postFrontmatterSchema, data, label);

      if (frontmatter.slug !== slug) {
        throw new Error(`Slug mismatch: expected "${slug}", got "${frontmatter.slug}".`);
      }
      if (!categorySlugs.has(frontmatter.category)) {
        throw new Error(
          `Unknown category "${frontmatter.category}". Valid categories: ${validCategorySlugs.join(", ")}.`,
        );
      }
      if (frontmatter.authorId !== author.id) {
        throw new Error(`Unknown authorId "${frontmatter.authorId}".`);
      }
      if (!content.trim()) {
        throw new Error("MDX body is empty.");
      }

      console.log(`✓ ${label}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ ${label}\n${message}`);
      errors.push(label);
    }
  }

  const legalFiles = fs.readdirSync(LEGAL_DIR).filter((file) => file.endsWith(".mdx"));

  for (const file of legalFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const label = `content/legal/${file}`;
    try {
      const raw = fs.readFileSync(path.join(LEGAL_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const meta = validate(legalPageSchema, data, label);

      if (meta.slug !== slug) {
        throw new Error(`Slug mismatch: expected "${slug}", got "${meta.slug}".`);
      }
      if (!content.trim()) {
        throw new Error("MDX body is empty.");
      }

      console.log(`✓ ${label}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ ${label}\n${message}`);
      errors.push(label);
    }
  }

  if (errors.length > 0) {
    console.error(`\ncontent:check failed with ${errors.length} problem(s).`);
    process.exit(1);
  }

  console.log("\ncontent:check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
