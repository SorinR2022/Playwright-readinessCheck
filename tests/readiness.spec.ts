import { test } from '@playwright/test';
import { waitFor200Status } from '../utils/statusCheck';

test('Verify site returns 200 status', async ({ request }) => {
    const targetUrl = 'https://practice.expandtesting.com/';

    // Check status with retries
    const result = await waitFor200Status(request, targetUrl);

    // Log detailed results
    console.log(`\nStatus Check Result:
  Expected: ${result.expected}
  Actual: ${result.actual}
  URL: ${targetUrl}
  `);

    // Assert final status
    if (result.actual !== result.expected) {
        throw new Error(`Status check failed after retries. Expected ${result.expected}, got ${result.actual}`);
    }

    console.log('✅ Site is ready!');
});
