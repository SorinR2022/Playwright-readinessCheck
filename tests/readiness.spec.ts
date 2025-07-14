import { test, expect } from '@playwright/test';
import { waitFor200Status } from '../utils/statusCheck';


const url = 'https://httpbin.org/status/200';

test('should pass only for status code 200', async ({ request }) => {
  const result = await waitFor200Status(request, url, 3, 5000);

  expect(
    result.actual,
    result.actual === 200
      ? 'Application is UP (200)'
      : `Application is down at the moment, status code ${result.actual}`
  ).toBe(200);
});

//other examples https://duckduckgo.com/health
// https://status.cloud.google.com/incidents.json
