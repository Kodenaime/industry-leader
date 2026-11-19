import { ArrowRight, Check } from "lucide-react";
import { EditorialImage } from "@/components/content";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { program } from "@/content/programs";

export function ProgramPreview() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full border border-gold/10"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="space-y-8">
          <Reveal>
            <p className="type-eyebrow text-gold-soft">The program</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="type-h2 text-balance text-cloud">
              In eight weeks, build the clarity, presence, and influence that make you the
              leader others seek out.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-cloud/75">
              Becoming an Industry Leader is private, application-only coaching. We work
              directly on your real situation: the decisions in front of you, the
              relationships that matter, and the reputation you want to earn.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="grid gap-3 text-sm text-cloud/85 sm:grid-cols-2">
              {program.includes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={program.ctaHref} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                {program.ctaLabel}
              </Button>
              <Button href="/program/" variant="secondary" className="border-cloud/25 text-cloud hover:bg-cloud/10 hover:border-cloud/40">
                See the curriculum
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-6">
          <div className="overflow-hidden rounded-sm border border-cloud/20">
            <EditorialImage
              src="/images/sections/leadership-strategy.jpg"
              alt="Senior professionals collaborating around a table in a modern boardroom"
              width={1200}
              height={675}
              className="h-56 w-full object-cover sm:h-64 lg:h-72"
            />
          </div>
          <div className="relative -mt-8 mx-3 rounded border border-cloud/20 bg-charcoal/95 p-6 shadow-lift sm:mx-5 sm:p-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cloud/70">Duration</dt>
                <dd className="mt-1 font-display text-2xl text-cloud">{program.duration}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cloud/70">Format</dt>
                <dd className="mt-1 font-display text-2xl text-cloud">1:1 private</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cloud/70">Sessions</dt>
                <dd className="mt-1 font-display text-2xl text-cloud">8 × 60 min</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-cloud/70">Investment</dt>
                <dd className="mt-1 text-sm leading-relaxed text-cloud/75">
                  Discussed on your discovery call
                </dd>
              </div>
            </dl>
            <div className="mt-8 border-t border-cloud/15 pt-6">
              <p className="text-sm leading-relaxed text-cloud/70">
                {program.investmentNote}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
