import { test, expect } from '@playwright/test';

// List of URLs to capture screenshots from
const baseURL = 'https://zerotier.local:54530';
const urls = [
  { path: '/product/', name: 'product' },
  { path: '/pricing/', name: 'pricing' },
  { path: '/community/', name: 'community' },
  { path: '/download/', name: 'download' },
  { path: '/case-studies/', name: 'case-studies' },
  { path: '/reports-videos/', name: 'reports-videos' },
  { path: '/blog/', name: 'blog' },
  { path: '/how-to-modernize-device-connectivity/', name: 'how-to-modernize-device-connectivity' }
];

// Utility function to create a safe file name from a URL
function createSafeFileName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

test.describe('Visual regression tests', () => {
  for (const { path, name } of urls) {
    test(`should match the screenshot for ${name}`, async ({ page }) => {
      // Navigate to the full URL
      const fullUrl = `${baseURL}${path}`;
      console.log(`Navigating to ${fullUrl}`);
      await page.goto(fullUrl, { waitUntil: 'load' });

      // Take a screenshot and compare it with the baseline
      const screenshot = await page.screenshot();
      const fileName = createSafeFileName(name);
      expect(screenshot).toMatchSnapshot(`${fileName}.png`);
    });
  }
});