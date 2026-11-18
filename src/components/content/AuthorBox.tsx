/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { APPLY_HREF, ABOUT_HREF } from "@/lib/links";
import type { Author } from "@/lib/content/schemas";

export function AuthorBox({ author }: { author: Author }) {
  const linkedin = author.socials.find((social) => social.label.toLowerCase() === "linkedin");

  return (
    <aside className="not-prose mt-12 rounded border border-line bg-cloud p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-mist">
          <img
            src={author.portrait ?? "/images/portrait-placeholder.svg"}
            alt={`Portrait of ${author.name}`}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <p className="type-eyebrow">Written by</p>
          <p className="font-display text-xl text-ink">{author.name}</p>
          <p className="text-sm leading-relaxed text-graphite">{author.shortBio}</p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm font-semibold">
            <Link
              href={ABOUT_HREF}
              className="inline-flex items-center gap-1 text-gold-deep underline-offset-4 hover:underline"
            >
              About Matthew
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {linkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite underline-offset-4 hover:text-ink hover:underline"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <Button href={APPLY_HREF} size="sm" variant="secondary">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
