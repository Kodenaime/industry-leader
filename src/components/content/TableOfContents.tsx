"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import type { TocHeading } from "@/lib/content/mdx";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  className,
  variant = "desktop",
}: {
  headings: TocHeading[];
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const [activeId, setActiveId] = React.useState(headings[0]?.id ?? "");

  React.useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -60% 0px", threshold: [0, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const links = (
    <ol className="space-y-1">
      {headings.map((heading) => {
        const active = activeId === heading.id;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                heading.level === 3 ? "pl-7" : "pl-4",
                active
                  ? "border-gold-deep font-semibold text-ink"
                  : "border-line text-graphite hover:border-ink/30 hover:text-ink",
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <nav aria-label="On this page" className={cn("lg:hidden", className)}>
        <details className="group rounded border border-line bg-cloud">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep">
            On this page
            <ChevronDown
              className="h-4 w-4 shrink-0 text-stone transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-line px-5 py-4">{links}</div>
        </details>
      </nav>
    );
  }

  return (
    <nav aria-label="On this page" className={className}>
      <p className="type-eyebrow">On this page</p>
      <div className="mt-4">{links}</div>
    </nav>
  );
}
