import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container className="max-w-2xl space-y-6">
        <p className="type-eyebrow">404</p>
        <h1 className="type-h1 text-balance">This page could not be found.</h1>
        <p className="type-lead">
          The page you’re looking for may have moved, or the link may be out of date.
          Let’s get you back to the work that matters.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Return home</Button>
          <Button href="/program/" variant="secondary">
            Explore the program
          </Button>
          <Button href="/contact/" variant="ghost">
            Contact
          </Button>
        </div>
        <p className="text-sm text-stone">
          Looking for insights? Read the <Link href="/#insights" className="text-gold-deep underline underline-offset-4">latest essays</Link> on the homepage.
        </p>
      </Container>
    </Section>
  );
}
