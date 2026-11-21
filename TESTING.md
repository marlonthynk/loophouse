# Testing LoopHouse changes

## Local commands

Use Node.js 22 or later:

```sh
npm ci
npx playwright install --with-deps chromium
npm run browser:check
npm run verify
```

`npm run verify` runs format checking, test TypeScript, the Vitest suite, a TypeScript/production build, a Chromium preflight and the Playwright suite. It exits unsuccessfully if any required step fails. `artifacts/verification.json` records the attempted checks and the outcome:

- `passed`: all checks, including the browser suite, completed successfully.
- `test_pending`: Chromium could not launch in the environment; browser behavior is unverified.
- `failed`: formatting, unit, build or browser assertions failed. Investigate and fix; do not turn the test off to obtain a pass.

The receipt records HEAD and dirty files because a passing working tree is not necessarily the same as a later commit. Rerun relevant verification when code/tests change. Do not use an old receipt as evidence for newer work.

Individual commands are `npm test`, `npm run build`, `npm run browser:check` and `npm run test:e2e`. Open the HTML report with `npm run test:report`. Screenshots and the downloaded PDF are attached inside that report. Traces and videos are retained on failure by default; use `npm run test:e2e -- --trace on` to preserve successful rollout traces too. Save that separate run alongside the verification receipt and identify which run each artifact belongs to. GitHub Actions uploads the entire `artifacts/` folder after a run, including failures.

## What the baseline browser suite checks

The fixture seeds six fictional appointments in a fresh browser context on `http://127.0.0.1:4175`. Its clock is fixed at 12 November 2026 in Europe/London. It does not access storage on the user's normal port 5173. Playwright owns and stops its Vite test server; an occupied test port fails rather than silently testing a different server.

1. Today and This week filtering, Sunday/next-week exclusion, toggle-off, address/status composition and empty state.
2. Required answers and issue notes, actual photo upload, caption and note persistence through reload/resume, explicit completion, reopening a completed report, and PDF header/text/caption/embedded image.
3. A 390-pixel viewport: usable date buttons and inspection controls, saved input and no horizontal document overflow. Screenshots are attached for visual inspection.

This is Chromium with a narrow viewport, not proof of physical-phone camera behavior or Safari/Firefox compatibility. PDF assertions cover contents and image inclusion, not all visual pagination/aspect-ratio requirements. Changes to PDF layout need focused layout tests and rendered-page review. Native camera capture and browser-specific issues need additional tests on the relevant device/browser.

## Plan each issue before implementation

Record the outcome, implementation steps, acceptance-criterion-to-test mapping, edge cases and evidence plan on the Linear issue or in its existing agent session before coding, then proceed. For a bug, reproduce the actual defect before the fix when practical. For a feature, assert intended observable behavior rather than copying the implementation's decisions into the test. Use accessible roles/labels and explicit expected results. Never change the fixture clock to today's date.

Record commands/results, screenshot/report paths, limitations and outstanding questions on the issue or in its session. Do not claim a screenshot, browser run or CI check exists unless it ran. An artifact path in a cloud task is not automatically a public download URL; use the supported attachment surface when available and the actual CI report link once published.

## Fresh Linear cloud sessions

Use Linear's own coding environment for this repository, with the already configured Codex agent and Model Auto. No external Codex/Legacy environment is needed. From the checkout run:

```sh
bash scripts/cloud-setup.sh
npm run browser:check
npm run verify
```

The repository-scoped prepare script resolves its checkout from its own location, so it also works when invoked by absolute path from another directory. It runs `npm ci`, `npx playwright install --with-deps chromium` and `npm run browser:check`. Use Node.js 22 or later. The locked `@playwright/test` package (currently 1.65.0) selects the matching Chromium revision; do not substitute a system browser or independently upgrade dependencies. Re-run preparation after relevant lockfile changes.

The supported Playwright installer needs package-download access and Linux package-install privileges (root or working sudo) for missing system libraries. When system libraries are already provisioned and the session has no package-install privileges, use `bash scripts/cloud-setup.sh --browser-only`. This still installs locked npm dependencies and matching Chromium and requires a successful rendering preflight; it does not waive missing libraries. For browser downloads alone, use `npm run browser:install`. If downloads or privilege are unavailable, retain the exact installer/preflight error and arrange the missing capability in this repository's Linear environment, then retry preparation and verification in the same session. Do not change another repository's environment or workspace model/billing settings. Never call unavailable infrastructure a test pass. A setup success alone is insufficient: run preflight and verification in the actual coding session.

For MAR-25 and future testing-workflow rollouts, run the full existing browser suite even for documentation-only changes. For ordinary documentation-only work, a proportionate check may explain why browser verification is not applicable. Code changes require full `npm run verify` and useful issue-specific behavior coverage. Inspect desktop/mobile screenshots and current report/receipt, record actual commands/results and tested HEAD/dirty tree on the issue or in its session, and append relevant experiment observations to the journal. Never replace historical observations with current claims.

## Publication and handoff

After required checks pass, use native `git_push` and `create_pull_request` to publish a real draft PR against main automatically. Include the issue association, actual test evidence and limitations; verify the PR's head and draft flag. Human review and merge are still required. Preserve the assignee and use only the triggering issue/session; send no Slack.

Keep GitHub Actions enabled without skip directives. It already installs matching Chromium/Linux dependencies, runs `npm run verify` and uploads `artifacts/` for 14 days, including failures. Inspect the published head's actual CI status separately; queued/pending is not success, and session success does not prove CI success. Do not wait for CI unless asked to monitor it. Link the real run/report when available.

See AGENTS.md for exact final outcome markers. Verified implementation plus a real draft PR enters In Review. Verified work awaiting unavailable publication enters Pending PR creation with an exact blocker/recovery. Unavailable required test infrastructure enters Code completed — Pending test. Actual assertion/implementation failures remain In Progress; material unanswered questions enter Needs input. The agent posts the handoff and updates the issue itself while the older Loops are paused. Continue from human replies in the same task. Never mark Done, merge or deploy.
