import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded border bg-cloud px-3.5 py-3 text-base text-ink placeholder:text-stone/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist disabled:cursor-not-allowed disabled:opacity-50",
        hasError ? "border-error" : "border-line hover:border-ink/30",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
