import { test, expect } from '@playwright/test';
import { seedReviewDue, seedFreshUser } from '../helpers/seedState';

test.describe('Spaced Repetition System (SRS) Flow', () => {
  test('Review center prevents entry when no reviews are due', async ({ page }) => {
    await page.goto('/french');
    await seedFreshUser(page);
    await page.reload();

    // Ensure the Review Center block is visible
    await expect(page.getByRole('heading', { name: 'Review Center' })).toBeVisible();

    // Verify it says "Done" instead of "Start Review"
    const startReviewBtn = page.getByRole('link', { name: 'Start Review' });
    await expect(startReviewBtn).toHaveCount(0);
    await expect(page.getByText('Done')).toBeVisible();
  });

  test('Review center activates and launches review session when items are due', async ({ page }) => {
    await page.goto('/french');
    // Seed an SRS item due yesterday
    await seedReviewDue(page, 'french');
    await page.reload();

    // Verify Review Center reflects due item
    await expect(page.getByText(/You have \d+ items due/)).toBeVisible();
    
    // Click Start Review
    const startReviewBtn = page.getByRole('link', { name: 'Start Review' });
    await expect(startReviewBtn).toBeVisible();
    await startReviewBtn.click();

    // Verify we landed in the review route
    await expect(page).toHaveURL(/\/french\/review/);

    // Verify the review session launched
    await expect(page.getByRole('heading', { name: 'Daily Review Session' })).toBeVisible();
  });
});
