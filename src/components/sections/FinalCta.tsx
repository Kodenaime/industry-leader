import { ArrowRight, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { APPLY_HREF, BOOKING_HREF, BOOKING_IS_EXTERNAL } from "@/lib/links";

export function FinalCta({
  title = "Your next level is a decision away.",
  description = "If you are ready to turn expertise into authority, start with the application. You will know quickly whether the program is the right fit.",
  primaryLabel = "Apply for the Program",
  primaryHref = APPLY_HREF,
  secondaryLabel = "Book a discovery call",
  secondaryHref = BOOKING_HREF,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <Container className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl space-y-5">
          <p className="type-eyebrow text-gold-soft">Next step</p>
          <h2 className="type-h2 text-balance text-cloud">{title}</h2>
          <p className="text-base leading-relaxed text-cloud/75">{description}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button
              href={primaryHref}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              data-analytics="cta_click"
              data-analytics-label={`final-cta-${primaryLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              data-analytics-location="final-cta"
            >
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              size="lg"
              variant="secondary"
              className="border-cloud/25 text-cloud hover:border-cloud/45 hover:bg-cloud/10"
              icon={<CalendarCheck className="h-4 w-4" />}
              data-analytics="booking_click"
              data-analytics-label={`final-cta-${secondaryLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              data-analytics-location="final-cta"
              {...(BOOKING_IS_EXTERNAL && secondaryHref === BOOKING_HREF
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
