import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://zerotier.local:54530/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ZeroTier – Global Area Networking/);
});

/* test('get started link', async ({ page }) => {
  await page.goto('https://zerotier.local:54530/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Imagine what you could do if global networking were simple.' })).toBeVisible();
});
 */