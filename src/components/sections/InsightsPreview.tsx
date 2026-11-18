import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PostCard } from "@/components/content/PostCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PostMeta } from "@/lib/content/loaders";

export function InsightsPreview({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <Section id="insights" className="scroll-mt-24">
      <Container className="space-y-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Insights"
              title="Notes on leadership, authority, and influence."
              description="Practical essays on the work behind a credible leadership presence."
              className="max-w-2xl"
            />
            <Link
              href="/rss.xml"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 transition-colors hover:decoration-gold-deep"
            >
              Subscribe via RSS
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
