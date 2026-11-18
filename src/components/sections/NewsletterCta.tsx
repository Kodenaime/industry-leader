import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function NewsletterCta({ source = "insights" }: { source?: string }) {
  return (
    <Section tone="dark">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-4">
            <p className="type-eyebrow text-gold-soft">The Industry Leader Letter</p>
            <h2 className="type-h2 text-balance text-cloud">
              One useful idea, once in a while.
            </h2>
            <p className="text-base leading-relaxed text-cloud/75">
              Occasional notes on authority, presence, and influence. No noise, no daily
              barrage — just the thinking worth keeping.
            </p>
          </div>
          <div className="rounded border border-cloud/15 bg-cloud/5 p-5 sm:p-6">
            <NewsletterForm variant="dark" source={source} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
