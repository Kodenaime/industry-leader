import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Apply",
    body: "Tell us where you are and what you want to change. A short application helps us understand the fit before we speak.",
  },
  {
    number: "02",
    title: "Talk it through",
    body: "On a discovery call we look at your situation honestly, answer your questions, and decide together whether the program is the right next step.",
  },
  {
    number: "03",
    title: "Begin the work",
    body: "Eight focused weeks, one clear plan. You leave with a sharper leadership identity and a 90-day roadmap you can act on.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="cloud">
      <Container className="space-y-12 sm:space-y-16">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from application to action."
            description="No funnel gymnastics. A straightforward conversation, a structured program, and work that meets your actual situation."
            className="max-w-3xl"
          />
        </Reveal>
        <Stagger className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="relative flex h-full flex-col border-t border-line pt-6">
                <span className="font-display text-4xl leading-none text-gold-deep">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
