type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Renders schema.org structured data. Server component so the JSON is present
 * in the static HTML for crawlers, with `<` escaped to avoid script injection.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
