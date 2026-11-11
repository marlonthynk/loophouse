# LoopHouse agent guidance

LoopHouse is a small demo for experimenting with Linear Loops. Keep changes focused on the issue and preserve the property-inspection workflow. Read BUILD-PLAN.md, TESTING.md and EXPERIMENT-JOURNAL.md. Use only fictional data. Never overwrite unrelated working-tree changes.

## Plan, then proceed

Before changing implementation, record a short implementation and test plan in `docs/work/<ISSUE-ID>.md` and explain it in the task. Map each acceptance criterion to an observable assertion, list likely files and edge cases, and identify the data and tools needed. Proceed automatically after recording the plan. Do not wait for plan approval unless the issue explicitly requires it.

If a material requirement cannot be resolved from the issue, comments or repository, stop and ask concise, numbered questions in the same task. Do not invent requirements or ask the user to answer things the repository already establishes. Preserve any partial work and the plan. A human answers in the same Linear Codex thread, mentioning @Codex to continue the existing task; do not create a replacement task.

## Verify user behavior

For code changes run `npm run verify`: formatting, Vitest unit tests, TypeScript/production build, Chromium launch preflight and Playwright browser tests. Add a focused behavior test for the issue when appropriate. For bugs, demonstrate the failure before the fix where practical, then show it passing. For UI changes, exercise the actual changed flow, inspect relevant desktop/mobile screenshots and preserve evidence. Screenshots supplement assertions; they do not replace them. Use computer use for additional exploration only when the task actually has that tool.

The browser fixture uses isolated storage on port 4175, a fixed clock and fictional jobs. Never reset or reuse the user's development browser. Test PDFs for relevant contents, not only download existence. Do not weaken tests, skip required browser verification, or treat missing infrastructure as a pass. Fix assertion failures before handoff. Documentation-only changes can use a proportionate check; say why browser verification is not applicable.

Record commands, actual results, limitations and artifact paths in the work note and journal. Read `artifacts/verification.json` after a verification run. The receipt must belong to the current implementation; rerun affected checks after subsequent code or test changes. Reports/screenshots live under `artifacts/` and are not committed. Link only artifacts the task or CI actually exposes; otherwise provide task-relative paths without claiming they are downloadable. GitHub Actions reruns verification after publication and retains the report.

## Final outcome sent back to Linear

Emit exactly one of these markers as the first line of the final reply (never put outcome markers in progress comments):

- `CODEX_IMPLEMENTATION_READY`: implementation complete and required checks passed. Include `Verification: passed`, commands/results, browser scenarios, plan path, artifact paths, limitations and known commit. Documentation-only work must explicitly state `Browser verification: not applicable` and its reason.
- `CODEX_TEST_PENDING`: implementation written, but required verification could not run because a browser, dependency or environment capability is unavailable. Include `Verification: pending`, what was and was not tested, the exact infrastructure blocker and a concrete recovery step. Do not describe it as verified.
- `CODEX_NEEDS_INPUT`: the task needs a human answer. Include `Verification: incomplete`, numbered questions, why they matter, partial work, and `Resume stage: planning|implementation|verification`. Stop until the human replies in this same task.
- `CODEX_IMPLEMENTATION_BLOCKED`: implementation or assertions still fail and cannot be resolved within scope. Include `Verification: failed`, reproduction/check evidence and the remaining work. Do not use the pending-test marker for an observed product failure.

Include the Linear issue ID and real task URL when available. The integration normally appends the task URL; never invent one. Ready goes to Pending PR creation, test-pending to Code completed — Pending test, and questions to Needs input. A local cloud commit or prepared PR description is not a published PR.

Human PR creation remains the publication path: preserve and commit changes in the cloud task if supported, then tell the human to open the task, review the diff and choose Create PR/Create draft PR. Do not attempt credential workarounds or repeated sandbox git pushes. Do not merge, deploy, force-push or push directly to main. Do not mark the issue Done.
