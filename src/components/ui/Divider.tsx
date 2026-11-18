import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  tone?: "light" | "dark";
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, tone = "light", ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "border-0 border-t",
        tone === "dark" ? "border-cloud/15" : "border-line",
        className,
      )}
      {...props}
    />
  ),
);
Divider.displayName = "Divider";
