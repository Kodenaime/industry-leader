import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import {
  ApplySection,
  CredibilityStrip,
  FinalCta,
  Hero,
  Outcomes,
  PainPoints,
  ProgramPreview,
  Testimonials,
} from "@/components/sections";
import { site } from "@/content/site";
import { getTestimonials } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";
import { personSchema, professionalServiceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Leadership Coaching`,
  description: site.description,
  path: "/",
  image: "/og/home.png",
  absoluteTitle: true,
  keywords: [
    "leadership coaching",
    "executive coaching",
    "industry leader",
    "authority",
    "influence",
    "Matthew Ogieva",
  ],
});

export default function HomePage() {
  const testimonials = getTestimonials();

  return (
    <PageShell>
      <JsonLd data={[professionalServiceSchema(), personSchema()]} />
      <Hero />
      <CredibilityStrip />
      <PainPoints />
      <Outcomes />
      <ProgramPreview />
      <Testimonials testimonials={testimonials} />
      <ApplySection />
      <FinalCta />
    </PageShell>
  );
}
