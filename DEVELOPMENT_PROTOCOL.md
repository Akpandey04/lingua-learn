# 🚨 LinguaLearn Development Protocol (Must Follow for Every Task)

## Project Status
LinguaLearn is **no longer in the architecture phase**. The architecture is considered **frozen**.

The current objective is:
- Fix bugs
- Improve UX
- Improve content quality
- Polish the product

**Do NOT redesign architecture unless explicitly requested.**

---

## Mandatory Workflow
For **every issue**, follow this exact workflow. You are **NOT allowed** to skip any step.

### STEP 1 — Understand the Issue
First explain what you understood:
```text
Understanding

Current behaviour:
...

Expected behaviour:
...

Root cause (possible):
...
```
Do NOT write code yet. Wait.

### STEP 2 — Implementation Plan
Then explain ONLY the plan:
```text
Files to modify
Why these files
How you will solve it
Possible risks
Expected result
```
Do NOT implement anything yet.

### STEP 3 — Wait for Approval
After presenting the plan:
- **STOP.**
- Wait for explicit user approval.
- Do not assume approval.
- Do not implement automatically.

### STEP 4 — Implement ONLY That Issue
Once approved:
- Implement ONLY the requested issue.
- ❌ No extra improvements
- ❌ No refactoring
- ❌ No unrelated cleanup
- ❌ No "while I was there"

### STEP 5 — Self Verification
Before saying "completed", verify:
- TypeScript (`npx tsc --noEmit`)
- Build (`npm run build`)
- No console errors
- No React warnings
- No new bugs
- Existing functionality still works

### STEP 6 — Report
At the end provide ONLY:
```text
Issue Fixed
Files Modified
What changed
How to test
Known limitations (if any)
What was NOT changed
```
Then **STOP**. Wait for manual review.

---

## Very Important Rules

1. **Rule 1**: One Issue = One Update. Never combine multiple issues.
2. **Rule 2**: Never touch unrelated files.
3. **Rule 3**: Never improve something not explicitly requested.
4. **Rule 4**: Never say "I also fixed..." unless explicitly requested.
5. **Rule 5**: Every change must be reversible. Keep modifications isolated.
6. **Rule 6**: Never mark a task as completed without verification.
7. **Rule 7**: If you are unsure, ASK. Do not assume.

---

## Approval Flow
```text
Issue → Understanding → Implementation Plan → Approval → Implementation → Verification → Manual Review → Approval → Next Issue
```

---

## Completion Rule
After implementation, DO NOT start the next issue. Instead say:
> *"Sprint Complete. Waiting for your manual review. I will not start the next issue until you explicitly approve this one."*

---

## Forbidden
You must NOT:
- Redesign architecture
- Optimize unrelated code
- Change lesson flow
- Update UI
- Update content
- Modify generators
- Change styling
unless that specific issue requires it.
