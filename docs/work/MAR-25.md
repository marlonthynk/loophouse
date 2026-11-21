# MAR-25 — Enable Playwright verification in the Codex-Linear workflow

## Problem and scope

Replace the temporary manual-only workflow with plan-before-code, real Chromium verification in Linear's own cloud coding environment, native draft PR publication and human review/merge. Base: current main `d15f604131952efd70eb2154e0c5a52bfd879538`, confirmed against origin on 21 November 2026. The starting working tree is clean. Preserve MAR-24/PR #6; no product UI or fixture changes are planned.

Issue: https://linear.app/thynksoftware/issue/MAR-25/enable-playwright-verification-in-the-codex-linear-workflow

Session: https://linear.app/thynksoftware/agent-session/4bdd2883-0917-4ed7-a279-b391424d9ebd

## Implementation and test plan (recorded before implementation)

1. Align AGENTS.md, TESTING.md, LINEAR-HANDOFF.md, README.md and docs/linear-*-instructions.txt with the approved workflow. Preserve dated historical observations; append the new decision/results to EXPERIMENT-JOURNAL.md. Mark older publishing research as historical if needed.
2. Make scripts/cloud-setup.sh resolve its own repository instead of hard-coding the Legacy workspace. Install locked npm dependencies, pinned Playwright Chromium and Linux libraries using the supported Playwright installer. Keep runtime assertions, failure classification and CI enabled.
3. Run browser preflight and full verification. Inspect the current receipt, HTML/JSON report and desktop/mobile screenshots; preserve reports and traces. Fix real failures within scope without suppressing checks.
4. Commit and push only the task branch using native git_push; create a real draft PR with native create_pull_request. Verify PR base/head/draft and inspect actual CI status separately. Post results and actual review/evidence links on MAR-25, preserve Marlon's ownership, then set In Review only after required session verification and publication succeed.

## Acceptance criteria → observable assertions

| Criterion | Observable check |
| --- | --- |
| 1: current workflow instructions agree | Review diff/search current guidance for plan, full verify, focused behavior tests, evidence, native draft publication and human review; no current Legacy/manual-only/Slack routing; dated history remains intact. |
| 2: real browser rollout | Successful locked install, matching Chromium installation, npm run browser:check, all six npm run verify stages, and three existing browser journeys with no skipped tests; inspect artifacts/verification.json and report attachments. |
| 3: repeatable setup and CI | Execute the repository-relative setup script from outside the checkout; confirm lockfile unchanged, existing CI runs verify with Chromium and uploads artifacts, no skip-ci commit directives; inspect the published head's actual CI result without substituting session results. |
| 4: real draft and issue handoff | Native push/PR responses plus GitHub read confirm main base, expected head and draft; MAR-25 receives actual results/evidence/review link and correct state; assignee remains Marlon. |

## Edge cases, data and tools

- Missing browser/Linux libraries/download privileges: preserve exact failure and recovery, report pending verification rather than success. Product/test assertions stay In Progress until fixed.
- Missing publication capability: verified work enters Pending PR creation with blocker; a local commit is insufficient.
- Occupied port 4175 must fail rather than reuse a development server. Only isolated contexts with fixed 12 November 2026 clock and six fictional jobs; never reset user data.
- Existing browser coverage: date/search/status combinations and empty state; required conditions/notes; uploaded photo/caption and reload/resume persistence; completion, populated PDF contents/image and reopened report; 390px controls, saved notes and no overflow.
- Inspect desktop report and mobile dashboard/inspection screenshots. Existing failure-only traces/videos are retained when failures occur; consider a supported trace override for rollout evidence without changing test semantics.
- Tools: git read/commit, npm/Node, supported Playwright installer, Chromium, native GitHub publication/media tools and Linear issue tools. No Slack, external Codex/Legacy configuration, model/billing changes, merge/deploy/main push or MAR-24 writes.

## Actual results and evidence

### Session verification — 21 November 2026

- Before the fix, invoking the setup script from /tmp failed because /workspace/loophouse does not exist. The script now resolves its own checkout.
- The supported default installer reached Linux dependency installation but failed with `su: Authentication failure`; this session has no sudo/root package-install access. Inspection with dpkg-query confirmed installed NSS, ATK/AT-SPI, CUPS, DRM/GBM, X11/XKB and ALSA libraries; ldd on the pinned headless shell found no unresolved libraries. No missing Linux library remained. Added an explicit --browser-only mode for this provisioned-host case; default --with-deps remains intact for hosts requiring libraries. Missing libraries still fail the mandatory render preflight.
- `bash /home/linear/loophouse/scripts/cloud-setup.sh --browser-only` from /tmp: passed. Locked npm install (75 packages; audit found zero vulnerabilities), pinned Playwright 1.65.0 Chromium revision 1254 / Chrome 158.0.8127.18 and rendering preflight succeeded. Lockfile unchanged.
- `bash -n scripts/cloud-setup.sh`: passed. Unknown argument and extra-argument cases each returned usage/exit 2 before installation.
- `npm run browser:check`: passed separately; Chromium launched and rendered.
- `npm run verify`: passed all six stages: format:check, test:typecheck, test (6/6), build, browser:check and test:e2e (3/3; zero skipped/flaky/unexpected). Receipt inspected: started 10:48:47.553Z, finished 10:49:10.721Z. It records base HEAD d15f604131952efd70eb2154e0c5a52bfd879538 plus dirty AGENTS.md, CODEX-PUBLISHING-RESEARCH.md, LINEAR-HANDOFF.md, README.md, TESTING.md, both current workflow prompts, scripts/cloud-setup.sh and the new work note. This is verification of the implementation working tree, not a claim that unmodified main alone was tested.
- `npm run test:e2e -- --trace on`: an additional evidence run passed 3/3 in 17.1s with traces retained for all journeys. The full-verifier browser report was preserved before this run; artifacts/playwright now contains the trace-enabled run. No code or test changes followed verification; subsequent edits only record results.
- Existing scenarios actually exercised: Today/This week, week boundaries, toggle-off, search/status composition and empty results; missing condition/note validation; actual photo upload, note/caption persistence across reload/resume; explicit completion/read-only report; downloaded PDF header/address/note/caption/summary/embedded image; reopened saved report; 390px date controls/form inputs/save state and no horizontal overflow.
- Visual inspection: desktop completed report shows the fictional property, exterior note/photo/caption and all sections plus Download PDF; mobile dashboard shows accessible date/search/status controls and four expected jobs; mobile inspection shows saved Good condition and fictional note, stacked sections and reachable Review report. Uploaded original PNG attachments without resizing.
- `git diff --check`: passed. Confirmed no changes to src/, e2e/, package.json/lockfile, Playwright config or CI. No product regression tests were added because this change alters setup/workflow rather than product behavior; actual setup execution and argument checks cover the changed script. No active pre-commit hook or PR template exists.

### Preserved evidence

- `artifacts/verification.json`: current full-verification receipt.
- `artifacts/full-verify-playwright/report/index.html` and `artifacts/full-verify-playwright/results.json`: archived browser report from the full verifier (3 passed).
- `artifacts/playwright/report/index.html`, `artifacts/playwright/results.json`, and three `artifacts/playwright/results/*/trace.zip` files: additional trace-enabled run (3 passed).
- `artifacts/evidence/completed-report.png`, `mobile-dashboard.png`, `mobile-inspection.png` and `inspection-pdf.pdf`: original decoded full-verifier attachments, inspected. Paths are local task artifacts, not implied download links. The uploaded screenshot links below are accessible evidence; CI separately retains its own verification-report artifact for 14 days.

![completed-report](https://uploads.linear.app/703935c3-6950-4e65-bbfe-4b88dff295f4/fbd30c89-8807-4a81-8d53-bb3caaed93ff/0ac2a669-5a67-4ae5-ba40-0cfd76ecfe0a?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiLzcwMzkzNWMzLTY5NTAtNGU2NS1iYmZlLTRiODhkZmYyOTVmNC9mYmQzMGM4OS04ODA3LTRhODEtOGQ1My1iYjNjYWFlZDkzZmYvMGFjMmE2NjktNWE2Ny00YWU1LWJhNDAtMGNmZDc2ZWNmZTBhIiwiaWF0IjoxNzk1MjU4MTcwLCJleHAiOjE4MjY4Mjg3MzB9.IkgCB679-WTIxy7UWAnF5Hp38FKzRwCANcWk7XU2J_8)

![mobile-dashboard](https://uploads.linear.app/703935c3-6950-4e65-bbfe-4b88dff295f4/5df1e8d5-3342-4438-b5f7-fb7710b86270/68a0b334-2292-4545-81c8-13845464d876?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiLzcwMzkzNWMzLTY5NTAtNGU2NS1iYmZlLTRiODhkZmYyOTVmNC81ZGYxZThkNS0zMzQyLTQ0MzgtYjVmNy1mYjc3MTBiODYyNzAvNjhhMGIzMzQtMjI5Mi00NTQ1LTgxYzgtMTM4NDU0NjRkODc2IiwiaWF0IjoxNzk1MjU4MTcxLCJleHAiOjE4MjY4Mjg3MzF9.UZtmbN88zaVfJ5dBtGZ7HR8lONQgwODyNPkNlGPw8ZA)

![mobile-inspection](https://uploads.linear.app/703935c3-6950-4e65-bbfe-4b88dff295f4/70440c01-438e-4a10-9602-c5c15734aa45/312e75e4-8c1b-4da1-a1ec-44ac930d90c9?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiLzcwMzkzNWMzLTY5NTAtNGU2NS1iYmZlLTRiODhkZmYyOTVmNC83MDQ0MGMwMS00MzhlLTRhMTAtOTYwMi1jNWMxNTczNGFhNDUvMzEyZTc1ZTQtOGMxYi00ZGExLWExZWMtNDRhYzkzMGQ5MGM5IiwiaWF0IjoxNzk1MjU4MTczLCJleHAiOjE4MjY4Mjg3MzN9.ShwPMF3o7wr-kgXK4JKybVNYWUsMPGXjiqb-fBVMnK0)

### Limitations and publication

Chromium desktop and narrow viewport verification does not prove physical camera, Safari/Firefox or every PDF layout/pagination case. Existing non-failing lucide-react directive/large-bundle warnings remain. The pre-existing transient PhotoCard empty-src warning is already captured by the unchanged fixture and report; no warning filter was added or broadened. No product/assertion failure was observed. Live paused Loops were not reconfigured; reference prompts describe the current contract. Workspace, model/billing settings, MAR-24/PR #6 and human ownership were untouched.

Publish this task branch through native tools after committing; final MAR-25 handoff records the independently checked real draft PR/head and actual CI status. Session verification is not CI success or human approval.
