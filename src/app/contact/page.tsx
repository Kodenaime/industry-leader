import { CalendarCheck, Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/seo";
import { PageHero } from "@/components/sections";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { BOOKING_HREF, BOOKING_IS_EXTERNAL } from "@/lib/links";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Matthew Ogieva and The Industry Leader about the program, coaching, speaking, or advisory work. Book a discovery call or send a message.",
  path: "/contact/",
  image: "/og/contact.png",
  keywords: ["contact", "leadership coaching", "discovery call", "speaking"],
});

export default function ContactPage() {
  const bookingHref = BOOKING_IS_EXTERNAL ? BOOKING_HREF : "#contact-form";

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Start a conversation."
        description="Questions about the program, a speaking invitation, or a coaching conversation — send a note and you will get a real reply."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <Reveal>
              <div id="contact-form" className="scroll-mt-28">
                <p className="type-eyebrow">Send a message</p>
                <h2 className="type-h3 mt-3 text-ink">What would you like to discuss?</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">
                  Share a little context. If you are asking about the program, the application is
                  the fastest route — it helps us make the first conversation useful.
                </p>
                <div className="mt-7 rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
                  <ContactForm source="contact-page" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="space-y-6">
              <div className="rounded border border-gold/30 bg-gold-soft/60 p-6">
                <CalendarCheck className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                <p className="mt-3 font-display text-xl text-ink">Prefer to talk?</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  {BOOKING_IS_EXTERNAL
                    ? "Choose a time that works for you. A discovery call is a short, practical conversation about fit."
                    : "Send a message and request a call. We will reply with a few times."}
                </p>
                <Button
                  href={bookingHref}
                  size="sm"
                  className="mt-4"
                  data-analytics="booking_click"
                  data-analytics-label="contact-sidebar"
                  data-analytics-location="contact"
                  {...(BOOKING_IS_EXTERNAL ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {BOOKING_IS_EXTERNAL ? "Book a discovery call" : "Request a call"}
                </Button>
              </div>

              <div className="space-y-5 rounded border border-line bg-mist p-6">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 inline-block text-sm text-graphite underline decoration-line underline-offset-4 hover:text-ink"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Based in</p>
                    <p className="mt-1 text-sm text-graphite">{SITE.location}</p>
                    <p className="text-sm text-stone">Coaching remotely, worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Response time</p>
                    <p className="mt-1 text-sm text-graphite">
                      Usually within two business days.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">For speaking or media</p>
                    <p className="mt-1 text-sm text-graphite">
                      Include the event, audience, date, and format.{" "}
                      <Link
                        href="/#about"
                        className="underline decoration-line underline-offset-4 hover:text-ink"
                      >
                        More about Matthew
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded border border-line bg-cloud p-6">
                <p className="text-sm font-semibold text-ink">Follow along</p>
                <ul className="mt-3 flex flex-wrap gap-4 text-sm">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        data-analytics="outbound_click"
                        data-analytics-label={link.label}
                        data-analytics-location="contact"
                        className="text-graphite underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm leading-relaxed text-stone">
                Applying for the program?{" "}
                <Link
                  href="/#apply"
                  className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
                >
                  Start the application
                </Link>{" "}
                instead. It takes about five minutes.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
