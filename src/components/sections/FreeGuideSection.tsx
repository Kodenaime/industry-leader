/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowRight, Check, Clock, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { GuideForm } from "@/components/forms/GuideForm";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { leadMagnet } from "@/content/lead-magnet";

const steps = [
  {
    icon: FileText,
    title: "Tell us where to send it",
    body: "Your first name and email are all we need. The guide arrives in your inbox.",
  },
  {
    icon: Clock,
    title: "Read it in about 15 minutes",
    body: "Five short shifts, written to be read once and used immediately.",
  },
  {
    icon: ArrowRight,
    title: "Put it to work",
    body: "Finish with a simple 90-day plan you can start the same week.",
  },
];

/** The former /free-guide/ page, now the lead-magnet section on /contact/. */
export function FreeGuideSection() {
  return (
    <Section id="free-guide" tone="cloud" className="scroll-mt-24">
      <Container className="space-y-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="space-y-8">
            <div>
              <p className="type-eyebrow">Free guide</p>
              <h2 className="type-h2 mt-3 text-balance text-ink">{leadMagnet.title}</h2>
              <p className="mt-3 font-display text-xl leading-snug text-graphite">
                {leadMagnet.subtitle}
              </p>
            </div>
            <div className="mx-auto max-w-xs overflow-hidden rounded border border-line bg-cloud shadow-lift lg:mx-0">
              <img
                src={leadMagnet.coverImage ?? "/images/authority-blueprint-cover.svg"}
                alt={`Cover of ${leadMagnet.title}`}
                width={800}
                height={1040}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-graphite">{leadMagnet.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  PDF guide
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  15-minute read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  No payment details
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded border border-gold/30 bg-gold-soft/60 p-6 sm:p-8 lg:p-10">
              <p className="type-eyebrow text-gold-deep">Get the guide</p>
              <h3 className="type-h3 mt-3 text-ink">Where should we send it?</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite">
                Enter your details and we will send the guide, plus occasional notes on
                leadership and influence.
              </p>
              <div className="mt-6">
                <GuideForm source="contact-free-guide" />
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <ul className="space-y-3">
                {leadMagnet.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-graphite">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-3">
                    <span className="font-display text-xl leading-none text-gold-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <step.icon className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-graphite">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-8">
              <p className="text-sm text-graphite">Prefer to start with the program?</p>
              <Button href="/program/" size="sm" variant="secondary">
                Explore the program
              </Button>
              <Link
                href="/#apply"
                className="text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 hover:decoration-gold-deep"
              >
                Apply directly
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
