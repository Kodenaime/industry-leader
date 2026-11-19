import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /become the leader/i },
  { path: "/program/", heading: /become the leader your industry follows/i },
  { path: "/about/", heading: /about matthew ogieva/i },
  { path: "/projects/", heading: /real leaders/i },
  { path: "/testimonials/", heading: /in their words/i },
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

test("homepage keeps the apply and testimonial sections", async ({ page }) => {
  await page.goto("/");
  for (const anchor of ["apply", "testimonials"]) {
    await expect(page.locator(`#${anchor}`)).toBeAttached();
  }
  await expect(page.locator("#testimonials")).toContainText("Bankole Adewumi");
  await expect(page.locator("#free-guide")).toHaveCount(0);
  await expect(page.locator("#faq")).toHaveCount(0);
});

test("contact page contains the free guide and FAQ sections", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.locator("#free-guide")).toBeAttached();
  await expect(page.locator("#faq")).toBeAttached();
  await expect(page.locator("#faq")).toContainText("Who is this program for?");
});

test("projects page contains the how-it-works section", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.locator("#how-it-works")).toBeAttached();
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

