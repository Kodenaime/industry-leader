export const CONSENT_STORAGE_KEY = "til-analytics-consent";
export const CONSENT_CHANGE_EVENT = "til-analytics-consent-change";

export type ConsentValue = "granted" | "denied";

/** Reads the visitor's stored analytics choice. Safe to call during SSR. */
export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Persists the visitor's choice and notifies mounted listeners. */
export function setStoredConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The banner
    // still closes for this page view; analytics stays off unless granted.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === "granted";
}
