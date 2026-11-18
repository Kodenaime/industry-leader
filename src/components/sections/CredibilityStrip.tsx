import { author } from "@/content/author";
import { Container } from "@/components/ui/Container";

export function CredibilityStrip() {
  return (
    <section aria-label="Experience and credentials" className="border-y border-line bg-cloud/70">
      <Container className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-stone">
          Experience across
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {author.organizations.map((organization) => (
            <li
              key={organization}
              className="font-display text-lg tracking-tight text-graphite"
            >
              {organization}
            </li>
          ))}
        </ul>
        <p className="text-sm text-stone lg:ml-auto">
          {author.credentials[0]} · {author.credentials[1]} · {author.credentials[2]}
        </p>
      </Container>
    </section>
  );
}
