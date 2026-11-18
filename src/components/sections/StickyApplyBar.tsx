import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { APPLY_HREF, PROGRAM_HREF } from "@/lib/links";

/** Sticky mobile conversion bar. Hidden from desktop and from print. */
export function StickyApplyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-mist/95 px-4 py-3 backdrop-blur print:hidden lg:hidden">
      <div className="flex items-center gap-3">
        <Link
          href={PROGRAM_HREF}
          className="text-sm font-semibold text-graphite underline decoration-line underline-offset-4"
        >
          Program
        </Link>
        <Link
          href={APPLY_HREF}
          data-analytics="cta_click"
          data-analytics-label="sticky-apply"
          data-analytics-location="sticky-bar"
          className="ml-auto inline-flex h-11 items-center justify-center gap-2 rounded bg-gold px-5 text-sm font-semibold text-ink shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2"
        >
          Apply now
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
