import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Footer, Header, SkipLink } from "@/components/layout";
import { JsonLd } from "@/components/seo";
import { site } from "@/content/site";
import { SITE } from "@/lib/constants";
import { webSiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Leadership Coaching`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: `${siteUrl}/` }],
  creator: site.name,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: siteUrl,
    title: `${site.name} — Leadership Coaching for Capable Professionals`,
    description: site.description,
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — become the leader your industry follows`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Leadership Coaching for Capable Professionals`,
    description: site.description,
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EE",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-mist text-ink antialiased">
        <JsonLd data={webSiteSchema()} />
        <Analytics />
        <SkipLink />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
