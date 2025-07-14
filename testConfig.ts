import type { Project} from '@playwright/test';

export class TestConfig {
  static headed = false; // true = headed, false = headless
  static runChrome = true;
  static runFirefox = true;
  static runWebkit = true;

  static getProjects(devices: any) {
    const projects: { name: string; use: any }[] = [];
    if (this.runChrome) {
      projects.push({
        name: 'chromium',
        use: { ...devices['Desktop Chrome'], headless: !this.headed },
      });
    }
    if (this.runFirefox) {
      projects.push({
        name: 'firefox',
        use: { ...devices['Desktop Firefox'], headless: !this.headed },
      });
    }
    if (this.runWebkit) {
      projects.push({
        name: 'webkit',
        use: { ...devices['Desktop Safari'], headless: !this.headed },
      });
    }
    return projects;
  }
}