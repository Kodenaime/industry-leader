import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Prose,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import { Checkbox } from "@/components/forms/Checkbox";
import { Field } from "@/components/forms/Field";
import { FormError } from "@/components/forms/FormError";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { Textarea } from "@/components/forms/Textarea";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Internal component and design-token reference for The Industry Leader. Not indexed or linked from the public site.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function StyleGuidePage() {
  return (
    <main id="main-content">
      <Section>
        <Container className="space-y-16">
          <SectionHeading
            eyebrow="Internal"
            heading="h1"
            title="Style guide"
            description="Core UI primitives and form states for The Industry Leader. Presentational only."
          />

          <section className="space-y-6">
            <h2 className="type-h3">Buttons</h2>
            <Card className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="text-link">Text link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button icon={<ArrowRight className="h-4 w-4" />}>With icon</Button>
                <Button icon={<Mail className="h-4 w-4" />} iconPosition="left" variant="secondary">
                  Email
                </Button>
                <Button loading>Loading</Button>
                <Button disabled variant="primary">Disabled</Button>
                <Button href="/program/" variant="text-link" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Link button
                </Button>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="type-h3">Badges &amp; stats</h2>
            <Card className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="muted">Muted</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
              </div>
              <Divider />
              <div className="grid gap-8 sm:grid-cols-3">
                <Stat value="25+" label="Years of leadership" note="Across four continents" />
                <Stat value="8" label="Weeks" note="1:1 coaching program" />
                <Stat value="1:1" label="Format" note="Private advisory sessions" />
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="type-h3">Cards, sections &amp; prose</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <p className="type-eyebrow mb-2">Card</p>
                <p className="type-h4 mb-2">Surface component</p>
                <p className="text-graphite">Warm cloud background, subtle border, soft shadow, architectural radius.</p>
              </Card>
              <Card className="bg-mist">
                <p className="type-eyebrow mb-2">Section heading</p>
                <SectionHeading
                  eyebrow="Eyebrow"
                  heading="h3"
                  title="Clear, editorial hierarchy"
                  description="Headings use Fraunces; supporting copy uses Manrope in graphite tones."
                />
              </Card>
            </div>
            <Section tone="dark" className="rounded border border-charcoal">
              <Container>
                <SectionHeading
                  eyebrow="Dark section"
                  heading="h3"
                  dark
                  title="Program preview tone"
                  description="Dark charcoal backgrounds carry cloud text with restrained gold accents."
                />
              </Container>
            </Section>
            <Prose>
              <h3>Prose sample</h3>
              <p>
                Capability gets you into the room. Influence makes you the leader in it.
                This prose block demonstrates typographic rhythm for longer-form content
                using <a href="/program/">gold-deep links</a> on light backgrounds.
              </p>
            </Prose>
          </section>

          <section className="space-y-6">
            <h2 className="type-h3">Motion &amp; accordion</h2>
            <div className="space-y-6">
              <Reveal>
                <Card>
                  <p className="type-eyebrow mb-2">Reveal</p>
                  <p className="type-h4">Subtle fade and lift on enter</p>
                  <p className="mt-2 text-graphite">
                    Motion respects <code className="rounded bg-mist px-1.5 py-0.5 text-sm">prefers-reduced-motion</code> and uses opacity/transform only.
                  </p>
                </Card>
              </Reveal>

              <Stagger className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Stagger 1", body: "Sequenced reveals for grouped content." },
                  { title: "Stagger 2", body: "80ms rhythm, restrained easing." },
                  { title: "Stagger 3", body: "No layout thrash, static-export safe." },
                ].map((item) => (
                  <StaggerItem key={item.title}>
                    <Card className="h-full">
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-2 text-sm text-graphite">{item.body}</p>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="overflow-hidden rounded border border-line bg-cloud p-6">
                <p className="type-eyebrow mb-4">Parallax (subtle)</p>
                <Parallax offset={12}>
                  <div className="rounded bg-gold-soft/60 p-6 text-ink">
                    This block shifts gently with scroll when motion is allowed.
                  </div>
                </Parallax>
              </div>

              <div className="space-y-3">
                <p className="type-eyebrow">Accordion</p>
                <Accordion
                  items={[
                    {
                      id: "a1",
                      title: "What makes this accordion accessible?",
                      content:
                        "It is built on native details and summary elements, so it is keyboard operable, announced correctly by screen readers, and needs no JavaScript.",
                    },
                    {
                      id: "a2",
                      title: "Can multiple items stay open?",
                      content:
                        "Yes. This example uses the default single-open behavior; the component also supports allowMultiple for independent sections.",
                    },
                    {
                      id: "a3",
                      title: "Keyboard support",
                      content:
                        "The summary is a native focus target, so Enter or Space opens and closes each panel without custom key handling.",
                    },
                  ]}
                  defaultOpenIds={["a1"]}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="type-h3">Form primitives</h2>
            <Card className="max-w-2xl space-y-6">
              <Field label="Full name" htmlFor="sg-name" required description="As it should appear in correspondence.">
                <Input id="sg-name" name="name" placeholder="Jane Doe" aria-describedby="sg-name-description" />
              </Field>

              <Field label="Email address" htmlFor="sg-email" required>
                <Input id="sg-email" name="email" type="email" placeholder="jane@example.com" />
              </Field>

              <Field label="Interest" htmlFor="sg-interest" description="Select the option that best fits.">
                <Select id="sg-interest" name="interest" defaultValue="" aria-describedby="sg-interest-description">
                  <option value="" disabled>Select an option</option>
                  <option value="program">8-week program</option>
                  <option value="call">Discovery call</option>
                  <option value="other">Other</option>
                </Select>
              </Field>

              <Field label="Message" htmlFor="sg-message">
                <Textarea id="sg-message" name="message" placeholder="Tell us a little about your goals." />
              </Field>

              <Field label="Email (error state)" htmlFor="sg-email-error" error="Please enter a valid email address.">
                <Input
                  id="sg-email-error"
                  type="email"
                  defaultValue="invalid-email"
                  hasError
                  aria-invalid="true"
                  aria-describedby="sg-email-error-error"
                />
              </Field>

              <Checkbox
                id="sg-consent"
                label="I agree to the privacy policy"
                description="Required to submit this form."
              />

              <Checkbox
                id="sg-consent-error"
                label="Consent with error styling"
                hasError
              />

              <div className="space-y-2">
                <FormError>Example form-level error message.</FormError>
              </div>

              <div className="flex flex-wrap gap-3">
                <SubmitButton>Submit</SubmitButton>
                <SubmitButton loading>Submitting</SubmitButton>
                <Button type="button" variant="secondary">Cancel</Button>
              </div>
            </Card>
          </section>
        </Container>
      </Section>
    </main>
  );
}
