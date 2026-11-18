import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text-link";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  download?: boolean | string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold/90 active:bg-gold/85 shadow-soft border border-transparent",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:bg-cloud",
  ghost: "bg-transparent text-ink hover:bg-cloud border border-transparent",
  "text-link":
    "bg-transparent text-gold-deep underline decoration-gold-deep/30 underline-offset-4 hover:decoration-gold-deep border border-transparent px-0 h-auto",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-5 text-sm gap-2.5",
  lg: "h-12 px-6 text-base gap-3",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      href,
      download,
      disabled,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const content = (
      <>
        {loading ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : icon && iconPosition === "left" ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className={cn(loading && "opacity-90")}>{children}</span>
        {!loading && icon && iconPosition === "right" ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </>
    );

    const classes = cn(
      "inline-flex items-center justify-center rounded font-sans font-semibold tracking-tight transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist disabled:pointer-events-none disabled:opacity-50",
      variantClasses[variant],
      variant !== "text-link" && sizeClasses[size],
      variant === "text-link" && "justify-start",
      className,
    );

    if (href) {
      return (
        <a
          href={isDisabled ? undefined : href}
          download={download}
          aria-disabled={isDisabled || undefined}
          data-loading={loading || undefined}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = "Button";
