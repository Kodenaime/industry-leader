import { ArrowRight, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/motion";
import { PortraitFrame } from "@/components/content/PortraitFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { author } from "@/content/author";
import { APPLY_HREF, BOOKING_HREF, PROGRAM_HREF } from "@/lib/links";

const trustMarkers = author.credentials;

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(233,220,195,0.45),rgba(233,220,195,0)_70%)]"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="space-y-8">
          <Reveal>
            <p className="type-eyebrow">8-week 1:1 coaching program</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-h1 text-balance">
              Become the leader your industry follows.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-lead max-w-xl">
              One-on-one coaching for capable professionals ready to turn expertise into
              authority, influence, and lasting impact.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={APPLY_HREF}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                data-analytics="cta_click"
                data-analytics-label="hero-apply"
                data-analytics-location="home-hero"
              >
                Apply for the Program
              </Button>
              <Button
                href={PROGRAM_HREF}
                size="lg"
                variant="secondary"
                data-analytics="cta_click"
                data-analytics-label="hero-program"
                data-analytics-location="home-hero"
              >
                Explore the 8-Week Program
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 text-sm text-graphite">
              {trustMarkers.map((marker, index) => (
                <li key={marker} className="inline-flex items-center gap-4">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  ) : null}
                  {marker}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href={BOOKING_HREF}
              data-analytics="booking_click"
              data-analytics-label="hero-booking"
              data-analytics-location="home-hero"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 transition-colors hover:decoration-gold-deep"
              {...(BOOKING_HREF.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Or book a discovery call
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
          <PortraitFrame
            alt="Portrait of Matthew Ogieva, leadership coach and author"
            priority
            frame="left"
            className="ml-4 mr-0"
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
          />
          <p className="mt-6 pl-2 text-xs uppercase tracking-[0.18em] text-stone">
            Matthew Ogieva · Founder, Business Reimagined
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
