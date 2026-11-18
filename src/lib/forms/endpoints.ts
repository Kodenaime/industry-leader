/**
 * Public form endpoints. These are baked into the client bundle at build time,
 * which is expected: Formspree/Web3Forms endpoints are designed to be public.
 * Never place API secrets in NEXT_PUBLIC_* variables.
 */
export const FORM_ENDPOINTS = {
  contact: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT,
  application: process.env.NEXT_PUBLIC_FORMSPREE_APPLICATION_ENDPOINT,
  newsletter: process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT,
  guide: process.env.NEXT_PUBLIC_FORMSPREE_GUIDE_ENDPOINT,
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
