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

  // Additional elements to verify from new implementation
  // 1. Header icon (lucide-react ChefHat adds svg within a specific structure)
  await expect(page.locator('svg.lucide-chef-hat')).toBeVisible();

  // 2. Progress Bar
  const progressBar = page.locator('.bg-cobalt').first(); // The progress bar div
  await expect(progressBar).toBeVisible();
  // Check style width of progress bar (should be 50% for 2nd step out of 4)
  const styleWidth = await progressBar.evaluate((el) => window.getComputedStyle(el).width);
  expect(styleWidth).not.toBe('0px');

  // 3. Bottom navigation
  await expect(page.locator('text=2 / 4')).toBeVisible();
  await expect(page.locator('text=Click anywhere to advance')).toBeVisible();
  await expect(page.locator('svg.lucide-chevron-right')).toBeVisible();

  // 4. Active ingredient style
  // On step 2 ("Peel and dice carrots."), "Carrots" should be active.
  // We use filter to find the span in the top list to avoid matching the main instruction text.
  const carrotsLabel = page.locator('li span').filter({ hasText: 'Carrots' }).first();
  const carrotsClass = await carrotsLabel.evaluate((el) => el.className);
  expect(carrotsClass).toContain('border-cobalt'); // It should have the border-b-2 border-cobalt styling
  
  const onionsLabel = page.locator('li span').filter({ hasText: 'Onions' }).first();
  const onionsClass = await onionsLabel.evaluate((el) => el.className);
  expect(onionsClass).not.toContain('border-cobalt'); // It should NOT be active

  // 5. Test Keyboard Accessibility
  await page.keyboard.press('Space');
  await expect(page.locator('text=Peel and dice carrots.')).not.toBeVisible();
  await expect(page.locator('text=Chop onions finely.')).toBeVisible();
  
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('text=Chop onions finely.')).not.toBeVisible();
  await expect(page.locator('text=Dice celery and mince garlic.')).toBeVisible();
});
