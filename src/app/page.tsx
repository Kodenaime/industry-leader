import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import {
  AboutSection,
  ApplySection,
  CredibilityStrip,
  FaqSection,
  FinalCta,
  FreeGuideSection,
  Hero,
  HowItWorks,
  InsightsPreview,
  Outcomes,
  PainPoints,
  ProgramPreview,
  ProjectsPreview,
  Testimonials,
} from "@/components/sections";
import { site } from "@/content/site";
import {
  getAllPosts,
  getCaseStudies,
  getFaqs,
  getTestimonials,
} from "@/lib/content/loaders";
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
  const posts = getAllPosts();
  const testimonials = getTestimonials();
  const caseStudies = getCaseStudies();
  const faqs = getFaqs();

  return (
    <PageShell>
      <JsonLd data={[professionalServiceSchema(), personSchema()]} />
      <Hero />
      <CredibilityStrip />
      <PainPoints />
      <Outcomes />
      <ProgramPreview />
      <AboutSection />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <ProjectsPreview caseStudies={caseStudies} />
      <InsightsPreview posts={posts} />
      <FreeGuideSection />
      <ApplySection />
      <FaqSection
        faqs={faqs.slice(0, 4)}
        description="A few practical questions about the program, the commitment, and what happens next."
        cta={{ label: "See all questions", href: "/program/#faq" }}
      />
      <FinalCta />
    </PageShell>
  );
}
