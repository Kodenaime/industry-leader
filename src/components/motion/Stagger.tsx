import * as React from "react";
import { cn } from "@/lib/utils";

export interface StaggerProps {
  className?: string;
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}

/** Layout wrapper for staggered children; motion is CSS scroll-driven. */
export function Stagger({ className, children }: StaggerProps) {
  return <div className={cn(className)}>{children}</div>;
}
