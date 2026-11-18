import type { Metadata } from "next";
import { JsonLd } from "@/components/seo";
import { PageShell } from "@/components/layout";
import { TestimonialCard } from "@/components/content";
import { FinalCta, PageHero } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Client Testimonials",
  description:
    "What leaders say about working with Matthew Ogieva and the Becoming an Industry Leader program.",
  path: "/testimonials/",
  image: "/og/testimonials.png",
  keywords: ["leadership coaching testimonials", "Matthew Ogieva reviews", "client results"],
});

export default function TestimonialsPage() {
  const testimonials = getTestimonials();
  const featured = testimonials.find((testimonial) => testimonial.featured) ?? testimonials[0];
  const rest = testimonials.filter((testimonial) => testimonial.id !== featured?.id);

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials/" },
        ])}
      />
      <PageHero
        eyebrow="Testimonials"
        title="In their words."
        description="The shift is rarely louder. It is clearer. These are the leaders who lived the work and chose to say so."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/#apply">Apply for the program</Button>
          <Button href="/projects/" variant="secondary">
            See the client work
          </Button>
        </div>
      </PageHero>

      {featured ? (
        <Section>
          <Container className="space-y-8">
            <Reveal>
              <p className="type-eyebrow">Featured story</p>
            </Reveal>
            <Reveal delay={0.05}>
              <TestimonialCard testimonial={featured} variant="featured" className="max-w-4xl" />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section tone="cloud">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="What clients say"
              title="Capability gets you into the room."
              description="Influence makes you the leader in it. These are the words of people who have done the work."
              className="max-w-3xl"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {(rest.length ? rest : testimonials).map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={0.05 * index}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-stone">
            Testimonials are published with client permission. Individual results vary.
          </p>
        </Container>
      </Section>

      <FinalCta
        title="The next story could be yours."
        description="Read the program, then apply if the fit is right. The discovery call is where we decide together."
        primaryLabel="Apply for the Program"
        primaryHref="/#apply"
        secondaryLabel="Explore the program"
        secondaryHref="/program/"
      />
    </PageShell>
  );
}
