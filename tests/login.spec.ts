import { test } from '@playwright/test';
import { readinessCheck } from '../utils/readinessCheck';

test('Login page readiness check', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
  await readinessCheck(page, 'h1');
  await readinessCheck(page, 'input[name="username"]');
  await readinessCheck(page, 'input[name="password"]');
  await readinessCheck(page, 'button[type="submit"]');
});
