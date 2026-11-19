import { expect, test } from "@playwright/test";
import { waitForHydration } from "./hydration";

test("application form blocks an empty first step", async ({ page }) => {
  await page.goto("/#apply");
  await waitForHydration(page, "#apply form");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.getByText("Step 1 of 3", { exact: false })).toBeAttached();
});

test("application form advances only after valid required fields", async ({ page }) => {
  await page.goto("/#apply");
  await waitForHydration(page, "#apply form");
  await page.getByLabel("Full name").fill("Test Applicant");
  await page.locator("#email").fill("test@example.com");
  await page.getByLabel("Phone").fill("+1 555 0100");
  await page.getByLabel("Current role").fill("Director");
  await page.getByLabel("Company or organization").fill("Example Co");
  await page.getByLabel("Location").fill("Boston, US");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByLabel(/leadership challenge/i)).toBeVisible();
  await expect(page.getByText("Step 2 of 3", { exact: false })).toBeAttached();
});

test("contact form validates required fields", async ({ page }) => {
  await page.goto("/contact/");
  await waitForHydration(page);
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#contact-name-error")).toBeVisible();
  await expect(page.locator("#contact-email-error")).toBeVisible();
  await expect(page.locator("#contact-message-error")).toBeVisible();
});

test("free guide form requires consent", async ({ page }) => {
  await page.goto("/contact/#free-guide");
  await waitForHydration(page, "#free-guide form");
  await page.getByLabel("First name").fill("Test Reader");
  await page.locator("#guide-email").fill("reader@example.com");
  await page.getByRole("button", { name: "Send me the guide" }).click();

  await expect(page.locator("#guide-consent")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(/confirm you agree to receive the guide/i)).toBeVisible();
});

test("newsletter form validates email and consent", async ({ page }) => {
  await page.goto("/contact/");
  await waitForHydration(page);
  const footer = page.locator("footer");
  await footer.getByRole("button", { name: "Subscribe" }).click();
  await expect(footer.getByRole("alert").first()).toBeVisible();
});

test("guide download link is present on the thank-you page", async ({ page }) => {
  await page.goto("/free-guide/thank-you/");
  const download = page.getByRole("link", { name: "Download the guide" });
  await expect(download).toBeVisible();
  await expect(download).toHaveAttribute("href", /the-authority-blueprint-placeholder\.pdf$/);
  await expect(download).toHaveAttribute("download", "");
});
