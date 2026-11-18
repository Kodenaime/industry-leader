import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "gold" | "outline" | "muted" | "success" | "error";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-cloud text-ink border-line",
  gold: "bg-gold-soft text-ink border-gold/30",
  outline: "bg-transparent text-ink border-ink/20",
  muted: "bg-mist text-graphite border-line",
  success: "bg-success/10 text-success border-success/20",
  error: "bg-error/10 text-error border-error/20",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
