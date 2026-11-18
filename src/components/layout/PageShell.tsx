import * as React from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main id="main-content" tabIndex={-1} className={cn("min-h-screen outline-none", className)}>
      {children}
    </main>
  );
}
