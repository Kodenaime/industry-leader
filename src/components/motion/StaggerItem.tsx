import * as React from "react";
import { cn } from "@/lib/utils";

export interface StaggerItemProps {
  className?: string;
  children: React.ReactNode;
  y?: number;
}

export function StaggerItem({ className, children, y = 24 }: StaggerItemProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
