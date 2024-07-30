import { expect, Page, Locator } from "@playwright/test";

/**
 * Mask Images to prevent them from causing visual diffs.
 *
 * @param page - The Playwright page object
 * @param module - Locator for the module element
 * @param options - Options for the screenshot comparison
 */
export const moduleSnapshot = async (
  page: Page,
  module: Locator,
  options: {
    threshold?: number;
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
    viewport?: { width: number; height: number };
    deviceScaleFactor?: number;
  } = {}
): Promise<void> => {
  // Set the cookie banner to opacity 0
  await page.evaluate(() => {
    const banner = document.querySelector('.iubenda-cs-container');
    if (banner) {
      (banner as HTMLElement).style.opacity = '0';
    }
  });

  // Ensure the style is applied by waiting briefly
  await page.waitForTimeout(1000);

  const handle = await module.elementHandle();

  if (!handle) {
    throw new Error('Module element handle could not be retrieved');
  }

  const box = await handle.boundingBox();

  if (!box) {
    throw new Error('Element bounding box could not be retrieved');
  }

  // Calculate the actual position considering the scroll offsets
  const scrollX = await page.evaluate(() => window.scrollX);
  const scrollY = await page.evaluate(() => window.scrollY);

  // Fetch all image elements within the module to mask them
  const images = await module.locator('img').all();

  await expect(page).toHaveScreenshot({
    mask: images,
    fullPage: true,
    clip: {
      x: box.x + scrollX,
      y: box.y + scrollY,
      width: box.width,
      height: box.height
    },
    ...options, // Spread the options to include them in the screenshot comparison
  });
};