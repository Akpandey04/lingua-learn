import { test, expect } from '@playwright/test';
import { seedFreshUser } from '../helpers/seedState';

test.describe('Standard Navigation & Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await seedFreshUser(page);
    await page.reload();
  });

  test('Dashboard loads properly for French language', async ({ page }) => {
    // Navigate straight to /french
    await page.goto('/french');
    
    // Check that the Course Overview loads using semantic headings or exact text
    await expect(page.getByText('Overall Progress')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Learning Path' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Review Center' })).toBeVisible();
  });

  test('Mistake Notebook mounts correctly when accessed', async ({ page }) => {
    // Navigate straight to the mistakes notebook
    await page.goto('/french/mistakes');
    await expect(page.getByRole('heading', { name: 'Mistakes' })).toBeVisible();
    // Verify the empty state renders appropriately
    await expect(page.getByText('No mistakes found!')).toBeVisible();
  });

  test('Review Center opens but prevents entry on empty state', async ({ page }) => {
    await page.goto('/french');
    await expect(page.getByRole('heading', { name: 'Review Center' })).toBeVisible();
    // With a fresh user, the start review button shouldn't be active. It should show 'Done'
    await expect(page.getByText('Done')).toBeVisible();
  });
});
