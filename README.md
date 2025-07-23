# Playwright Readiness Check Framework

A comprehensive test automation framework built with Playwright that focuses on application readiness checks and robust test execution across multiple browsers.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Test Files](#test-files)
- [Utilities](#utilities)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Contributing](#contributing)

## 🎯 Overview

This framework provides a robust testing solution that ensures your application is ready before executing functional tests. It includes readiness checks, status monitoring, and comprehensive browser testing capabilities.

## ✨ Features

- **Multi-browser Testing**: Runs tests across Chrome, Firefox, and WebKit
- **Readiness Checks**: Validates page elements before test execution
- **Status Code Monitoring**: Checks application health via HTTP status codes
- **Automatic Retry Logic**: Retries failed requests with configurable delays
- **Cookie Banner Handling**: Automatically dismisses cookie consent popups
- **Dynamic Test Skipping**: Skips tests when readiness checks fail
- **Comprehensive Reporting**: Generates detailed test reports with videos and screenshots

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playwright-readinessCheck
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```
Playwright-readinessCheck/
├── tests/
│   ├── login.spec.ts          # Login page tests
│   ├── register.spec.ts       # Registration page tests
│   └── readiness.spec.ts      # Status code readiness tests
├── utils/
│   ├── readinessCheck.ts      # Page element readiness utility
│   └── statusCheck.ts         # HTTP status check utility
├── testConfig.ts              # Test configuration settings
├── playwright.config.ts       # Playwright configuration
└── README.md
```

## ⚙️ Configuration

### Test Configuration (`testConfig.ts`)

Configure which browsers to run and execution mode:

```typescript
export class TestConfig {
  static headed = false;        // true = headed, false = headless
  static runChrome = true;      // Enable/disable Chrome
  static runFirefox = true;     // Enable/disable Firefox
  static runWebkit = true;      // Enable/disable WebKit

  static getProjects(devices: any) {
    const projects = [];
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
```

### Playwright Configuration (`playwright.config.ts`)

The main Playwright configuration file that uses `testConfig.ts` for browser selection and execution settings.

## 🧪 Test Files

### 1. Login Tests (`tests/login.spec.ts`)

Tests login functionality with:
- **Readiness Checks**: Validates all required elements are present
- **Cookie Handling**: Automatically accepts cookie banners
- **Login Flow**: Tests successful login with valid credentials
- **Error Handling**: Fails tests if readiness checks don't pass

**Usage:**
```bash
npx playwright test tests/login.spec.ts
```

### 2. Registration Tests (`tests/register.spec.ts`)

Tests user registration with:
- **Form Validation**: Ensures all registration fields are available
- **Unique User Generation**: Creates unique usernames for each test run
- **Success Verification**: Confirms successful registration message

**Usage:**
```bash
npx playwright test tests/register.spec.ts
```

### 3. Readiness Tests (`tests/readiness.spec.ts`)

API-based tests for application health:
- **Status Code Validation**: Tests different HTTP status codes (200, 400, 500)
- **Retry Logic**: Configurable retry attempts with delays
- **Health Monitoring**: Validates application availability

**Configuration:**
```typescript
// Change the status code in the URL to test different scenarios
const url = 'https://httpbin.org/status/200';  // or 400, 500, etc.
```

## 🛠 Utilities

### 1. Readiness Check (`utils/readinessCheck.ts`)

Validates that page elements are present and ready for interaction:

```typescript
export async function readinessCheck(page: Page, selector: string, timeout = 5000): Promise<void> {
  await page.waitForSelector(selector, { timeout });
}
```

### 2. Status Check (`utils/statusCheck.ts`)

Monitors application health via HTTP status codes with retry logic:

```typescript
export async function waitFor200Status(
  request: APIRequestContext,
  url: string,
  maxRetries = 10,
  delay = 5000
): Promise<{ expected: number, actual: number }>
```

**Features:**
- Configurable retry attempts
- Customizable delay between retries
- Detailed logging of each attempt
- Returns both expected and actual status codes

## 🏃 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/register.spec.ts
npx playwright test tests/readiness.spec.ts
```

### Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in Headed Mode
Temporarily run in headed mode (overrides config):
```bash
npx playwright test --headed
```

### Debug Mode
```bash
npx playwright test --debug
```

## 📊 Test Reports

### Generate HTML Report
```bash
npx playwright show-report
```

### Features Included:
- **Test Execution Summary**: Pass/fail rates across browsers
- **Screenshots**: Captured on test failures
- **Videos**: Recorded for browser-based tests (not API tests)
- **Detailed Logs**: Step-by-step execution details
- **Error Messages**: Clear failure reasons

**Note:** Videos are only generated for browser-based tests (`page` fixture). API tests (`request` fixture) do not generate videos.

## 🔧 Customization

### Adding New Tests

1. Create a new `.spec.ts` file in the `tests/` directory
2. Include readiness checks in `beforeEach` hook:
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.goto('your-url');
     try {
       await readinessCheck(page, 'selector1');
       await readinessCheck(page, 'selector2');
     } catch (e) {
       throw new Error('Readiness check failed, tests cannot proceed.');
     }
   });
   ```

### Modifying Browser Configuration

Update `testConfig.ts` to change browser settings:
- Set `headed = true` for visual debugging
- Disable browsers by setting them to `false`
- Browsers run in parallel by default

### Adjusting Retry Logic

Modify retry parameters in test calls:
```typescript
// 3 retries, 5 second delay
const result = await waitFor200Status(request, url, 3, 5000);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npx playwright test`
6. Commit your changes: `git commit -am 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📝 Best Practices

- Always include readiness checks before functional tests
- Use unique data for tests (timestamps, random strings)
- Handle dynamic content (cookie banners, popups)
- Configure appropriate timeouts for your application
- Use meaningful test descriptions and error messages
- Keep test data isolated and independent

## 🔍 Troubleshooting

### Common Issues:

1. **Tests failing due to cookie banners**: Update cookie selectors in test files
2. **Readiness checks timing out**: Increase timeout values or check selectors
3. **Videos not generating**: Videos only work for browser tests, not API tests
4. **Multiple browser executions**: Each test runs per configured browser (normal behavior)

### Debug Commands:
```bash
# Run with verbose output
npx playwright test --reporter=line

# Run single test with debug
npx playwright test tests/login.spec.ts --debug

# Generate trace files
npx playwright test --trace=on
```

## 📖 Example Test Execution Flow

1. **Readiness Check**: Framework validates page elements are loaded
2. **Browser Selection**: Tests run across Chrome, Firefox, and WebKit
3. **Test Execution**: Functional tests execute if readiness passes
4. **Error Handling**: Tests fail gracefully with clear error messages
5. **Reporting**: Comprehensive reports with screenshots and videos
