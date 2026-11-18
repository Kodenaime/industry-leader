import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ReactElement } from "react";
import { z } from "zod";
import { author } from "@/content/author";
import { aboutPage } from "@/content/about";
import { caseStudies } from "@/content/case-studies";
import { faqs } from "@/content/faqs";
import { leadMagnet } from "@/content/lead-magnet";
import { program } from "@/content/programs";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { compileMdx, extractToc, getReadingTime, type MdxComponents, type TocHeading } from "./mdx";
import {
  aboutPageSchema,
  authorSchema,
  caseStudySchema,
  faqSchema,
  leadMagnetSchema,
  legalPageSchema,
  postFrontmatterSchema,
  programSchema,
  siteSettingsSchema,
  testimonialSchema,
  type Author,
  type AboutPage,
  type CaseStudy,
  type Faq,
  type LeadMagnet,
  type LegalPage,
  type PostFrontmatter,
  type Program,
  type SiteSettings,
  type Testimonial,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");
const INSIGHTS_DIR = path.join(CONTENT_DIR, "insights");
const LEGAL_DIR = path.join(CONTENT_DIR, "legal");

function validate<T>(schema: z.ZodType<T>, value: unknown, label: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(`${label} is invalid:\n${result.error.message}`);
  }
  return result.data;
}

export function getSiteSettings(): SiteSettings {
  return validate(siteSettingsSchema, site, "content/site.ts");
}

export function getAuthor(): Author {
  return validate(authorSchema, author, "content/author.ts");
}

export function getAboutPage(): AboutPage {
  return validate(aboutPageSchema, aboutPage, "content/about.ts");
}

export function getProgram(): Program {
  return validate(programSchema, program, "content/programs.ts");
}

export function getTestimonials(): Testimonial[] {
  return validate(z.array(testimonialSchema), testimonials, "content/testimonials.ts").sort(
    (a, b) => a.order - b.order,
  );
}

export function getFaqs(): Faq[] {
  return validate(z.array(faqSchema), faqs, "content/faqs.ts").sort((a, b) => a.order - b.order);
}

export function getLeadMagnet(): LeadMagnet {
  return validate(leadMagnetSchema, leadMagnet, "content/lead-magnet.ts");
}

export function getCaseStudies(): CaseStudy[] {
  return validate(z.array(caseStudySchema), caseStudies, "content/case-studies.ts").sort(
    (a, b) => a.order - b.order,
  );
}

export type PostMeta = PostFrontmatter & {
  href: string;
  readingTime: ReturnType<typeof getReadingTime>;
};

export type Post = PostMeta & {
  body: string;
  toc: TocHeading[];
  content: ReactElement;
};

export type LegalPageData = LegalPage & {
  body: string;
  toc: TocHeading[];
  content: ReactElement;
};

function getPostSlugs(): string[] {
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

function readPostFile(slug: string) {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    throw new Error(`Post not found: ${slug}`);
  }

  const { data, content } = matter(raw);
  const frontmatter = validate(postFrontmatterSchema, data, `content/insights/${slug}.mdx`);
  if (frontmatter.slug !== slug) {
    throw new Error(
      `Post slug mismatch in ${slug}.mdx: expected "${slug}", got "${frontmatter.slug}".`,
    );
  }

  return { frontmatter, body: content.trim() };
}

function toPostMeta(frontmatter: PostFrontmatter, body: string): PostMeta {
  return {
    ...frontmatter,
    href: `/insights/${frontmatter.slug}/`,
    readingTime: getReadingTime(body),
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter(({ frontmatter }) => frontmatter.draft !== true)
    .map(({ frontmatter, body }) => toPostMeta(frontmatter, body))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostBySlug(slug: string, components?: MdxComponents): Promise<Post> {
  const { frontmatter, body } = readPostFile(slug);
  const meta = toPostMeta(frontmatter, body);
  const { content } = await compileMdx(body, components);
  return { ...meta, body, toc: extractToc(body), content };
}

export async function getLegalPage(
  slug: string,
  components?: MdxComponents,
): Promise<LegalPageData> {
  const filePath = path.join(LEGAL_DIR, `${slug}.mdx`);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    throw new Error(`Legal page not found: ${slug}`);
  }

  const { data, content } = matter(raw);
  const meta = validate(legalPageSchema, data, `content/legal/${slug}.mdx`);
  if (meta.slug !== slug) {
    throw new Error(
      `Legal page slug mismatch in ${slug}.mdx: expected "${slug}", got "${meta.slug}".`,
    );
  }

  const compiled = await compileMdx(content, components);
  return { ...meta, body: content.trim(), toc: extractToc(content), content: compiled.content };
}
