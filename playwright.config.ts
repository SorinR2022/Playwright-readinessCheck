import { defineConfig, devices } from '@playwright/test';
import { TestConfig } from './testConfig';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Enable video recording for every test
    video: 'on', // or 'retain-on-failure' for only failed tests
    // Optionally, set headless to false for headed mode by default
    // headless: false,
    trace: 'on-first-retry',
  },
  projects: TestConfig.getProjects(devices),
});
