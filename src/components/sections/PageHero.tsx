import * as React from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("border-b border-line bg-mist pb-14 pt-8 sm:pb-16 lg:pb-20", className)}>
      <Container>
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} className="mb-10" /> : null}
        <div className={cn("grid gap-10", aside && "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16")}>
          <div className="max-w-3xl space-y-6">
            {eyebrow ? <p className="type-eyebrow">{eyebrow}</p> : null}
            <h1 className="type-h1 text-balance">{title}</h1>
            {description ? <p className="type-lead max-w-2xl">{description}</p> : null}
            {children}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
