import { test, expect } from '@playwright/test';
import { readinessCheck } from '../utils/readinessCheck';

test.describe('Registration Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/register');
    try {
      await readinessCheck(page, 'h1');
      await readinessCheck(page, 'input[name="username"]');
      await readinessCheck(page, 'input[name="password"]');
      await readinessCheck(page, 'input[name="confirmPassword"]');
      await readinessCheck(page, 'button[type="submit"]');
    } catch (e) {
      throw new Error('Readiness check failed, tests cannot proceed. Application might be down.');
    }
  });

  test('Register page readiness check', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Register with valid username and password', async ({ page }) => {
    const uniqueUsername = `TestUser${Date.now()}`;

    const usernameInput = page.locator('input[name="username"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.click();
    await page.waitForTimeout(100);
    await usernameInput.fill(uniqueUsername);

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.click();
    await page.waitForTimeout(100);
    await passwordInput.fill('ValidPassword123');

    const confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    await expect(confirmPasswordInput).toBeVisible();
    await confirmPasswordInput.click();
    await page.waitForTimeout(100);
    await confirmPasswordInput.fill('ValidPassword123');

    await expect(usernameInput).toHaveValue(uniqueUsername);
    await expect(passwordInput).toHaveValue('ValidPassword123');
    await expect(confirmPasswordInput).toHaveValue('ValidPassword123');

    await page.click('button[type="submit"]');
    await expect(page.locator("div#flash b")).toHaveText("Successfully registered, you can log in now.");
  });
});

