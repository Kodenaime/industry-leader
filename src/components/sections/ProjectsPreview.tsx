import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CaseStudyCard } from "@/components/content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS_HREF } from "@/lib/links";
import type { CaseStudy } from "@/lib/content/schemas";

export function ProjectsPreview({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (!caseStudies.length) return null;

  return (
    <Section tone="cloud">
      <Container className="space-y-12">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Projects"
              title="What the work looks like in practice."
              description="Anonymized examples of the challenge and the shift."
              className="max-w-2xl"
            />
            <Link
              href={PROJECTS_HREF}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 transition-colors hover:decoration-gold-deep"
            >
              Explore all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.id} className="h-full">
              <CaseStudyCard study={study} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <Button href={PROJECTS_HREF} variant="secondary">
            See the full project record
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
