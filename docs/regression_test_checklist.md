# LinguaLearn Regression Test Checklist

**Version:** Release Candidate (Platform RC1 / Engine v1.0.0 / Content v1.0)
**Date:** ____________
**Tester:** __________

This document outlines the mandatory regression testing required before any new release or major architectural shift is pushed to production. 

---

## 1. Core Learner Flows

### Dashboard (`/[language]`)
- [ ] Language selection loads appropriate content (French, Spanish, German, Japanese).
- [ ] "Current Lesson" card accurately displays the next uncompleted lesson.
- [ ] Streak badge correctly displays current local streak.
- [ ] Learning Path unit numbering and lock/unlock states reflect accurate progress.
- [ ] Clicking a locked lesson does nothing; clicking an unlocked lesson launches it.
- [ ] Toggling Dark Mode smoothly shifts colors and persists across reloads.

### Lesson Engine (`/[language]/[level]/[unit]/[lesson]`)
- [ ] Lesson loads without layout shifts or flashes (via Skeleton loaders).
- [ ] Progress bar increments correctly as activities are completed.
- [ ] `VocabularyModule` displays correct translations and plays audio.
- [ ] `KnowledgeCardModule` renders grammar and syntax notes cleanly.
- [ ] `DialogueModule` correctly sequences dialogue strings and plays audio in sequence.
- [ ] `QuizModule` handles multiple choice selections and immediate correct/wrong validation.
- [ ] Skipping an activity gracefully increments progress without throwing errors.

### Review Center & SRS (`/[language]/review`)
- [ ] Dashboard displays accurate count of "items due today".
- [ ] Empty state "All caught up" prevents entry when no reviews are due.
- [ ] `syncWithProgress` behaves idempotently (multiple lesson completions do not clone SRS items).
- [ ] Review Engine assembles randomized items into a temporary lesson session.
- [ ] Completion of Review updates SM-2 intervals (Easy/Good/Hard) correctly.

### Mistake Notebook (`/[language]/mistakes`)
- [ ] Incorrectly answered activities automatically log to Mistake Notebook.
- [ ] Filtering by "Needs Practice" and "Mastered" successfully isolates entries.
- [ ] Empty state shows beautiful illustration when no mistakes exist.

### Completion & Reset
- [ ] `CelebrationModule` fires on lesson completion.
- [ ] Confetti honors `prefers-reduced-motion` settings.
- [ ] "Course Completed" dashboard state renders appropriately when all lessons are finished.
- [ ] "Restart Any Lesson" functionality resets lesson completion flag without disrupting SRS data.

---

## 2. Browser & Device Validation

### Browser Matrix
- [ ] Chrome (Desktop) - Full support.
- [ ] Firefox (Desktop) - Verify audio fallback / missing Speech API alert.
- [ ] Safari (macOS) - Verify gesture responsiveness.
- [ ] Edge (Desktop) - Full support.

### Mobile Validation
- [ ] Chrome (Android) - Verify tap target sizes and virtual keyboard overlap on `Typing` exercises.
- [ ] Safari (iOS) - Verify touch behaviors and AudioContext unlocking (requires user interaction).

---

## 3. Web Speech API & Media Fallbacks

- [ ] **Speech Synthesis:** When `window.speechSynthesis` has no matching locale voice, it warns gracefully without crashing.
- [ ] **Speech Recognition (Happy Path):** `Speaking` exercise accurately parses spoken phrases.
- [ ] **Speech Recognition (Permission Denied):** Blocks render clean "Microphone access denied" error block.
- [ ] **Speech Recognition (No API):** Unsupported browsers render "Speech recognition is not supported on this browser".
- [ ] **Global Audio:** Success and failure chimes play via `AudioContext`.

---

## 4. Accessibility (a11y) & Performance Audit

### Accessibility
- [ ] Entire learning flow is navigable via `Tab` key alone (Keyboard Only testing).
- [ ] Focus rings (`focus-visible:ring-2`) correctly outline active inputs/buttons.
- [ ] Screen readers announce icon-only buttons (e.g. `aria-label` on Settings, Dark Mode).
- [ ] System-level `prefers-reduced-motion` restricts bounce/pulse animations globally.
- [ ] Color contrast for text passes WCAG AA minimums (specifically on dark mode overlays).

### Performance Audit
- [ ] No blank screen flashes on page route loads (verified `loading.tsx` intercept).
- [ ] Lighthouse Performance score is >= 90 for Dashboard and Lesson routes.
- [ ] Network tab confirms audio and JSON payload loading is deferred or minimized.

---

## Validation Sign-Off

- **Engine Constraints Respected:** [ ] Yes
- **All tests passed:** [ ] Yes
- **Notes / Bugs Found:** ________________________________________

**Status:** [ APPROVED FOR RELEASE ] / [ REJECTED ]
