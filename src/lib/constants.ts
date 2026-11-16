export const SITE = {
  name: "The Industry Leader",
  legalName: "Business Reimagined Incorporated",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theindustryleader.net",
  tagline: "Capability gets you into the room. Influence makes you the leader in it.",
  description:
    "One-on-one leadership coaching for capable professionals ready to turn expertise into authority, influence, and lasting impact.",
  email: "hello@theindustryleader.net",
  location: "Boston, Massachusetts",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
] as const;

export const NAV_ITEMS = [
  { label: "About", href: "/about/" },
  { label: "Program", href: "/program/" },
  { label: "Results", href: "/results/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/contact/" },
] as const;
