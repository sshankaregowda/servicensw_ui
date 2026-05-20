import { defineConfig, devices } from '@playwright/test';
import './utils/env';
import { ENV } from './utils/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  outputDir: 'test-results',
  expect: {
    timeout: 10000
  },
  retries: process.env.CI ? 1 : 0,

  reporter: [['list'], ['allure-playwright']],

  use: {
    baseURL: ENV.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chrome'
      }
    }
  ]
});
