"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { CONSENT_CHANGE_EVENT, getStoredConsent, setStoredConsent } from "@/lib/consent";

/**
 * Optional analytics consent banner. Rendered only when
 * NEXT_PUBLIC_ANALYTICS_ID is configured, so the site ships without a banner
 * when analytics is disabled.
 */
export function ConsentBanner() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!analyticsId) return;
    const sync = () => setVisible(getStoredConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, [analyticsId]);

  if (!analyticsId || !visible) return null;

  const choose = (value: "granted" | "denied") => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cloud/98 px-4 py-4 shadow-[0_-8px_30px_rgba(23,23,23,0.08)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-graphite">
          This site can use optional analytics to understand which pages help visitors most.
          Nothing loads until you choose, and declining keeps the site fully usable.{" "}
          <a
            href="/cookies/"
            className="font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4 hover:decoration-gold-deep"
          >
            Cookie policy
          </a>
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="secondary" size="sm" onClick={() => choose("denied")}>
            Decline
          </Button>
          <Button size="sm" onClick={() => choose("granted")}>
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
