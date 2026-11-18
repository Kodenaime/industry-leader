import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  hasError?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, hasError, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descId = description ? `${inputId}-desc` : undefined;
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-describedby={descId}
          aria-invalid={hasError || undefined}
          className={cn(
            "mt-0.5 h-4 w-4 rounded-sm border bg-cloud text-gold accent-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist disabled:cursor-not-allowed disabled:opacity-50",
            hasError ? "border-error" : "border-line",
          )}
          {...props}
        />
        {(label || description) && (
          <div className="space-y-1">
            {label ? (
              <label htmlFor={inputId} className="text-sm font-medium text-ink">
                {label}
              </label>
            ) : null}
            {description ? (
              <p id={descId} className="text-sm text-graphite">
                {description}
              </p>
            ) : null}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
