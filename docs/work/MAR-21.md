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


## Cloud rollout — 11 November, after approval

Marlon approved merging PR #4 and running the cloud pilot. Merged at 18536ec5fcc595f69d026cd516cecdb7d612bd1d. Original checkout was safely advanced to main after confirming its source edits were already upstream and journal text preserved; its previous state remains in stash `LoopHouse pre-testing-rollout original workspace (preserved)`. Full verification passed there: five units, three Chromium journeys.

MAR-22 started in loophouse-linear, task task_e_6af47ec51718832e8ac8e79ed1aadbea, but returned only “Codex couldn't complete this task” with zero changed files. The CLI confirms error, not ready. Completion Loop requested a structured diagnostic report and kept In Progress. No question/pending/ready handoff has passed yet. Investigating startup by retaining setup stdout/exit status for the agent instead of losing all diagnostics when setup exits.


The diagnostic retry returned a real blocked result: APT index refresh from snapshot.ubuntu.com failed through the proxy (HTTP 403/502); Playwright dependency installation exited 100. Setup exit receipt was 1. Completion kept In Progress and recorded/sent the blocked Slack handoff. Next experiment: install Chromium without forcing an APT refresh, then actually launch it to determine whether universal already has its needed libraries. Do not assume missing packages from APT's unavailable index.


Browser-only setup confirmed a real missing `libatk-1.0.so.0`. A temporary signed standard-Ubuntu APT configuration also failed through the proxy (Ubuntu Noble archive 403/security 502), so the blocker is unresolved. Stopped mirror retries. Pilot now exercises the intended unavailable-browser path: plan/question despite infrastructure failure, implement regression, emit test-pending, then local reviewer verifies the exact cloud diff. Any later ready evidence must clearly distinguish local/CI results from unperformed cloud browser tests.


Observed pilot routes: Needs input (question + Slack independently verified), owner reply → In Progress in the same task, Code completed — Pending test (actual unavailable runtime + Slack independently verified), then exact-hash local verification → Pending PR creation. Actual local result is five units and four browser journeys passing. The initial Cloud Chromium-launch acceptance remains unmet due package-proxy/runtime-library availability; do not close this as a fully automatic Cloud browser rollout. Added structured handling for unmarked platform failures and consolidated outcome receipts.

A separate GitHub run stalled at extra font downloads despite required runtime libraries being present. CI now installs Chromium without forcing the redundant system-package refresh and has a ten-minute bound; its actual result is pending. No application source changed.


Final recorded CI evidence: [Linux run](https://github.com/marlonthynk/loophouse/actions/runs/43048486559) passed against 00086fb66221fe091c96a4d71e7fb60fd3fc14cc, with five units/four browser journeys. The previous stalled run was canceled, not counted as passed. All three custom outcome DMs (question, pending test, ready) were independently found in Marlon's Slack DM. MAR-22 is Pending PR creation; MAR-21 stays Code completed — Pending test for the unresolved actual Cloud browser-launch acceptance. A documentation-only follow-up records these outcomes; application/test code remains unchanged.
