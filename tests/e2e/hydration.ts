import type { Page } from "@playwright/test";

/**
 * Wait until React has hydrated the first form on the page.
 *
 * Playwright can click a server-rendered button before React attaches its event
 * handlers (especially in `next dev`, where routes compile on demand). The click
 * then does nothing and the assertion fails even though the UI works. React only
 * writes its internal fiber/props keys onto hydrated DOM nodes, so their presence
 * is a reliable signal that handlers are live.
 */
export async function waitForHydration(page: Page, selector = "form") {
  await page.waitForFunction((target) => {
    const element = document.querySelector(target);
    if (!element) return false;
    return Object.keys(element).some((key) => key.startsWith("__react"));
  }, selector);
}
