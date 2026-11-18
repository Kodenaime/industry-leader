import Link from "next/link";
import { APPLY_HREF } from "@/lib/links";
import { primaryNavigation } from "@/content/navigation";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

/**
 * Server-rendered site header. The sticky bar is always opaque so scrolling
 * does not require a client-side listener; mobile navigation is a native
 * disclosure in MobileNav.
 */
export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 w-full">
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist sm:text-xl"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-graphite transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href={APPLY_HREF} size="sm" className="hidden sm:inline-flex lg:inline-flex" data-analytics="cta_click" data-analytics-label="header-apply" data-analytics-location="header">
            Apply for the Program
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
