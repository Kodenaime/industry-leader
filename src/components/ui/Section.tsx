import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "dark" | "cloud";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  tone?: SectionTone;
}

const tones: Record<SectionTone, string> = {
  default: "bg-mist text-ink",
  dark: "bg-charcoal text-cloud",
  cloud: "bg-cloud text-ink",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as = "section", tone = "default", ...props }, ref) => {
    const classes = cn("section-space", tones[tone], className);
    if (as === "div") {
      return <div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...props} />;
    }
    return <section ref={ref} className={classes} {...props} />;
  },
);
Section.displayName = "Section";
