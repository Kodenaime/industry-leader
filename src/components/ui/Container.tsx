import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "default" | "wide" | "prose";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizes: Record<ContainerSize, string> = {
  default: "container-site",
  wide: "container-wide",
  prose: "mx-auto w-full max-w-prose px-5 sm:px-6 md:px-8",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div ref={ref} className={cn(sizes[size], className)} {...props} />
  ),
);
Container.displayName = "Container";
