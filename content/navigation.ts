export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Program", href: "/program/" },
  { label: "Projects", href: "/projects/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact", href: "/contact/" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Program", href: "/program/" },
  { label: "Projects", href: "/projects/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "About", href: "/#about" },
  { label: "Apply", href: "/#apply" },
  { label: "Insights", href: "/#insights" },
  { label: "Free Guide", href: "/#free-guide" },
  { label: "Contact", href: "/contact/" },
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Cookies", href: "/cookies/" },
];
