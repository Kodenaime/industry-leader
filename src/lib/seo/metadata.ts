import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const SITE_URL = SITE.url.replace(/\/$/, "");
export const DEFAULT_OG_IMAGE = "/og/default.png";
export const TITLE_TEMPLATE = `%s | ${SITE.name}`;

/** Join a site-relative path to the canonical origin. */
export function absoluteUrl(pathname = "/") {
  if (/^https?:\/\//.test(pathname)) return pathname;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

/** Normalize internal links to the deployed trailing-slash format. */
export function canonicalPath(pathname = "/") {
  if (pathname === "/") return "/";
  const [withoutQuery] = pathname.split(/[?#]/);
  return withoutQuery.endsWith("/") ? withoutQuery : `${withoutQuery}/`;
}

export type BuildMetadataOptions = {
  /** Page title. The root template appends "| The Industry Leader". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/program/". */
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noindex?: boolean;
  /** Skip the "| The Industry Leader" template, e.g. the homepage title. */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE.name} — leadership coaching for capable professionals`,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noindex = false,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const canonical = canonicalPath(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      type,
      title: socialTitle,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
