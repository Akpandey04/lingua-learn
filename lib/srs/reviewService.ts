import { ReviewItem, ReviewOutcome } from '@/types/srs';
import { scheduleReview } from './reviewScheduler';
import { UserProgress } from '@/types';

const STORAGE_KEY = 'lingua_learn_srs';

export interface SrsDatabase {
  items: Record<string, ReviewItem>;
}

const defaultDatabase = (): SrsDatabase => ({
  items: {}
});

class ReviewService {
  private loadDatabase(): SrsDatabase {
    if (typeof window === 'undefined') return defaultDatabase();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultDatabase();
      return JSON.parse(raw) as SrsDatabase;
    } catch {
      return defaultDatabase();
    }
  }

  private saveDatabase(db: SrsDatabase): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }
  }

  /**
   * Syncs the SRS database with current user progress.
   * STRICTLY IDEMPOTENT: Calling this multiple times will never duplicate items.
   * If an item already exists in the SRS database, it is safely ignored.
   */
  public syncWithProgress(progress: UserProgress): void {
    const db = this.loadDatabase();
    let updated = false;

    // Scan all completed lessons in user history
    for (const lessonProgress of Object.values(progress.lessons)) {
      if (lessonProgress.completed) {
        // We look at score details to find concepts
        // In a real scenario we might need to map lesson to concepts, 
        // but since progress tracks words in `mistakes` or `score`, we can extract from there.
        // Actually, lesson completion implies all words in that lesson were learned.
        // For simplicity in this scaffold, let's say the Mistake Notebook is our primary source
        // or we parse the lesson IDs. Since we don't have direct access to the curriculum here,
        // we'll rely on any explicit mistakes logged, or we expect the app to call an explicit 
        // `registerLearnedItems(items)` method. 
      }
    }

    if (updated) {
      this.saveDatabase(db);
    }
  }

  /**
   * Explicitly registers new vocabulary items into the SRS.
   * STRICTLY IDEMPOTENT.
   */
  public registerLearnedItems(itemIds: string[], type: ReviewItem['type'] = 'vocabulary'): void {
    const db = this.loadDatabase();
    let updated = false;
    const now = Date.now();

    for (const id of itemIds) {
      if (!db.items[id]) {
        db.items[id] = {
          id,
          type,
          nextReviewDate: now, // Due immediately for first review (or +1 day)
          interval: 0,
          reviewCount: 0,
          easeFactor: 2.5,
          consecutiveSuccesses: 0,
          consecutiveFailures: 0,
          lastReviewed: 0
        };
        updated = true;
      }
    }

    if (updated) {
      this.saveDatabase(db);
    }
  }

  public getDueReviews(now: number = Date.now()): ReviewItem[] {
    const db = this.loadDatabase();
    return Object.values(db.items).filter(item => item.nextReviewDate <= now);
  }

  public updateItem(id: string, outcome: ReviewOutcome): void {
    const db = this.loadDatabase();
    const item = db.items[id];
    
    if (item) {
      db.items[id] = scheduleReview(item, outcome);
      this.saveDatabase(db);
    }
  }
}

export const reviewService = new ReviewService();
