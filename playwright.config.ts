import { defineConfig, devices, expect } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://zerotier.local:54530',
    ignoreHTTPSErrors: true, // Ignore SSL errors
    trace: 'off', // Record trace for each test
    screenshot:  'on',
  },
  retries: 1,
  reporter: [['list'], ['html', { open: 'always' }]], // Generate and always open the HTML report
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
});