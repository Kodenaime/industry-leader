import {
  Compass,
  Handshake,
  Map,
  Megaphone,
  Scale,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { program } from "@/content/programs";

const icons: LucideIcon[] = [Compass, Target, Handshake, Megaphone, Scale, Map];

export function Outcomes() {
  return (
    <Section tone="cloud">
      <Container className="space-y-12 sm:space-y-16">
        <Reveal>
          <SectionHeading
            eyebrow="What changes"
            title="Outcomes that outlast the program."
            description="The work is practical. Every session turns into something you can use in the room: a sharper message, a stronger decision, a harder conversation handled well."
            className="max-w-3xl"
          />
        </Reveal>
        <Stagger className="grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {program.outcomes.map((outcome, index) => {
            const Icon = icons[index % icons.length];
            return (
              <StaggerItem key={outcome} className="bg-cloud">
                <div className="flex h-full flex-col gap-4 p-6 sm:p-8">
                  <Icon className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                  <p className="text-base font-medium leading-snug text-ink">{outcome}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
