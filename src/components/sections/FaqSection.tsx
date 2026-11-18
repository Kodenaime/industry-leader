import { Reveal } from "@/components/motion";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/lib/content/schemas";

export function FaqSection({
  faqs,
  eyebrow = "Questions",
  title = "Answers before you apply.",
  description,
  cta,
  className,
  id,
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
  className?: string;
  id?: string;
}) {
  if (!faqs.length) return null;
  return (
    <Section id={id} className={className}>
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {cta ? (
              <Button href={cta.href} variant="secondary">
                {cta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <Accordion
            allowMultiple
            items={faqs.map((faq) => ({
              id: faq.id,
              title: faq.question,
              content: <p className="text-sm leading-relaxed text-graphite">{faq.answer}</p>,
            }))}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
