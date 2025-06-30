import { Page } from '@playwright/test';

/**
 * Waits for a selector to appear (like a readiness check)
 * @param page Playwright Page object
 * @param selector CSS selector to wait for
 * @param timeout Max wait in ms (default 5s)
 */
export async function readinessCheck(page: Page, selector: string, timeout = 5000): Promise<void> {
  await page.waitForSelector(selector, { timeout });
}
