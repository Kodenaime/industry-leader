import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

export function Field({
  className,
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  ...props
}: FieldProps) {
  const descriptionId = htmlFor ? `${htmlFor}-description` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {label ? (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
          {label}
          {required ? <span className="ml-1 text-gold-deep">*</span> : null}
        </label>
      ) : null}
      {description ? (
        <p id={descriptionId} className="text-sm text-stone">
          {description}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldAriaProps(id?: string, opts?: { description?: boolean; error?: boolean }) {
  const describedBy = [opts?.description && id ? `${id}-description` : null, opts?.error && id ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");
  return {
    "aria-describedby": describedBy || undefined,
    "aria-invalid": opts?.error ? true : undefined,
  } as const;
}
