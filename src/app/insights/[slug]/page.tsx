/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AuthorBox,
  RelatedPosts,
  ShareLinks,
  TableOfContents,
  mdxComponents,
} from "@/components/content";
import { Breadcrumbs, PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { NewsletterCta } from "@/components/sections";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllPosts, getAuthor, getPostBySlug, type Post } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post: Post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return {};
  }

  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/insights/${post.slug}/`,
    image: `/og/insights/${post.slug}.png`,
    imageAlt: post.title,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [getAuthor().name],
    keywords: post.tags,
  });
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: Post;
  try {
    post = await getPostBySlug(slug, mdxComponents);
  } catch {
    notFound();
  }

  const author = getAuthor();
  const allPosts = getAllPosts();
  const path = `/insights/${post.slug}/`;

  return (
    <PageShell>
      <JsonLd data={articleSchema(post, author)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/#insights" },
          { name: post.title, path },
        ])}
      />

      <article>
        <header className="border-b border-line bg-mist pb-12 pt-8 sm:pb-16">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/#insights" },
                { label: post.title },
              ]}
              className="mb-10"
            />

            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-stone">
                <Badge variant="gold" className="capitalize">
                  {post.category}
                </Badge>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readingTime.text}
                </span>
              </div>

              <h1 className="type-h1 text-balance">{post.title}</h1>
              <p className="type-lead max-w-2xl">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone">
                <span>
                  By{" "}
                  <Link href="/#about" className="font-medium text-ink hover:text-gold-deep">
                    {author.name}
                  </Link>
                </span>
                {post.updatedAt ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Updated {formatDate(post.updatedAt)}</span>
                  </>
                ) : null}
              </div>
            </div>

            <div className="relative mt-10 aspect-[16/7] overflow-hidden rounded border border-line bg-charcoal">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.coverAlt ?? post.title}
                  width={1600}
                  height={700}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="relative h-full w-full p-6 sm:p-10">
                  <span className="font-display text-5xl text-gold/90 sm:text-7xl">IL</span>
                  <span className="absolute inset-x-6 bottom-6 h-px bg-gold/40 sm:inset-x-10 sm:bottom-10" />
                  <span className="absolute bottom-8 right-6 hidden text-xs font-semibold uppercase tracking-[0.18em] text-cloud/70 sm:right-10 sm:block">
                    The Industry Leader
                  </span>
                </div>
              )}
            </div>
          </Container>
        </header>

        <Section className="pb-16 pt-10 sm:pt-12">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
              <div className="min-w-0">
                <TableOfContents headings={post.toc} variant="mobile" className="mb-8" />

                <div
                  className="prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:text-ink prose-p:text-graphite prose-a:font-medium prose-a:text-gold-deep prose-a:decoration-gold-deep/30 prose-a:underline-offset-4 prose-a:hover:decoration-gold-deep prose-strong:text-ink prose-blockquote:border-l-gold prose-blockquote:bg-cloud prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:font-display prose-blockquote:text-xl prose-blockquote:not-italic prose-blockquote:text-ink prose-li:marker:text-gold-deep prose-img:rounded prose-img:border prose-img:border-line prose-hr:border-line prose-table:text-sm [&_h2_a]:text-inherit [&_h2_a]:no-underline [&_h3_a]:text-inherit [&_h3_a]:no-underline"
                >
                  {post.content}
                </div>

                <ShareLinks path={path} title={post.title} className="mt-12" />
                <AuthorBox author={author} />

                <div className="mt-10">
                  <Link
                    href="/#insights"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    All insights
                  </Link>
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents headings={post.toc} />
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="text-sm font-semibold text-ink">Ready to go deeper?</p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">
                      The 8-week program turns these ideas into a personal leadership practice.
                    </p>
                    <Link
                      href="/#apply"
                      className="mt-3 inline-flex text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
                    >
                      Apply for the program
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        <RelatedPosts post={post} posts={allPosts} />
        <NewsletterCta source={`post-${post.slug}`} />
      </article>
    </PageShell>
  );
}
