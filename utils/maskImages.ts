import { Page, Locator } from "@playwright/test";

/**
 * Workaround for featured image false negatives due to rendering differences
 *
 * @param {Page} page - The Playwright page object
 * @returns             Locators for all images on the page
 */
export const maskImages = async (page: Page): Promise<Locator[]> => {
    return await page.locator('img').all();
};
