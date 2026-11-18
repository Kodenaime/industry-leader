import type { Metadata } from "next";
import { LegalArticle, mdxComponents } from "@/components/content";
import { getLegalPage } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "How cookies and similar technologies are used on The Industry Leader website, and how to manage them.",
  path: "/cookies/",
});

export default async function CookiesPage() {
  const page = await getLegalPage("cookies", mdxComponents);
  return <LegalArticle page={page} path="/cookies/" />;
}
