"use client";

import * as React from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const EVENTS: AnalyticsEvent[] = [
  "cta_click",
  "booking_click",
  "guide_download",
  "newsletter_signup",
  "outbound_click",
];

/**
 * Listens for elements marked with `data-analytics="<event>"` so server
 * components can emit conversion events without becoming client components.
 * Only non-identifying attributes are read.
 */
export function AnalyticsListener() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics]");
      if (!element) return;
      const name = element.dataset.analytics as AnalyticsEvent | undefined;
      if (!name || !EVENTS.includes(name)) return;
      trackEvent(name, {
        label: element.dataset.analyticsLabel,
        location: element.dataset.analyticsLocation,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
