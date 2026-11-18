import Link from "next/link";
import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { PageHero } from "@/components/sections";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import type { LegalPageData } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";
import { breadcrumbSchema } from "@/lib/seo/schema";

export function LegalArticle({ page, path }: { page: LegalPageData; path: string }) {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.title, path },
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title={page.title}
        description={`Last updated ${formatDate(page.lastUpdated)}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />

      <Section>
        <Container className="max-w-3xl">
          <Prose className="prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:text-ink prose-p:text-graphite prose-a:text-gold-deep prose-strong:text-ink prose-li:marker:text-gold-deep">
            {page.content}
          </Prose>

          <div className="mt-12 rounded border border-line bg-cloud p-6 text-sm leading-relaxed text-graphite">
            <p className="font-semibold text-ink">Questions about this policy?</p>
            <p className="mt-2">
              Email{" "}
              <a
                href="mailto:hello@theindustryleader.net"
                className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
              >
                hello@theindustryleader.net
              </a>{" "}
              or use the{" "}
              <Link
                href="/contact/"
                className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
              >
                contact page
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
