import { APIRequestContext } from '@playwright/test';

export async function waitFor200Status(
  request: APIRequestContext,
  url: string,
  maxRetries = 10,
  delay = 3000
): Promise<{ expected: number, actual: number }> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await request.get(url);
      const actualStatus = response.status();
      
      if (actualStatus === 200) {
        return { 
          expected: 200, 
          actual: actualStatus 
        };
      }
      
      console.log(`Attempt ${attempt}: Expected 200, Actual ${actualStatus} - Retrying in ${delay}ms...`);
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  const finalResponse = await request.get(url);
  return {
    expected: 200,
    actual: finalResponse.status()
  };
}
