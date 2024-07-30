import { test, expect, devices } from '@playwright/test';
import { moduleSnapshot } from '../helpers/snapshotHelper';

// List of URLs to capture screenshots from
const baseURL = 'https://zerotier.local:54530';
const urls = [
/*   { path: '/product/', name: 'product' },
  { path: '/pricing/', name: 'pricing' },
  { path: '/community/', name: 'community' },
  { path: '/download/', name: 'download' }, */
  { path: '/case-studies/', name: 'case-studies' },
  { path: '/reports-videos/', name: 'reports-videos' },
  { path: '/blog/', name: 'blog' },
  { path: '/how-to-modernize-device-connectivity/', name: 'how-to-modernize-device-connectivity' }
];

// Utility function to create a safe file name from a URL
function createSafeFileName(name: string, deviceName: string): string {
  return `${name}-${deviceName}`.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

// List of devices to test on
const devicesToTest = [
  { name: 'desktop', options: { viewport: { width: 1280, height: 4000} } },
  { name: 'iPhone 12', options: devices['iPhone 12'] },
];

test.describe('Visual regression tests', () => {
  for (const device of devicesToTest) {
    test.describe(`on ${device.name}`, () => {
      for (const { path, name } of urls) {
        test(`should match the screenshot for ${name}`, async ({ browser }) => {
          // Create a new context for the specified device
          const context = await browser.newContext(device.options);
          const page = await context.newPage();

          // Navigate to the full URL
          const fullUrl = `${baseURL}${path}`;
          console.log(`Navigating to ${fullUrl} on ${device.name}`);
          await page.goto(fullUrl, { waitUntil: 'load' });

          // Verify and set the cookie banner to opacity 0
          await page.evaluate(() => {
            const banner = document.querySelector('.iubenda-cs-container');
            if (banner) {
              (banner as HTMLElement).style.opacity = '0';
              console.log('Cookie banner found and hidden');
            } else {
              console.log('Cookie banner not found');
            }
          });

          // Ensure the style is applied by waiting briefly
          await page.waitForTimeout(1000);

          const moduleLocator = page.locator('body'); // Update this with the specific module locator if needed

          // Capture and compare the screenshot
          await moduleSnapshot(page, moduleLocator, {
            threshold: 0.5,
            timeout: 30000,
            waitUntil: 'networkidle',
            viewport: { width: 1280, height: 800 },
            deviceScaleFactor: 2,
          });

          await context.close();
        });
      }
    });
  }
});