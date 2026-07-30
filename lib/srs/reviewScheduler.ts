import { ReviewItem, ReviewOutcome } from '@/types/srs';

/**
 * A pure mathematical function inspired by SM-2.
 * Calculates the next state of a ReviewItem based on the user's score.
 * 
 * Score mapping:
 * 0 (Again): Blackout. Reset interval to 1.
 * 1 (Hard): Correct but difficult. Ease factor drops.
 * 2 (Good): Correct. Ease factor stays roughly same.
 * 3 (Easy): Perfect recall. Ease factor increases.
 * 
 * @param item Current review item state
 * @param outcome The outcome of the review
 * @param now The current timestamp (defaults to Date.now(), injected for pure testability)
 * @returns A strictly new updated ReviewItem instance
 */
export function scheduleReview(item: ReviewItem, outcome: ReviewOutcome, now: number = Date.now()): ReviewItem {
  // We map the internal ReviewOutcome (0-3) to a standard 0-5 scale for the SM-2 formula
  // Again (0) -> 1
  // Hard (1) -> 3
  // Good (2) -> 4
  // Easy (3) -> 5
  
  let q = 1;
  if (outcome === ReviewOutcome.Hard) q = 3;
  if (outcome === ReviewOutcome.Good) q = 4;
  if (outcome === ReviewOutcome.Easy) q = 5;

  let newEaseFactor = item.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3; // SM-2 absolute minimum

  let newInterval = item.interval;
  let newConsecutiveSuccesses = item.consecutiveSuccesses;
  let newConsecutiveFailures = item.consecutiveFailures;

  if (outcome === ReviewOutcome.Again) {
    newConsecutiveSuccesses = 0;
    newConsecutiveFailures += 1;
    newInterval = 1; // Reset to 1 day
  } else {
    newConsecutiveFailures = 0;
    newConsecutiveSuccesses += 1;
    
    if (item.consecutiveSuccesses === 0) {
      newInterval = 1;
    } else if (item.consecutiveSuccesses === 1) {
      newInterval = 3; // Initial successful jump is to 3 days
    } else {
      newInterval = Math.round(item.interval * newEaseFactor);
    }
  }

  // Safety cap on interval (e.g. max 1 year)
  if (newInterval > 365) {
    newInterval = 365;
  }

  const nextReviewDate = now + newInterval * 24 * 60 * 60 * 1000;

  return {
    ...item,
    interval: newInterval,
    easeFactor: newEaseFactor,
    consecutiveSuccesses: newConsecutiveSuccesses,
    consecutiveFailures: newConsecutiveFailures,
    reviewCount: item.reviewCount + 1,
    lastReviewed: now,
    nextReviewDate
  };
}
