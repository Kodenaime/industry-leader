import * as React from "react";
import { cn } from "@/lib/utils";

export interface ParallaxProps {
  className?: string;
  children: React.ReactNode;
  /** Retained for API compatibility; the static fallback does not translate. */
  offset?: number;
}

/** Static wrapper used by the style guide; avoids shipping motion JavaScript. */
export function Parallax({ className, children }: ParallaxProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}
