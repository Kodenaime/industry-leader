import { author } from "@/content/author";
import { site } from "@/content/site";
import type { Author, Faq, PostFrontmatter, Program } from "@/lib/content/schemas";
import { absoluteUrl, canonicalPath, DEFAULT_OG_IMAGE, SITE_URL } from "./metadata";
type JsonLdNode = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function professionalServiceSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: SITE_URL,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.split(",")[0]?.trim(),
      addressRegion: site.location.split(",")[1]?.trim(),
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide (remote coaching)",
    },
    founder: { "@id": PERSON_ID },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "Leadership coaching",
      "Executive presence",
      "Influence and persuasion",
      "Authority and positioning",
      "Team performance",
    ],
  };
}

export function personSchema(data: Author = author): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: data.name,
    jobTitle: "Leadership Coach and Author",
    description: data.shortBio,
    url: absoluteUrl("/"),
    image: absoluteUrl(data.portrait ?? "/images/portrait-placeholder.svg"),
    worksFor: { "@id": ORGANIZATION_ID },
    ...(data.email ? { email: data.email } : {}),
    sameAs: data.socials.map((social) => social.href),
    knowsAbout: data.credentials,
    ...(data.books.length
      ? {
          author: data.books.map((book) => ({
            "@type": "Book",
            name: book.title,
            ...(book.url ? { url: book.url } : {}),
          })),
        }
      : {}),
  };
}

export function webSiteSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function serviceSchema(data: Program): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/program/")}#service`,
    name: data.name,
    serviceType: data.eyebrow,
    description: data.description,
    url: absoluteUrl("/program/"),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide (remote coaching)",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Managers, executives, founders, and senior professionals",
    },
    ...(data.outcomes.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${data.name} outcomes`,
            itemListElement: data.outcomes.map((outcome, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: { "@type": "Service", name: outcome },
            })),
          },
        }
      : {}),
  };
}

export function faqPageSchema(faqs: Faq[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(
  post: PostFrontmatter,
  authorData: Author = author,
): JsonLdNode {
  const path = canonicalPath(`/insights/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: absoluteUrl(path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    image: absoluteUrl(post.coverImage ?? DEFAULT_OG_IMAGE),
    articleSection: post.category,
    ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: authorData.name,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: SITE_URL,
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
