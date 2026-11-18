"use client";

import Script from "next/script";
import * as React from "react";
import { CONSENT_CHANGE_EVENT, getStoredConsent } from "@/lib/consent";

/**
 * Loads Google Analytics only after the visitor grants consent. The measurement
 * ID is a public build-time value; when unset this component renders nothing.
 */
export function GoogleAnalytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    if (!analyticsId) return;
    const sync = () => setGranted(getStoredConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, [analyticsId]);

  if (!analyticsId || !granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
