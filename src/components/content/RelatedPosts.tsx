import { PostCard } from "@/components/content/PostCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PostMeta } from "@/lib/content/loaders";

export function RelatedPosts({ post, posts }: { post: PostMeta; posts: PostMeta[] }) {
  const candidates = posts.filter((item) => item.slug !== post.slug);
  const sameCategory = candidates.filter((item) => item.category === post.category);
  const others = candidates.filter((item) => item.category !== post.category);
  const related = [...sameCategory, ...others].slice(0, 3);

  if (!related.length) return null;

  return (
    <Section tone="cloud">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Keep reading"
          title="Related insights"
          description="More essays on leadership, authority, and influence."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <PostCard key={item.slug} post={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
