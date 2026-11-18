import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded border bg-cloud px-3.5 py-2 text-base text-ink placeholder:text-stone/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist disabled:cursor-not-allowed disabled:opacity-50",
        hasError ? "border-error" : "border-line hover:border-ink/30",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
