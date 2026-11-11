# Testing LoopHouse changes

## Local commands

Use Node.js 22 or later:

```sh
npm ci
npm run browser:install
npm run verify
```

`npm run verify` runs format checking, test TypeScript, the Vitest suite, a TypeScript/production build, a Chromium preflight and the Playwright suite. It exits unsuccessfully if any required step fails. `artifacts/verification.json` records the attempted checks and the outcome:

- `passed`: all checks, including the browser suite, completed successfully.
- `test_pending`: Chromium could not launch in the environment; browser behavior is unverified.
- `failed`: formatting, unit, build or browser assertions failed. Investigate and fix; do not turn the test off to obtain a pass.

The receipt records HEAD and dirty files because a passing working tree is not necessarily the same as a later commit. Rerun relevant verification when code/tests change. Do not use an old receipt as evidence for newer work.

Individual commands are `npm test`, `npm run build`, `npm run browser:check` and `npm run test:e2e`. Open the HTML report with `npm run test:report`. Screenshots, the downloaded PDF, traces and retained failure videos are linked inside that report. GitHub Actions uploads the entire `artifacts/` folder after a run, including failures.

## What the baseline browser suite checks

The fixture seeds six fictional appointments in a fresh browser context on `http://127.0.0.1:4175`. Its clock is fixed at 12 November 2026 in Europe/London. It does not access storage on the user's normal port 5173. Playwright owns and stops its Vite test server; an occupied test port fails rather than silently testing a different server.

1. Today and This week filtering, current-Sunday inclusion and previous-Sunday/next-Monday exclusion, toggle-off, address/status composition and empty state.
2. Required answers and issue notes, actual photo upload, caption and note persistence through reload/resume, explicit completion, reopening a completed report, and PDF header/text/caption/embedded image.
3. A 390-pixel viewport: usable date buttons and inspection controls, saved input and no horizontal document overflow. Screenshots are attached for visual inspection.

This is Chromium with a narrow viewport, not proof of physical-phone camera behavior or Safari/Firefox compatibility. PDF assertions cover contents and image inclusion, not all visual pagination/aspect-ratio requirements. Changes to PDF layout need focused layout tests and rendered-page review. Native camera capture and browser-specific issues need additional tests on the relevant device/browser.

## Plan each issue before implementation

Create `docs/work/<ISSUE-ID>.md` with the outcome, implementation steps, acceptance-criterion-to-test mapping, edge cases and evidence section. Announce the plan in the task, then proceed. For a bug, reproduce the actual defect before the fix when practical. For a feature, assert intended observable behavior rather than copying the implementation's decisions into the test. Use accessible roles/labels and explicit expected results. Never change the fixture clock to today's date.

Update the evidence section with commands/results, screenshot/report paths, limitations and outstanding questions. Do not claim a screenshot, browser run or CI check exists unless it ran. An artifact path in a cloud task is not automatically a public download URL; use the supported attachment surface when available and the actual CI report link once published.

## Codex Legacy environment

The setup script is `scripts/cloud-setup.sh`:

```sh
cd /workspace/loophouse
npm ci
npx playwright install --with-deps chromium
npm run browser:check
```

Install browsers and Linux dependencies during setup, which has package-download access. Runtime tasks can test the local application with agent internet off. Run `npm run browser:check` again in the actual task: a setup success alone does not prove the agent phase can launch it. The pinned npm package and browser installation must match. A changed lockfile may require installing the new browser version during environment preparation.

The setup must use a repository revision containing these files. Keep environment setup, AGENTS.md and the dispatch Loop aligned; a prompt cannot install a missing browser while runtime downloads are blocked.

## Handoff rules

See AGENTS.md for exact outcome markers. Code with required passing checks enters Pending PR creation. Finished code awaiting unavailable tests enters Code completed — Pending test. Questions enter Needs input and are sent to the human in Slack with a link to the Linear Codex thread. Fix real failing assertions while In Progress. Reply in the original thread and mention @Codex to continue the same task.

The completion Loop checks the reported outcome/evidence; it is an agent interpreting a report, not an independent deterministic proof. CI reruns the tests after a human creates the PR, and human review remains necessary before merging.


## Observed Legacy cloud limitation — 11 November 2026

The MAR-22 pilot found that this account's Ubuntu Noble image lacked Chromium runtime libraries. APT requests to both the configured snapshot and the standard signed Ubuntu archive/security repositories returned proxy HTTP 403/502. Downloading Chromium alone succeeded, but an actual launch failed with missing libatk-1.0.so.0. Local and GitHub Linux browser checks passing did not prove this particular cloud image worked.

The live Legacy setup now prepares npm packages and the Chromium download, retaining /tmp/loophouse-cloud-setup.log and /tmp/loophouse-cloud-setup.exit. It permits the agent to plan and code after a failed preflight, so failure can be reported. This does not turn failed setup into passing verification: npm run verify still stops at browser:check with test_pending. The environment description explicitly records the blocker. Temporary alternative APT-source experiments were removed; no agent internet, proxy, credential or signature-verification controls were weakened. The generic scripts/cloud-setup.sh remains the full dependency-install recipe for an environment whose package repositories are reachable.

For manual verification, use the installed Codex CLI to inspect the actual task identifier with codex cloud list, read codex cloud diff, and apply the diff in a clean isolated worktree. Compare changed code/test file SHA-256 hashes with the cloud result. Run npm ci and npm run verify in that browser-capable worktree. Record the exact files/commit, commands, report, results and remaining limits back in the original Linear Codex thread. These are local reviewer results, never cloud-browser results. Required behavior stays unverified until that actual run passes; a branch/commit or prepared PR description alone is insufficient.
