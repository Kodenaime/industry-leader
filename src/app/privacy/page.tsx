import type { Metadata } from "next";
import { LegalArticle, mdxComponents } from "@/components/content";
import { getLegalPage } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How The Industry Leader and Business Reimagined Incorporated collect, use, and protect personal information.",
  path: "/privacy/",
});

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy", mdxComponents);
  return <LegalArticle page={page} path="/privacy/" />;
}
