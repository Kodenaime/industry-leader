import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /become the leader/i },
  { path: "/program/", heading: /become the leader your industry follows/i },
  { path: "/projects/", heading: /real leaders/i },
  { path: "/testimonials/", heading: /in their words/i },
  { path: "/insights/strategic-judgment/", heading: /strategic judgment/i },
  { path: "/contact/", heading: /start a conversation/i },
  { path: "/privacy/", heading: /privacy policy/i },
  { path: "/terms/", heading: /terms of use/i },
  { path: "/cookies/", heading: /cookie policy/i },
];

for (const entry of pages) {
  test(`${entry.path} renders with one H1`, async ({ page }) => {
    await page.goto(entry.path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.heading);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${entry.path.replace(/\/$/, "")}/?$`),
    );
  });
}

test("unknown route returns the branded 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /this page could not be found/i,
  );
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});

test("homepage insights section lists every post and links to the feed", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#insights");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    /notes on leadership, authority, and influence/i,
  );
  await expect(section.locator("article")).toHaveCount(6);
  await expect(section.getByRole("link", { name: /subscribe via rss/i })).toHaveAttribute(
    "href",
    "/rss.xml",
  );
});

test("homepage contains the folded-in about, free guide and apply sections", async ({ page }) => {
  await page.goto("/");
  for (const anchor of ["about", "free-guide", "apply", "testimonials"]) {
    await expect(page.locator(`#${anchor}`)).toBeAttached();
  }
  await expect(page.locator("#testimonials")).toContainText("Bankole Adewumi");
});

test("post table of contents links to headings", async ({ page }) => {
  await page.goto("/insights/strategic-judgment/");
  await page
    .getByRole("navigation", { name: "On this page" })
    .getByRole("link", { name: /decide before you are forced to/i })
    .click();
  await expect(page).toHaveURL(/#decide-before-you-are-forced-to$/);
});

test("program curriculum accordion is keyboard operable", async ({ page }) => {
  await page.goto("/program/");
  const details = page.locator("#accordion-week-1");
  await expect(details).toHaveJSProperty("open", true);
  const summary = details.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveJSProperty("open", false);
  await page.keyboard.press("Enter");
  await expect(details).toHaveJSProperty("open", true);
});

test("article carries Article and BreadcrumbList structured data", async ({ page }) => {
  await page.goto("/insights/strategic-judgment/");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = blocks.map((block) => JSON.parse(block)["@type"]);
  expect(types).toContain("Article");
  expect(types).toContain("BreadcrumbList");
});
