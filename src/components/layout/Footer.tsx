import Link from "next/link";
import { footerNavigation, legalNavigation } from "@/content/navigation";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-charcoal text-cloud">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-6">
            <div>
              <p className="font-display text-2xl text-cloud">{SITE.name}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-cloud/75">
                {SITE.tagline}
              </p>
            </div>
            <div className="space-y-2 text-sm text-cloud/75">
              <p>{SITE.legalName}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold-soft">
                  {SITE.email}
                </a>
              </p>
              <p>{SITE.location}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics="outbound_click"
                  data-analytics-label={link.label}
                  data-analytics-location="footer"
                  className="text-cloud/80 transition-colors hover:text-gold-soft"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="type-eyebrow text-gold-soft">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cloud/80 transition-colors hover:text-cloud">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="type-eyebrow text-gold-soft">The Industry Leader Letter</p>
            <p className="text-sm leading-relaxed text-cloud/75">
              Leadership notes on authority, influence, and the work of becoming a leader
              others seek out.
            </p>
            <NewsletterForm variant="dark" source="footer" />
          </div>
        </div>

        <Divider tone="dark" className="my-10" />
        <div className="flex flex-col gap-4 text-xs text-cloud/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-cloud/90">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
