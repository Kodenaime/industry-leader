import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded border border-line bg-cloud p-6 shadow-soft sm:p-8",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
