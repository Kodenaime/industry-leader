import { ArrowRight, CalendarCheck, CheckCircle2, Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getLeadMagnet } from "@/lib/content/loaders";
import { BOOKING_HREF, BOOKING_IS_EXTERNAL } from "@/lib/links";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Your guide is on its way",
  description: "Download The Authority Blueprint and choose your next step toward becoming the leader your industry follows.",
  path: "/free-guide/thank-you/",
  image: "/og/free-guide.png",
  noindex: true,
});

export default function FreeGuideThankYouPage() {
  const guide = getLeadMagnet();

  return (
    <PageShell>
      <Section>
        <Container className="max-w-4xl">
          <Reveal className="space-y-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
              <p className="type-eyebrow">Request received</p>
            </div>
            <div className="space-y-4">
              <h1 className="type-h1 text-balance">Your guide is on its way.</h1>
              <p className="type-lead max-w-2xl">
                Check your inbox for {guide.title}. While you wait, you can download it here and
                choose what to do next.
              </p>
            </div>

            {guide.downloadUrl ? (
              <div className="rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-gold/30 bg-gold-soft/60">
                      <Download className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-xl text-ink">{guide.title}</p>
                      <p className="mt-1 text-sm text-graphite">PDF guide · instant download</p>
                    </div>
                  </div>
                  <Button
                    href={guide.downloadUrl}
                    download
                    size="lg"
                    data-analytics="guide_download"
                    data-analytics-label="thank-you"
                    data-analytics-location="thank-you"
                  >
                    Download the guide
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded border border-line bg-cloud p-6">
                <p className="text-sm leading-relaxed text-graphite">
                  The guide is being finalized. It will arrive in your inbox shortly. If it does
                  not, email{" "}
                  <a
                    href="mailto:hello@theindustryleader.net"
                    className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
                  >
                    hello@theindustryleader.net
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded border border-line bg-mist p-6">
                <CalendarCheck className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                <p className="mt-3 font-display text-lg text-ink">Prefer to talk it through?</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  Book a short discovery call and we can discuss where you are and what comes next.
                </p>
                <Button
                  href={BOOKING_HREF}
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  data-analytics="booking_click"
                  data-analytics-label="free-guide-thank-you"
                  data-analytics-location="thank-you"
                  {...(BOOKING_IS_EXTERNAL ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  Book a discovery call
                </Button>
              </div>
              <div className="rounded border border-line bg-mist p-6">
                <ArrowRight className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                <p className="mt-3 font-display text-lg text-ink">See how the program works.</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  An eight-week, one-on-one engagement built around your real leadership
                  challenges.
                </p>
                <Button href="/program/" variant="secondary" size="sm" className="mt-4">
                  Explore the program
                </Button>
              </div>
            </div>

            <div className="rounded border border-line bg-cloud p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg text-ink">Not on the letter yet?</p>
                  <p className="mt-1 text-sm leading-relaxed text-graphite">
                    Join The Industry Leader Letter for occasional notes on authority, presence,
                    and influence.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <NewsletterForm source="free-guide-thank-you" />
              </div>
            </div>

            <p className="text-sm text-graphite">
              Keep reading in the meantime:{" "}
              <Link
                href="/#insights"
                className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
              >
                browse the insights
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
