import { Page } from '@playwright/test';


export async function readinessCheck(page: Page, selector: string, timeout = 5000): Promise<void> {

  await page.waitForSelector(selector, { timeout });
}
