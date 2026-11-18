import * as React from "react";
import { cn } from "@/lib/utils";

export type FormErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p
        ref={ref}
        role="alert"
        className={cn("text-sm text-error", className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
FormError.displayName = "FormError";
