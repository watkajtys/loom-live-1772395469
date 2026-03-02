import { test, expect } from '@playwright/test';

test('Verify ingredients default to Charcoal text with only the active step\'s ingredients highlighted in Cobalt Blue. Confirm footer elements (step counter, advance text, directional arrows) are perfectly centered. Ensure the basic step number circle is replaced with an SVG icon representing the current culinary action.', async ({ page }) => {
  await page.goto('/prep');

  // Verify elements exist
  await expect(page.locator('text=400g Pasta')).toBeVisible();
  
  // Verify default Charcoal text and active Cobalt Blue text
  // The first item should be default (assuming step index 3 defaults to 400g Pasta active, and others inactive)
  const garlicLocator = page.locator('div').filter({ hasText: /^2 Cloves Garlic$/ });
  await expect(garlicLocator).toHaveClass(/bg-white/);
  await expect(garlicLocator.locator('span')).toHaveClass(/text-charcoal\/60/);

  const pastaLocator = page.locator('div').filter({ hasText: /^400g Pasta$/ });
  await expect(pastaLocator).toHaveClass(/bg-cobalt-light/);
  await expect(pastaLocator.locator('span')).toHaveClass(/text-cobalt/);

  // Check footer centering
  const footerContainer = page.locator('.relative.z-10.w-full.pb-10.flex.flex-col.items-center.justify-end > div');
  await expect(footerContainer).toHaveClass(/flex items-center justify-center/);
  
  // Verify footer elements exist
  await expect(page.locator('button[aria-label="Previous Step"] svg')).toBeVisible();
  await expect(page.locator('button[aria-label="Next Step"] svg')).toBeVisible();
  await expect(page.locator('text=Step 4 of 6')).toBeVisible();

  // Verify the SVG icon replacing basic step circle
  const mainIconContainer = page.locator('.mb-6.text-cobalt.opacity-80.flex.justify-center.items-center > svg');
  await expect(mainIconContainer).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'evidence.png', fullPage: true });
});
