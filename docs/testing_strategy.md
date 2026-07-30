# Testing Strategy

## Overview
The LinguaLearn automated testing architecture leverages **Playwright** to validate user journeys and regressions across all supported platforms. Because the learning engine is entirely client-side, Playwright tests simulate full production builds (`npm run start`), ensuring the output mirrors a live environment accurately.

---

## Test Pyramid

1. **Unit Tests (Future Scope)**: Testing isolated generator or spaced repetition pure functions.
2. **Integration Tests (Future Scope)**: Validating how modules interact with the EventBus.
3. **Playwright Smoke Tests (Current)**: Quick validations proving the application builds and mounts without uncaught exceptions or console errors.
4. **Playwright Regression Tests (Current)**: Validating end-to-end user journeys (Lesson completion, SRS reviews) and UI boundaries (Locked lessons).

*Note: Playwright is exclusively responsible for user journeys and layout validation, not pure unit logic. It treats the application as a black box.*

---

## Folder Architecture

- `tests/smoke/` - Stateless, high-speed baseline checks (`build-health.spec.ts`). Wipes localStorage before tests.
- `tests/regression/` - Stateful, deep-dive user flows (`lesson-flow.spec.ts`, `review-srs.spec.ts`). Relies on seeded state helpers.
- `tests/fixtures/` - Placeholder for mock payloads (curriculum JSON) if API mocking is introduced in Phase 7.
- `tests/helpers/` - Reusable functions to construct deterministic environments (e.g. `seedFreshUser`, `seedCompletedLesson`, `seedReviewDue`). Avoids global `localStorage` clearing in stateful tests.
- `tests/data/` - Static test assets.

---

## Browser Coverage (Device Profiles)
Our tests run against three predefined device profiles in Playwright:
1. **Desktop Chrome** (Chromium Desktop)
2. **iPhone 15** (WebKit Mobile via Playwright Device Profile)
3. **Pixel 8** (Chromium Mobile via Playwright Device Profile)

This provides coverage across both iOS and Android viewports.

---

## Execution Guide

### Running Locally
To test the production build (recommended for RC validation):
```bash
npx playwright test
```
*Note: Our `playwright.config.ts` automatically runs `npm run build && npm run start` to spin up the webServer.*

### Generating Reports
```bash
npx playwright show-report
```

---

## Release Candidate (RC) Exit Criteria

A Release Candidate (e.g. RC1) passes and is approved for the next phase (or beta) ONLY when:
- ✅ **Build passes**: `npm run build` succeeds without warning.
- ✅ **TypeScript passes**: 0 strict mode errors.
- ✅ **Smoke tests 100%**: Zero console errors or unhandled rejections upon mounting routes.
- ✅ **Regression tests 100%**: All E2E journeys execute successfully on all tested profiles.
- ✅ **No Critical/High bugs**: Zero known blocking bugs.
- ✅ **Accessibility passes**: Playwright `a11y` constraints (e.g., focus visibility, ARIA attributes) remain intact.
