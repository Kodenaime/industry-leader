import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { CaseStudyCard } from "@/components/content";
import { FinalCta, PageHero } from "@/components/sections";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { Divider } from "@/components/ui/Divider";
import { getCaseStudies } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Projects — Real Leaders, Real Shifts",
  description:
    "Anonymized case studies from leaders who turned expertise into authority. See the challenge, the shift, and the work behind the Becoming an Industry Leader program.",
  path: "/projects/",
  image: "/og/projects.png",
  keywords: ["leadership coaching projects", "case studies", "client outcomes"],
});

const stats = [
  { value: "25+", label: "Years leading and advising" },
  { value: "4", label: "Continents of experience" },
  { value: "8", label: "Weeks of focused coaching" },
  { value: "1:1", label: "Private, application-only format" },
];

export default function ProjectsPage() {
  const caseStudies = getCaseStudies();

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects/" },
        ])}
      />
      <PageHero
        eyebrow="Projects"
        title="Real leaders. Real shifts."
        description="Not a wall of logos. A record of what changes when capable professionals decide to be seen, heard, and followed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/#apply">Apply for the program</Button>
          <Button href="/testimonials/" variant="secondary">
            Read client testimonials
          </Button>
        </div>
      </PageHero>

      <section aria-label="Program facts" className="border-b border-line bg-cloud">
        <Container className="py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
          <p className="mt-6 text-xs text-stone">
            Figures reflect the program format and Matthew&rsquo;s professional experience. No
            client outcome metrics are published without approval.
          </p>
        </Container>
      </section>

      <Section>
        <Container className="space-y-12">
          <Reveal>
            <SectionHeading
              eyebrow="Case studies"
              title="What the work looks like in practice."
              description="Anonymized examples of the challenge, the shift, and the outcome. Details are shared only with permission."
              className="max-w-3xl"
            />
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <StaggerItem key={study.id} className="h-full">
                <CaseStudyCard study={study} />
              </StaggerItem>
            ))}
          </Stagger>
          <Divider />
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-relaxed text-graphite">
                Client outcomes vary. The program is designed to produce clarity, stronger
                judgment, and a credible leadership presence — not a guaranteed title or
                promotion.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/testimonials/" variant="secondary">
                  Read testimonials
                </Button>
                <Button href="/#apply">Start your application</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCta
        title="Your next level is a decision away."
        description="Read the program, then apply if the fit is right. The discovery call is where we decide together."
        primaryLabel="Apply for the Program"
        primaryHref="/#apply"
        secondaryLabel="Explore the program"
        secondaryHref="/program/"
      />
    </PageShell>
  );
}
