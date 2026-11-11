# MAR-22 — controlled workflow pilot plan

## Outcome

Exercise the planning, clarification, unavailable-browser, manual-review and verified-completion handoffs introduced by MAR-21. This is a controlled workflow simulation, not a new product requirement.

## Provisional implementation plan (recorded before implementation)

1. The human selected photo removal: upload a fictional image through the actual UI, caption it, wait for the draft to save, remove it, then reload and resume the inspection.
2. Add one focused Playwright regression that asserts the removed photo and caption stay absent while the condition, notes and overall summary remain saved.
3. Use only the isolated Playwright origin, fresh browser context, fixed clock and fictional fixture data; do not change application code unless the regression exposes a genuine defect in this flow.
4. Run `npm run verify` normally. Do not use an artificial missing-browser override or retry package/network configuration. Preserve the receipt and distinguish checks that pass from the browser preflight that cannot run in Cloud.
5. Hand the exact cloud diff and file hashes to a local reviewer to run in a browser-capable worktree. Do not claim that the new browser scenario passed until that exact change is verified.
6. Record commands, results, receipt/report paths and limitations here and in the experiment journal. A ready handoff requires subsequent real verification of the same diff; neither setup failure nor manual-review intent is passing evidence.

## Acceptance criteria and planned assertions

| Criterion | Observable assertion |
| --- | --- |
| The clarification route pauses work | The provisional note existed before implementation, one numbered scenario question was asked, and the human selected photo removal in the same task |
| Only the chosen regression is added | The focused Playwright change covers photo removal; reset-data coverage remains outside this pilot |
| Photo removal persists | Upload and caption a fictional image through the UI, save, remove it, reload/resume, and assert that its image and caption do not return |
| Other draft answers persist | After the same reload, assert that the selected condition, notes and overall summary retain their saved values |
| Missing browser is classified honestly | The normal Cloud verification exits nonzero with `test_pending`, never `passed`, when Chromium cannot launch |
| Normal verification is evidence-based | Record the actual `npm run verify` outcome; if Chromium remains unavailable, report `CODEX_TEST_PENDING` and require the local reviewer to run the exact cloud diff |
| Ready follows verified completion only | Report readiness only after required checks, including the chosen browser regression, pass against the implementation being handed off |

## Likely files

- `tests/e2e/inspection.spec.ts` or the closest existing Playwright journey for the chosen behavior
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
