import type { Metadata } from "next";
import { LegalArticle, mdxComponents } from "@/components/content";
import { getLegalPage } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms that govern use of theindustryleader.net, its content, and the coaching services described on the site.",
  path: "/terms/",
});

export default async function TermsPage() {
  const page = await getLegalPage("terms", mdxComponents);
  return <LegalArticle page={page} path="/terms/" />;
}
