import { ArrowRight, BookOpen, Mic, Quote } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PortraitFrame } from "@/components/content/PortraitFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/about";
import { author } from "@/content/author";
import { PROJECTS_HREF, PROGRAM_HREF, TESTIMONIALS_HREF } from "@/lib/links";

/**
 * The About page folded into the homepage. Keeps Matthew's story, philosophy,
 * career timeline, and published work while leaving one canonical page.
 */
export function AboutSection() {
  return (
    <>
      <Section id="about" className="scroll-mt-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
            <PortraitFrame
              alt="Portrait of Matthew Ogieva"
              frame="right"
              className="mr-4"
              sizes="(min-width: 1024px) 32vw, 80vw"
            />
          </Reveal>

          <div className="space-y-7">
            <Reveal>
              <p className="type-eyebrow">{aboutPage.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="type-h2 text-balance">{aboutPage.headline}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-graphite">{aboutPage.intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="max-w-xl space-y-5 text-sm leading-relaxed text-graphite">
                {aboutPage.story.slice(0, 3).map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="border-l-2 border-gold pl-6">
                <Quote className="h-6 w-6 text-gold-deep" aria-hidden="true" />
                <blockquote className="mt-4 font-display text-2xl leading-snug text-ink">
                  {aboutPage.pullQuote}
                </blockquote>
                <figcaption className="mt-3 text-sm text-stone">
                  The idea behind the work at Business Reimagined.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.25}>
              <ul className="grid gap-3 border-t border-line pt-6 text-sm text-graphite sm:grid-cols-2">
                {author.credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                    />
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  href={PROGRAM_HREF}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Explore the program
                </Button>
                <Button href={TESTIMONIALS_HREF} variant="secondary">
                  Read client testimonials
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cloud">
        <Container className="space-y-14">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Philosophy"
                title="Clarity, credibility, connection."
                description="Influence is not control. It is the earned ability to move people toward something worth building. The coaching is organized around three disciplines."
              />
            </Reveal>
            <Stagger className="grid gap-5 sm:grid-cols-3">
              {aboutPage.philosophy.map((item, index) => (
                <StaggerItem key={item.title}>
                  <article className="h-full rounded border border-line bg-mist p-6">
                    <span className="font-display text-3xl leading-none text-gold-deep">
                      0{index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{item.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="A career spent where strategy meets reality."
                description="Selected chapters, not a complete résumé. The through-line is the same: leading and advising where the stakes are real."
              />
              <ol className="mt-8 space-y-7 border-l border-line pl-6">
                {aboutPage.timeline.map((entry) => (
                  <li key={entry.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.9rem] top-1.5 h-2 w-2 rounded-full border border-gold bg-cloud"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      {entry.period}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg text-ink">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">
                      {entry.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionHeading
                eyebrow="Books & media"
                title="Ideas beyond the coaching room."
                description="Writing and speaking on influence, communication, and the practice of leadership."
              />
              <div className="mt-8 grid gap-4">
                {author.books.map((book) => (
                  <article
                    key={book.title}
                    className="flex items-start gap-4 rounded border border-line bg-mist p-5"
                  >
                    <BookOpen className="h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                        Book
                      </p>
                      <h3 className="mt-1 font-display text-lg text-ink">{book.title}</h3>
                      {book.subtitle ? (
                        <p className="mt-1 text-sm text-graphite">{book.subtitle}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
                {author.talks.map((talk) => (
                  <article
                    key={talk.title}
                    className="flex items-start gap-4 rounded border border-line bg-mist p-5"
                  >
                    <Mic className="h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                        Speaking
                      </p>
                      <h3 className="mt-1 font-display text-lg text-ink">{talk.title}</h3>
                      {talk.event ? (
                        <p className="mt-1 text-sm text-graphite">{talk.event}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                <Link
                  href={PROJECTS_HREF}
                  className="text-gold-deep underline decoration-gold-deep/30 underline-offset-4 hover:decoration-gold-deep"
                >
                  See the client work
                </Link>
                <Link
                  href={TESTIMONIALS_HREF}
                  className="text-gold-deep underline decoration-gold-deep/30 underline-offset-4 hover:decoration-gold-deep"
                >
                  Read testimonials
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
