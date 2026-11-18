import { hasAnalyticsConsent } from "@/lib/consent";

export type AnalyticsEvent =
  | "cta_click"
  | "booking_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "guide_download"
  | "newsletter_signup"
  | "outbound_click";

type AnalyticsValue = string | number | boolean | undefined;

/**
 * Privacy-safe analytics wrapper. Does nothing unless NEXT_PUBLIC_ANALYTICS_ID
 * is configured. Never pass names, emails, phone numbers, or free-text answers.
 */
const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function analyticsEnabled() {
  return Boolean(ANALYTICS_ID);
}

export function trackEvent(
  event: AnalyticsEvent,
  properties: Record<string, AnalyticsValue> = {},
) {
  if (typeof window === "undefined" || !ANALYTICS_ID || !hasAnalyticsConsent()) return;

  const payload: Record<string, AnalyticsValue> = { ...properties };
  for (const key of Object.keys(payload)) {
    if (typeof payload[key] === "string" && payload[key]!.length > 120) {
      delete payload[key];
    }
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
