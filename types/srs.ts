import { Lesson } from './domain';

export type ReviewItemType = 'vocabulary' | 'grammar' | 'pronunciation' | 'listening' | 'sentence';

export interface ReviewItem {
  id: string; // The vocabulary/concept ID (e.g., 'a1_es_agua')
  type: ReviewItemType;
  nextReviewDate: number; // Epoch timestamp
  interval: number; // Current interval in days
  reviewCount: number;
  easeFactor: number; // SM-2 default 2.5
  consecutiveSuccesses: number;
  consecutiveFailures: number;
  lastReviewed: number; // Epoch timestamp
}

export interface ReviewLesson extends Lesson {
  metadata: {
    source: "review";
    generatedAt: number;
    reviewItemIds: string[];
  };
}

export enum ReviewOutcome {
  Again = 0,
  Hard = 1,
  Good = 2,
  Easy = 3
}
