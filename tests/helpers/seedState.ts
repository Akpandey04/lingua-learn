import { Page } from '@playwright/test';

/**
 * Seeds a fresh user by clearing local storage.
 */
export async function seedFreshUser(page: Page) {
  await page.evaluate(() => {
    window.localStorage.clear();
  });
}

/**
 * Seeds a user with one completed lesson.
 */
export async function seedCompletedLesson(page: Page, language: string = 'french') {
  await page.evaluate(({ lang }) => {
    window.localStorage.setItem('lingua_learn_progress', JSON.stringify({
      lessons: {
        'unit-01-meeting-lesson-1': {
          id: 'unit-01-meeting-lesson-1',
          completed: true,
          score: 100,
          mistakes: 0,
          completedAt: Date.now(),
        }
      },
      streak: 1,
    }));
  }, { lang: language });
}

/**
 * Seeds a user with reviews due (SRS integration).
 */
export async function seedReviewDue(page: Page, language: string = 'french') {
  await page.evaluate(({ lang }) => {
    // Generate a review item that is due
    const yesterday = Date.now() - (24 * 60 * 60 * 1000);
    window.localStorage.setItem('lingua_learn_srs', JSON.stringify({
      items: {
        'item-1': {
          id: 'item-1',
          conceptId: 'hello',
          conceptType: 'vocabulary',
          nextReviewDate: yesterday, // Due yesterday
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0
        }
      }
    }));
  }, { lang: language });
}
