import { test, expect } from '@playwright/test';
import { readinessCheck } from '../utils/readinessCheck';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    try {
      await readinessCheck(page, 'h1');
      await readinessCheck(page, 'input[name="username"]');
      await readinessCheck(page, 'input[name="password"]');
      await readinessCheck(page, 'button[type="submit"]');
    } catch (e) {
      throw new Error('Readiness check failed, tests cannot proceed.Application might be down.');
    }
  });

  test('Login page readiness check', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Login with valid credentials and check success message', async ({ page }) => {
    const acceptCookies = page.locator('text=Accept All');
    if (await acceptCookies.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptCookies.click();
    }

    const usernameInput = page.locator('input[name="username"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.click();
    await page.waitForTimeout(100);
    await usernameInput.fill('practice');

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.click();
    await page.waitForTimeout(100);
    await passwordInput.fill('SuperSecretPassword!');

    await page.click('button[type="submit"]');
    await expect(page.locator("div#flash b")).toHaveText("You logged into a secure area!");
  });
});
