# MAR-22 — controlled workflow pilot plan

## Outcome

Exercise the planning, clarification, unavailable-browser, manual-review and verified-completion handoffs introduced by MAR-21. This is a controlled workflow simulation, not a new product requirement.

## Provisional implementation plan (recorded before implementation)

1. The local reviewer supplied the controlled photo-removal selection through the owner-authenticated thread: upload a fictional image through the actual UI, caption it, wait for the draft to save, remove it, then reload and resume the inspection.
2. Add one focused Playwright regression that asserts the removed photo and caption stay absent while the condition, notes and overall summary remain saved.
3. Use only the isolated Playwright origin, fresh browser context, fixed clock and fictional fixture data; do not change application code unless the regression exposes a genuine defect in this flow.
4. Run `npm run verify` normally. Do not use an artificial missing-browser override or retry package/network configuration. Preserve the receipt and distinguish checks that pass from the browser preflight that cannot run in Cloud.
5. Hand the exact cloud diff and file hashes to a local reviewer to run in a browser-capable worktree. Do not claim that the new browser scenario passed until that exact change is verified.
6. Record commands, results, receipt/report paths and limitations here and in the experiment journal. A ready handoff requires subsequent real verification of the same diff; neither setup failure nor manual-review intent is passing evidence.

## Acceptance criteria and planned assertions

| Criterion | Observable assertion |
| --- | --- |
| The clarification route pauses work | The provisional note existed before implementation, one numbered scenario question was asked, and the local reviewer supplied the controlled selection in the same task |
| Only the chosen regression is added | The focused Playwright change covers photo removal; reset-data coverage remains outside this pilot |
| Photo removal persists | Upload and caption a fictional image through the UI, save, remove it, reload/resume, and assert that its image and caption do not return |
| Other draft answers persist | After the same reload, assert that the selected condition, notes and overall summary retain their saved values |
| Missing browser is classified honestly | The normal Cloud verification exits nonzero with `test_pending`, never `passed`, when Chromium cannot launch |
| Normal verification is evidence-based | Record the actual `npm run verify` outcome; if Chromium remains unavailable, report `CODEX_TEST_PENDING` and require the local reviewer to run the exact cloud diff |
| Ready follows verified completion only | Report readiness only after required checks, including the chosen browser regression, pass against the implementation being handed off |

## Likely files

- `e2e/inspection.spec.ts`
- `docs/work/MAR-22.md`
- `EXPERIMENT-JOURNAL.md`

Application source is not expected to change unless the focused regression exposes a real product defect. Any such defect would be reported rather than silently expanding this controlled pilot.

## Edge cases and test data

- Use only fictional seeded jobs and generated test images.
- Keep the browser fixture isolated on port 4175; do not reuse or reset a development browser.
- For photo removal, distinguish a hidden preview from deletion that survives reload.
- Do not weaken or skip browser assertions because Cloud lacks Chromium runtime support.

## Evidence

- Planning-stage environment evidence: cloud setup exited `1`. The temporary Ubuntu Noble archive/security requests were blocked by the environment proxy, so Playwright runtime dependencies were not installed and no Cloud browser test has run.
- Chosen scenario: remove a photo and verify it stays removed after reload while other draft answers remain.
- Implementation: added one Playwright scenario that uses the actual inspection UI to upload and caption a generated fictional image, waits for save, removes the photo, reloads/resumes, asserts the image and caption remain absent, and confirms the condition, notes and summary remain.
- `npm run verify` result: `test_pending`. Formatting, test TypeScript, five Vitest assertions and the production build passed. Chromium preflight failed to launch because `libatk-1.0.so.0` is unavailable, so the new Playwright scenario did not run and no browser report was produced.
- Receipt: `artifacts/verification.json` (ignored local evidence, not a public URL). Its `browserReport` is `null` because execution stopped at preflight.
- Recovery: a local reviewer must apply this exact cloud diff in a browser-capable worktree, confirm the changed-file SHA-256 hash, run `npm run verify`, and report the result before any ready handoff.


## Local reviewer verification

The local Codex reviewer applied the exact cloud diff in an isolated worktree and confirmed e2e/inspection.spec.ts SHA-256 7d358b07e38cf1e4f15d8c5ec1c465f7589ad8645e0703e50856b9ca5e835a64. npm run verify passed on 11 November 2026 at 15:18:42–15:18:51 UTC: formatting, test TypeScript, five unit assertions, production build, Chromium preflight and all four browser journeys. The photo-removal test passed without source/test edits. Mobile/report screenshots were inspected. Local receipt: artifacts/verification.json (passed); HTML report: artifacts/playwright/report/index.html. These ignored paths are not public download links.

Published exact test on branch codex/mar-22-pilot-review at 0cb9c59fe6a9159703ff4ededca97ebeb97bd1b0. This is separate from the unpublished cloud commit b4506aa0d1887bd607da2e3d15d94640cbb1246b. A matching local run supplied actual browser verification; Cloud's receipt remains test_pending. Codex acknowledged the externally supplied evidence and the completion Loop moved MAR-22 to Pending PR creation. Human PR review remains outstanding.


The revised [GitHub Linux CI](https://github.com/marlonthynk/loophouse/actions/runs/43048486559) also passed the full verification suite on 00086fb66221fe091c96a4d71e7fb60fd3fc14cc, including all four browser journeys (13.5 seconds) and five unit assertions. It publishes verification-report, artifact 13869071261 (expires 25 November). CI installs the pinned Chromium binary and verifies launch rather than downloading redundant extra font packages from a stalled system mirror. The Cloud runtime limitation remains separate.
