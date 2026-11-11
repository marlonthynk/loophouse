import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  globalTimeout: 180_000,
  outputDir: 'artifacts/playwright/results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/playwright/report', open: 'never' }],
    ['json', { outputFile: 'artifacts/playwright/results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4175',
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
