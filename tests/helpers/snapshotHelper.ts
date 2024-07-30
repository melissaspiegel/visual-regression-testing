import { expect, Page, Locator } from "@playwright/test";

/**
 * Take a screenshot of a module by clipping to its bounding box (relative to scroll position) and masking specified elements.
 *
 * @param page - The Playwright page object
 * @param module - Locator for the module element
 */
export const moduleSnapshot = async (page: Page, module: Locator): Promise<void> => {
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
    }
  });
};