import { Check, Clock, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { PROJECTS_HREF, PROGRAM_HREF } from "@/lib/links";

const reassurance = [
  {
    icon: Clock,
    title: "About five minutes",
    body: "Three short steps. Thoughtful answers matter more than perfect ones.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Your answers are used only to review your application. They are never sold or shared.",
  },
  {
    icon: Mail,
    title: "A human reply",
    body: "Matthew reviews every application personally. You will hear back with a clear next step.",
  },
];

/** The former /apply/ page, now the homepage application section. */
export function ApplySection() {
  return (
    <Section id="apply" className="scroll-mt-24">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Application"
            title="Apply for the program."
            description="Tell us where you are and what you want to change. The application helps us understand fit before we speak, so the discovery call can be useful from the first minute."
            className="max-w-3xl"
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <Reveal>
            <div className="rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
              <ApplicationForm />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-graphite">
              Prefer to talk first?{" "}
              <Link
                href="/contact/#contact-form"
                className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
              >
                Send a message
              </Link>{" "}
              or email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
              >
                {SITE.email}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.05} className="space-y-6">
            <div className="rounded border border-line bg-cloud p-6 shadow-soft">
              <p className="type-eyebrow">What happens next</p>
              <ol className="mt-5 space-y-4 text-sm text-graphite">
                <li className="flex gap-3">
                  <span className="font-display text-gold-deep">01</span>
                  <span>You submit the application. It comes directly to Matthew.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-gold-deep">02</span>
                  <span>
                    We review fit and reply with next steps, usually within two business days.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-gold-deep">03</span>
                  <span>A discovery call confirms whether the program is right for you.</span>
                </li>
              </ol>
            </div>

            <div className="space-y-4 rounded border border-line bg-mist p-6">
              {reassurance.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-graphite">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded border border-gold/30 bg-gold-soft/60 p-6">
              <p className="text-sm font-semibold text-ink">Not sure yet?</p>
              <ul className="mt-4 space-y-2 text-sm text-graphite">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <Link href={PROGRAM_HREF} className="underline decoration-line underline-offset-4">
                    Explore the 8-week program
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <Link href={PROJECTS_HREF} className="underline decoration-line underline-offset-4">
                    Read the client work
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <Link href="/privacy/" className="underline decoration-line underline-offset-4">
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
