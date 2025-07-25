import { APIRequestContext } from '@playwright/test';

export async function waitFor200Status(
  request: APIRequestContext,
  url: string,
  maxRetries = 10,
  delay = 5000
): Promise<{ expected: number, actual: number }> {
 
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await request.get(url, { maxRedirects: 0 });
      const actualStatus = response.status();
      if (actualStatus === 200) {
        return { expected: 200, actual: actualStatus };
      }
      console.log(
        `Attempt ${attempt}: Expected 200, Actual ${actualStatus}. Application is down, waiting 5 seconds for retry...`
      );
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error}`);
      console.log('Application is down, waiting 5 seconds for retry...');
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  const finalResponse = await request.get(url, { maxRedirects: 0 });
  return {
    expected: 200,
    actual: finalResponse.status()
  };
}
