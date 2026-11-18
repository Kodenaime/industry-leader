import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export function getReadingTime(text: string) {
  return readingTime(text);
}

function cleanHeadingText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\s*#+\s*$/, "")
    .trim();
}

export function extractToc(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = cleanHeadingText(match[2]);
    if (!text) continue;

    const id = slugger.slug(text);
    if (level >= 2) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export type MdxComponents = NonNullable<MDXRemoteProps["components"]>;

export async function compileMdx(source: string, components?: MdxComponents) {
  return compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });
}
