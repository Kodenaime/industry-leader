/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Testimonial } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

export function isPlaceholderTestimonial(testimonial: Testimonial) {
  return /placeholder/i.test(testimonial.quote);
}

export function TestimonialCard({
  testimonial,
  className,
  variant = "default",
}: {
  testimonial: Testimonial;
  className?: string;
  variant?: "default" | "dark" | "featured";
}) {
  const placeholder = isPlaceholderTestimonial(testimonial);
  const dark = variant === "dark";

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded border p-6 sm:p-8",
        dark ? "border-cloud/15 bg-cloud/5" : "border-line bg-cloud shadow-soft",
        variant === "featured" && "sm:p-10",
        className,
      )}
    >
      <Quote
        aria-hidden="true"
        className={cn("h-6 w-6 shrink-0", dark ? "text-gold" : "text-gold-deep")}
      />
      <blockquote
        className={cn(
          "mt-4 flex-1 font-display text-balance",
          variant === "featured" ? "text-2xl leading-snug sm:text-3xl" : "text-xl leading-snug",
          dark ? "text-cloud" : "text-ink",
        )}
      >
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption
        className={cn(
          "mt-6 flex items-start gap-4 border-t pt-4 text-sm",
          dark ? "border-cloud/15 text-cloud/75" : "border-line text-graphite",
        )}
      >
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt=""
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className={cn(
              "shrink-0 rounded-full object-cover ring-1",
              variant === "featured" ? "h-16 w-16" : "h-12 w-12",
              dark ? "ring-cloud/20" : "ring-line",
            )}
          />
        ) : null}
        <div>
          <span className={cn("block font-semibold", dark ? "text-cloud" : "text-ink")}>
            {testimonial.author}
          </span>
          <span className="block">
            {testimonial.role}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </span>
          {testimonial.location ? <span className="block">{testimonial.location}</span> : null}
          {placeholder ? (
            <Badge
              variant={dark ? "outline" : "muted"}
              className="mt-3 border-gold/40 text-[0.65rem]"
            >
              Placeholder — pending approval
            </Badge>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialLink({ href = "/testimonials/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 transition-colors hover:decoration-gold-deep"
    >
      Read all testimonials
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
