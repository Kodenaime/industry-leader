import * as React from "react";
import { cn } from "@/lib/utils";

export type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "prose prose-neutral max-w-prose prose-p:text-graphite prose-headings:font-display prose-headings:text-ink prose-a:text-gold-deep prose-a:underline-offset-4 prose-strong:text-ink",
        className,
      )}
      {...props}
    />
  ),
);
Prose.displayName = "Prose";
