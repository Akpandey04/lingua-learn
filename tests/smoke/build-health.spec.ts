import { test, expect } from '@playwright/test';
import { seedFreshUser } from '../helpers/seedState';

test.describe('Build Health Smoke Tests', () => {
  test('Application should load without console errors or runtime exceptions', async ({ page }) => {
    const errors: string[] = [];

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Listen for uncaught exceptions
    page.on('pageerror', exception => {
      errors.push(exception.message);
    });

    // Go to root page and wipe state for a clean test
    await page.goto('/');
    await seedFreshUser(page);
    await page.reload();

    // Verify root page loads the main heading
    await expect(page.getByRole('heading', { name: /Learn a language/i })).toBeVisible();

    // Verify we have no critical errors logged during initial hydration
    expect(errors.length).toBe(0);
  });

  test('404 Page renders appropriately for unknown routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    // Next.js handles 404s by serving a fallback page, check for standard NextJS 404 text or custom 404
    await expect(page.locator('body')).toContainText('Page Not Found');
  });
});
