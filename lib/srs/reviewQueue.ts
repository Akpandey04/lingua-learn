import { ReviewItem, ReviewLesson } from '@/types/srs';
import { reviewService } from './reviewService';

/**
 * Deterministically generates a ReviewLesson payload from the given due items.
 * For the same input array, this function will ALWAYS return the same lesson structure.
 * No randomization is allowed inside the queue builder to ensure consistent debugging and testing.
 * 
 * @param dueItems Array of ReviewItems due for review.
 * @param limit Maximum number of items to include in a single session (e.g., 10-15).
 * @param languageId The language being studied.
 */
export function buildReviewSession(dueItems: ReviewItem[], limit: number = 10, languageId: string): ReviewLesson | null {
  if (dueItems.length === 0) return null;

  // 1. Deterministic sort: Sort by interval (ascending), then by ID (alphabetical) for stable sorting
  const sortedItems = [...dueItems].sort((a, b) => {
    if (a.interval !== b.interval) return a.interval - b.interval;
    return a.id.localeCompare(b.id);
  });

  const sessionItems = sortedItems.slice(0, limit);
  const itemIds = sessionItems.map(i => i.id);

  // 2. Build the lesson JSON payload
  // We mock a standard curriculum lesson but focus purely on active recall/practice modules.
  
  const activities = sessionItems.map((item, index) => {
    return {
      id: `review-act-${index}`,
      type: 'question' as const, 
      conceptIds: [item.id],
      payload: {
        type: 'translate' as const,
        question: `Translate: ${item.id}`,
        answer: item.id
      }
    };
  });

  const reviewLesson: ReviewLesson = {
    id: `review-${Date.now()}`,
    unitId: 'srs-reviews',
    title: 'Daily Review',
    version: 3,
    learningObjectives: ['Review previously learned concepts.'],
    metadata: {
      source: "review",
      generatedAt: Date.now(),
      reviewItemIds: itemIds
    },
    modules: [
      {
        id: "mod-review-intro",
        type: "knowledge_card",
        version: 3,
        config: {
          title: "Daily Review Session",
          conceptId: "intro",
          content: `You have ${sessionItems.length} concepts to review today.`,
          example: "Let's strengthen your memory!"
        }
      },
      {
        id: "mod-review-practice",
        type: "quiz",
        version: 3,
        config: {
          activities
        }
      }
    ]
  };

  return reviewLesson;
}

export function generateDailyReviewQueue(languageId: string): ReviewLesson | null {
  const due = reviewService.getDueReviews();
  return buildReviewSession(due, 15, languageId);
}
