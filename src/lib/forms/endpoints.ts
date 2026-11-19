/**
 * Public form endpoints. These are baked into the client bundle at build time,
 * which is expected: Formspree endpoints are designed to be public.
 * Never place API secrets in NEXT_PUBLIC_* variables.
 *
 * A single shared endpoint is used by all four forms unless a form-specific
 * override is configured. Every payload carries a form name and submission ID
 * so one Formspree inbox can still be filtered and tracked.
 */
const SHARED_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

function withFallback(specific: string | undefined) {
  return specific || SHARED_ENDPOINT;
}

export const FORM_ENDPOINTS = {
  contact: withFallback(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT),
  application: withFallback(process.env.NEXT_PUBLIC_FORMSPREE_APPLICATION_ENDPOINT),
  newsletter: withFallback(process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT),
  guide: withFallback(process.env.NEXT_PUBLIC_FORMSPREE_GUIDE_ENDPOINT),
} as const;

export type FormName = keyof typeof FORM_ENDPOINTS;

export const FORM_LABELS: Record<FormName, string> = {
  contact: "contact",
  application: "application",
  newsletter: "newsletter",
  guide: "free guide",
};

export function isFormConfigured(name: FormName) {
  return Boolean(FORM_ENDPOINTS[name]);
}
