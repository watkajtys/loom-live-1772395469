import { test, expect } from '@playwright/test';

test('Prep Route UI Verification', async ({ page }) => {
  // Navigate to the prep route
  await page.goto('/prep');

  // Verify background color (alabaster #F9F9F6) is applied somewhere on a major container
  // Using an inline script to check computed style of the main div
  const backgroundColor = await page.evaluate(() => {
    const el = document.querySelector('.bg-alabaster');
    if (el) return window.getComputedStyle(el).backgroundColor;
    return null;
  });
  // rgb(249, 249, 246) corresponds to #F9F9F6
  expect(backgroundColor).toBe('rgb(249, 249, 246)');

  // Verify text colors (charcoal text #333333, cobalt accents #0047AB)
  const textColor = await page.evaluate(() => {
    const el = document.querySelector('.text-charcoal');
    if (el) return window.getComputedStyle(el).color;
    return null;
  });
  // rgb(51, 51, 51) corresponds to #333333
  expect(textColor).toBe('rgb(51, 51, 51)');

  const cobaltColor = await page.evaluate(() => {
    const el = document.querySelector('.text-cobalt');
    if (el) return window.getComputedStyle(el).color;
    return null;
  });
  // rgb(0, 71, 171) corresponds to #0047AB
  expect(cobaltColor).toBe('rgb(0, 71, 171)');

  // Verify specific texts
  await expect(page.locator('text=Mise en Place')).toBeVisible();

  // Verify the singular monolithic step view
  // First step should be visible
  await expect(page.locator('text=Gather all ingredients and tools.')).toBeVisible();
  
  // Second step should NOT be visible
  await expect(page.locator('text=Peel and dice carrots.')).not.toBeVisible();

  // Click the body directly to simulate the giant forgiving surface
  await page.locator('body').click();

  // Verify step transition
  await expect(page.locator('text=Gather all ingredients and tools.')).not.toBeVisible();
  await expect(page.locator('text=Peel and dice carrots.')).toBeVisible();

  // Verify that the secondary elegant italic serif font is used
  const serifNotes = page.locator('text=Keep pieces uniform.');
  await expect(serifNotes).toBeVisible();
  const fontFamily = await serifNotes.evaluate((el) => window.getComputedStyle(el).fontFamily);
  expect(fontFamily).toMatch(/serif/i);
});
