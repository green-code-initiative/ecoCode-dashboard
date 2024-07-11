import { expect, test } from '@playwright/test';
import { loadStory } from '../tests/visual-regression.js';

test('ImpactTag: Optimized', async ({ page }) => {
  await loadStory(page, 'atoms-impact-tag--optimized-impact');
  await expect(page).toHaveScreenshot();
});

test('ImpactTag: Info', async ({ page }) => {
  await loadStory(page, 'atoms-impact-tag--info-impact');
  await expect(page).toHaveScreenshot();
});