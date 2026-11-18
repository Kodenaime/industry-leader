import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
  note?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, value, label, note, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props}>
      <p className="font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
        {value}
      </p>
      <p className="text-sm font-medium text-graphite">{label}</p>
      {note ? <p className="text-xs text-stone">{note}</p> : null}
    </div>
  ),
);
Stat.displayName = "Stat";
