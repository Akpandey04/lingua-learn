# Spaced Repetition System (SRS) Architecture

LinguaLearn uses an SM-2 inspired SRS to schedule reviews based on learner performance. This document outlines the core design decisions for Phase 6B.

## 1. Why SRS is Isolated
The SRS is built entirely outside of the `LessonEngine`. The `LessonEngine` is responsible purely for executing an immediate learning experience. The SRS is responsible for time-based scheduling across days/weeks. Combining them would bloat the Engine and violate the single responsibility principle.

## 2. Why LessonEngine is Unchanged
The `LessonEngine` remains language-blind and context-blind. It does not know if a lesson is from the curriculum, an AI generator, or the SRS queue. It receives a JSON payload and executes it. This guarantees that Engine v1.0.0 remains frozen and stable.

## 3. Why `ReviewLesson` Exists
Instead of generating a static `lesson.json` file on disk, `ReviewQueue` generates an in-memory `ReviewLesson` object. `ReviewLesson` explicitly extends the standard `Lesson` interface but adds a `metadata` block (`source`, `generatedAt`, `reviewItemIds`). This ensures that if we need to track review-specific metrics later, we have the scaffolding, while keeping runtime reviews entirely separated from static curriculum files.

## 4. Why `reviewScheduler` is Pure
`reviewScheduler.ts` contains a single exported function: `scheduleReview()`. It takes a `ReviewItem` and a score, and returns a new `ReviewItem`. It does not read `localStorage`, it does not emit events. This guarantees 100% mathematical testability and makes it trivial to swap out the SM-2 algorithm in the future (e.g., FSRS).

## 5. Why `reviewService` Owns Persistence
`reviewService.ts` is the Orchestrator. It is the ONLY service that touches `localStorage` (`lingua_learn_srs`). This prevents state fragmentation. Furthermore, its `syncWithProgress()` method is strictly **idempotent**, meaning it can be called infinitely without duplicating review items.

## 6. Algorithm & Intervals
We use a simplified SM-2 scale (`ReviewOutcome` enum: 0=Again, 1=Hard, 2=Good, 3=Easy, mapped to SM-2's 0-5).
- **Again:** Interval drops to 1 day. `consecutiveSuccesses` resets.
- **Good/Easy:** First success = 1 day. Second success = 3 days. Subsequent successes = `Previous Interval * EaseFactor`.
- **Ease Factor:** Starts at 2.5. Drops on Hard/Again, increases on Easy. Minimum 1.3. Max interval capped at 365 days.

## 7. Future Extensibility
The data model uses `type: 'vocabulary' | 'grammar' | 'pronunciation' | 'listening' | 'sentence'`. While Phase 6 focuses heavily on vocabulary review, this ensures that future expansions won't require a painful database migration.
