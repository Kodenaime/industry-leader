import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  heading?: "h1" | "h2" | "h3";
  dark?: boolean;
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  description,
  align = "left",
  heading = "h2",
  dark = false,
  ...props
}: SectionHeadingProps) {
  const Heading = heading;
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className={cn("type-eyebrow", dark && "text-gold-soft")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          heading === "h1" ? "type-h1" : heading === "h2" ? "type-h2" : "type-h3",
          "text-balance",
          dark ? "text-cloud" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "type-lead max-w-prose",
            align === "center" && "mx-auto",
            dark ? "text-cloud/80" : "text-graphite",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
