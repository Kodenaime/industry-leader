import { Reveal } from "@/components/motion";
import { TestimonialLink } from "@/components/content/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { APPLY_HREF } from "@/lib/links";
import type { Testimonial } from "@/lib/content/schemas";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const visible = testimonials.slice(0, 3);
  if (!visible.length) return null;
  const hasPlaceholders = visible.some((testimonial) => /placeholder/i.test(testimonial.quote));

  return (
    <Section id="testimonials" className="scroll-mt-24">
      <Container className="space-y-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Client testimonials"
              title="What changes when capability meets authority."
              className="max-w-2xl"
            />
            <div className="shrink-0">
              <TestimonialLink />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <TestimonialCarousel testimonials={visible} />
        </Reveal>
        {hasPlaceholders ? (
          <p className="text-xs text-stone">
            Quotes marked as placeholders are awaiting client approval and will be replaced
            before launch.
          </p>
        ) : null}
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <Button href="/testimonials/" variant="secondary">
              Read all testimonials
            </Button>
            <Button
              href={APPLY_HREF}
              data-analytics="cta_click"
              data-analytics-label="testimonials-apply"
              data-analytics-location="testimonials"
            >
              Apply for the program
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
