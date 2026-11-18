/* eslint-disable @next/next/no-img-element -- static export uses unoptimized
   images; a plain img avoids shipping the next/image client runtime. */
import { cn } from "@/lib/utils";

export interface PortraitFrameProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  frame?: "left" | "right";
  sizes?: string;
}

/**
 * Editorial portrait with the offset gold frame used across the site.
 * Dimensions are explicit so the image reserves space and does not shift layout.
 */
export function PortraitFrame({
  src = "/images/portrait-placeholder.svg",
  alt,
  width = 1200,
  height = 1500,
  priority = false,
  className,
  imageClassName,
  frame = "left",
}: PortraitFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-sm border border-gold/70",
          frame === "left" ? "-translate-x-4 translate-y-4" : "translate-x-4 translate-y-4",
        )}
      />
      <div className="relative overflow-hidden rounded-sm bg-charcoal">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
