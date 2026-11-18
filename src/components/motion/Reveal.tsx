import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Layout wrapper retained for the original scroll-reveal API. The CSS
 * view-timeline animation was removed after it produced measurable style and
 * layout work on mid-range mobile; content is now immediately visible.
 */
export function Reveal({ className, children }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
