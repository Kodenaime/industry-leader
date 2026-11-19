import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/program/",
  "/about/",
  "/projects/",
  "/testimonials/",
  "/free-guide/thank-you/",
  "/contact/",
  "/privacy/",
];

for (const path of pages) {
  test(`${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    const summary = blocking
      .map(
        (violation) =>
          `${violation.id} (${violation.impact}): ${violation.help}\n${violation.nodes
            .map((node) => `  ${node.target.join(" ")}`)
            .join("\n")}`,
      )
      .join("\n\n");

    expect(blocking, summary).toEqual([]);
  });
}

test("main navigation is keyboard reachable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
