import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";
import { EditorialImage } from "@/components/content";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { FinalCta, PageHero, StickyApplyBar } from "@/components/sections";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProgram } from "@/lib/content/loaders";
import { TESTIMONIALS_HREF } from "@/lib/links";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Becoming an Industry Leader Program",
  description:
    "An 8-week, one-to-one coaching program for capable professionals ready to turn expertise into authority, influence, and lasting impact. Application only.",
  path: "/program/",
  image: "/og/program.png",
  keywords: [
    "leadership program",
    "executive coaching",
    "leadership development",
    "authority",
    "executive presence",
  ],
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Program" }];

export default function ProgramPage() {
  const program = getProgram();

  return (
    <PageShell className="pb-16 lg:pb-0">
      <JsonLd
        data={[
          serviceSchema(program),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Program", path: "/program/" },
          ]),
        ]}
      />
      <PageHero
        eyebrow={program.eyebrow}
        title={program.headline}
        description={program.subheadline}
        breadcrumbs={crumbs}
        aside={
          <div className="space-y-6">
            <div className="overflow-hidden rounded-sm border border-line bg-charcoal">
              <EditorialImage
                src="/images/sections/executive-coaching.jpg"
                alt="Two professionals in a focused one-to-one coaching conversation"
                width={1200}
                height={675}
                loading="eager"
                fetchPriority="high"
                className="h-56 w-full object-cover sm:h-64 lg:h-72"
              />
            </div>
            <div className="rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">Duration</dt>
                  <dd className="mt-1 font-display text-2xl text-ink">{program.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">Format</dt>
                  <dd className="mt-1 font-display text-2xl text-ink">1:1 private</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">Sessions</dt>
                  <dd className="mt-1 font-display text-2xl text-ink">8 × 60 min</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone">Access</dt>
                  <dd className="mt-1 font-display text-2xl text-ink">Application</dd>
                </div>
              </dl>
              <div className="mt-7 border-t border-line pt-6">
                <p className="text-sm leading-relaxed text-graphite">{program.investmentNote}</p>
                <Button
                  href={program.ctaHref}
                  className="mt-5 w-full"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  {program.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Badge variant="gold">8 weeks</Badge>
          <Badge variant="outline">One-to-one</Badge>
          <Badge variant="outline">Application only</Badge>
        </div>
        <div className="flex flex-wrap gap-3 pt-4">
          <Button href={TESTIMONIALS_HREF} variant="text-link">
            Read client testimonials
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="h-full rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
              <p className="type-eyebrow">Who it is for</p>
              <ul className="mt-5 space-y-3 text-sm text-graphite">
                {program.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="h-full rounded border border-line bg-mist p-6 sm:p-8">
              <p className="type-eyebrow text-stone">Who it is not for</p>
              <ul className="mt-5 space-y-3 text-sm text-graphite">
                {program.notFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-error" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cloud">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeading
              eyebrow="Outcomes"
              title="What you will leave with."
              description="The program is built around outcomes you can point to, not abstract ideas about leadership."
              className="max-w-3xl"
            />
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {program.outcomes.map((outcome, index) => (
              <StaggerItem key={outcome} className="bg-cloud">
                <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
                  <span className="font-display text-2xl leading-none text-gold-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-medium leading-snug text-ink">{outcome}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Curriculum"
              title="Eight weeks, one clear arc."
              description="Each week pairs a focused theme with work you apply immediately in your own role."
              className="max-w-3xl"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion
              allowMultiple
              defaultOpenIds={["week-1"]}
              items={program.curriculum.map((week) => ({
                id: week.id,
                title: (
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-sm text-gold-deep">
                      Week {week.week}
                    </span>
                    <span>{week.title}</span>
                  </span>
                ),
                content: (
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-graphite">{week.summary}</p>
                    <ul className="space-y-2">
                      {week.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2.5 text-sm text-graphite">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Included"
              title="Everything you need to do the work."
              description="The program combines live coaching with the structure and materials that keep momentum between sessions."
            />
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="grid gap-3 text-sm text-cloud/85 sm:grid-cols-2">
              {program.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded border border-cloud/15 bg-cloud/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cloud/70">
                Investment
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cloud/80">{program.investmentNote}</p>
              <Button href={program.ctaHref} className="mt-5">
                {program.ctaLabel}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cloud">
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="type-eyebrow">Questions</p>
              <h2 className="type-h3 text-ink">Answers before you apply.</h2>
              <p className="text-sm leading-relaxed text-graphite">
                The full FAQ lives on the Contact page, alongside the application and discovery-call
                details. If your question is not covered there, send it through the contact form.
              </p>
            </div>
            <Button href="/contact/#faq" variant="secondary" className="shrink-0">
              Read the FAQs
            </Button>
          </Reveal>
        </Container>
      </Section>

      <FinalCta
        title="Your next level is a decision away."
        description="The program is application-only. Start with a short application, then we will talk through fit and next steps."
      />
      <StickyApplyBar />
    </PageShell>
  );
}
