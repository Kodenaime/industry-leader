/**
 * Analytics is entirely optional. When NEXT_PUBLIC_ANALYTICS_ID is not set at
 * build time this server component returns null and the client-side analytics,
 * consent, and Google tag chunks are never referenced.
 */
export async function Analytics() {
  if (!process.env.NEXT_PUBLIC_ANALYTICS_ID) return null;

  const [{ AnalyticsListener }, { ConsentBanner }, { GoogleAnalytics }] = await Promise.all([
    import("./AnalyticsListener"),
    import("./ConsentBanner"),
    import("./GoogleAnalytics"),
  ]);

  return (
    <>
      <AnalyticsListener />
      <GoogleAnalytics />
      <ConsentBanner />
    </>
  );
}
