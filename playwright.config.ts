import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://zerotier.local:54530',
    browserName: 'chromium', // or 'firefox', 'webkit'
    ignoreHTTPSErrors: true, // Add this line to ignore SSL errors
    trace: 'on', // Record trace for each test
  },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
});