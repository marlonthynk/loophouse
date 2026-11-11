# MAR-21 — plan and verification record

## Outcome

Every Codex change starts with a written implementation/test plan, then proceeds without approval unless information is missing. A real browser verifies user behavior. Ready, test-pending, needs-input and implementation-blocked outcomes are distinct and include the same task link.

## Implementation plan (recorded before implementation)

1. Add pinned Playwright Test and Chromium setup; keep Vitest scoped to unit tests.
2. Run an isolated Vite server on port 4175 and fresh browser contexts with fictional IndexedDB fixtures and a fixed London calendar date. Do not touch the user's development browser.
3. Exercise date/search/status filtering, validation, photo/caption persistence across reload, completion, PDF contents, and mobile controls.
4. Add a single verification command, browser preflight, machine-readable receipt and accessible HTML report/screenshots/traces. Missing browsers produce test-pending; assertion failures remain failures.
5. Run the same checks in GitHub Actions and retain artifacts. Put planning/evidence/outcome rules in AGENTS.md and TESTING.md.
6. Add Linear statuses and extend the existing two Loops, including Slack handoffs and replies in the original Codex thread. Prepare the Legacy environment and prove it with a real task.

## Acceptance criteria and tests

| Behavior | Verification |
| --- | --- |
| Today/This week respect calendar dates and compose with search/status | Browser assertions against explicit fixture addresses, including Sunday and next-week boundaries |
| Inspection requires answers and issue notes | Browser sees validation before completing |
| Draft, image and caption survive reload | Fill through the UI, reload, resume, assert values and image |
| Completed report downloads a real PDF | Assert PDF header, report text, notes, caption and embedded image in downloaded bytes |
| Date controls and form work on a narrow screen | Mobile viewport, visible/clickable controls, no horizontal page overflow, screenshot |
| Browser availability is checked honestly | Chromium launch preflight and a deliberately missing-browser run |
| Handoffs reflect actual verification | Exercise ready, test-pending and needs-input signals through the configured Loops |

## Evidence

Local verification on 11 November 2026 passed formatting, test TypeScript, five Vitest assertions, production build, Chromium preflight and three Playwright journeys. Inspected completed-report and mobile-dashboard screenshots: controls fit and remain legible; report includes saved photo/caption/notes. Reports and downloaded PDF are attached inside artifacts/playwright/report/index.html; verification receipt is artifacts/verification.json. These ignored local paths are not public URLs.

A deliberate missing-browser run (PLAYWRIGHT_BROWSERS_PATH=/tmp/loophouse-missing-browser npm run verify) exited nonzero with test_pending after format/type/unit/build passed; it did not run the browser suite. Restored normal configuration and full verification passed. Existing build bundle-size/lucide warnings and React empty image-src console warnings remain baseline limitations. No app source changed.

Created Started statuses Code completed — Pending test and Needs input. Updated existing dispatch and completion Loops; the latter receives new issue comments, with actual Codex-author checks, four outcome routes, same-thread human continuation and deduplicated Slack handoffs. Cloud execution and actual lifecycle pilot remain pending; configuration is not proof of delivery.

Baseline: origin/main 49f9362. The isolated implementation branch is codex/testing-workflow. Human review/merge is retained.


GitHub PR #4 is published: https://github.com/marlonthynk/loophouse/pull/4. Initial Linux CI passed: https://github.com/marlonthynk/loophouse/actions/runs/42997007124. Added stale-report cleanup so a pending/preflight-only run cannot link a previous successful browser report. Controlled pilot MAR-22 is prepared but not delegated pending merge/release onto main.
