import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pains = [
  {
    number: "01",
    title: "Your work speaks. Your profile doesn't.",
    body: "You deliver, but the people making decisions still don't see the full scope of what you bring. Capability without visibility stays invisible.",
  },
  {
    number: "02",
    title: "You're in the room, but not shaping it.",
    body: "You have a seat at the table. Influence is another matter. Without a clear point of view, important conversations move on without you.",
  },
  {
    number: "03",
    title: "The next step isn't another skill.",
    body: "Another certification won't change how you are perceived. What changes is clarity, presence, and the discipline to lead from who you already are.",
  },
];

export function PainPoints() {
  return (
    <Section>
      <Container className="space-y-12 sm:space-y-16">
        <Reveal>
          <SectionHeading
            eyebrow="The gap"
            title="Capability got you here. Authority takes you further."
            description="Most capable professionals are not held back by skill. They are held back by how little of that capability the wider organization can see, trust, and follow."
            className="max-w-3xl"
          />
        </Reveal>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {pains.map((pain) => (
            <StaggerItem key={pain.number}>
              <article className="flex h-full flex-col rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
                <span className="font-display text-3xl leading-none text-gold-deep">{pain.number}</span>
                <h3 className="mt-6 font-display text-xl leading-snug text-ink">{pain.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{pain.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
