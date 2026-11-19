import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { AboutSection, FinalCta, PageHero } from "@/components/sections";
import { aboutPage } from "@/content/about";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Matthew Ogieva",
  description:
    "Matthew Ogieva is a leadership coach, author, and TEDx speaker helping capable professionals turn expertise into authority.",
  path: "/about/",
  image: "/og/about.png",
  keywords: [
    "Matthew Ogieva",
    "leadership coach",
    "author",
    "TEDx speaker",
    "Business Reimagined",
  ],
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
          personSchema(),
        ]}
      />
      <PageHero
        eyebrow="About"
        title="About Matthew Ogieva"
        description={aboutPage.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <AboutSection />
      <FinalCta
        title="Ready to work on your own leadership?"
        description="If you are capable, ambitious, and ready to be seen, start with an application."
        primaryLabel="Apply for the Program"
        primaryHref="/#apply"
        secondaryLabel="Explore the program"
        secondaryHref="/program/"
      />
    </PageShell>
  );
}
