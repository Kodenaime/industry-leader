/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowRight, Info, Lightbulb, TriangleAlert } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type MdxLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function MdxLink({ href = "", children, ...props }: MdxLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const isSpecial = href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  if (isSpecial) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function MdxImage({
  src,
  alt = "",
  width,
  height,
  className,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;
  const parsedWidth = Number(width) || 1600;
  const parsedHeight = Number(height) || 900;

  return (
    <img
      src={src}
      alt={alt}
      width={parsedWidth}
      height={parsedHeight}
      loading="lazy"
      decoding="async"
      className={cn("h-auto w-full rounded border border-line", className)}
    />
  );
}

function MdxTable({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  );
}

type CalloutType = "note" | "tip" | "warning";

const calloutStyles: Record<CalloutType, { wrapper: string; icon: React.ReactNode }> = {
  note: {
    wrapper: "border-line bg-cloud text-graphite",
    icon: <Info className="h-5 w-5 text-gold-deep" aria-hidden="true" />,
  },
  tip: {
    wrapper: "border-gold/50 bg-gold-soft/30 text-graphite",
    icon: <Lightbulb className="h-5 w-5 text-gold-deep" aria-hidden="true" />,
  },
  warning: {
    wrapper: "border-error/30 bg-error/5 text-graphite",
    icon: <TriangleAlert className="h-5 w-5 text-error" aria-hidden="true" />,
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children?: React.ReactNode;
}) {
  const styles = calloutStyles[type] ?? calloutStyles.note;

  return (
    <aside className={cn("not-prose my-8 rounded border p-5 sm:p-6", styles.wrapper)}>
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0">{styles.icon}</span>
        <div className="space-y-2 text-base leading-relaxed">
          {title ? <p className="font-semibold text-ink">{title}</p> : null}
          <div className="[&>p]:m-0 [&>p+p]:mt-3">{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function Quote({
  children,
  attribution,
}: {
  children?: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="not-prose my-10 border-l-2 border-gold pl-6">
      <blockquote className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-3 text-sm font-medium text-stone">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}

export function Cta({
  title = "Ready to turn insight into practice?",
  description = "The program is where the ideas become personal, practical, and durable.",
  href = "/#apply",
  label = "Apply for the Program",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <aside className="not-prose my-10 rounded border border-ink/10 bg-charcoal p-6 text-cloud sm:p-8">
      <p className="font-display text-2xl leading-snug">{title}</p>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-cloud/75">{description}</p>
      <Button href={href} className="mt-5" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
        {label}
      </Button>
    </aside>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  table: MdxTable,
  Callout,
  Quote,
  Cta,
};
