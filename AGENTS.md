# LoopHouse agent guidance

LoopHouse is a small demo for experimenting with Linear Loops. Keep changes focused on the issue and preserve the property-inspection workflow. Read BUILD-PLAN.md, TESTING.md and EXPERIMENT-JOURNAL.md. Use only fictional data. Never overwrite unrelated working-tree changes.

## Plan, then proceed

Before changing implementation, record a short implementation and test plan in `docs/work/<ISSUE-ID>.md` and explain it in the task. Map each acceptance criterion to an observable assertion, list likely files and edge cases, and identify the data and tools needed. Proceed automatically after recording the plan. Do not wait for plan approval unless the issue explicitly requires it.

If a material requirement cannot be resolved from the issue, comments or repository, stop and ask concise, numbered questions in the same task. Do not invent requirements or ask the user to answer things the repository already establishes. Preserve any partial work and the plan. A human answers in the same Linear Codex thread, mentioning @Codex to continue the existing task; do not create a replacement task.

## Verify user behavior

Run `npm run verify` for code changes: formatting, test TypeScript, unit tests and the production build. Do not run Chromium or Playwright. Record actual commands and results. Create a specific manual test checklist for the changed functionality, including expected results and relevant desktop/mobile, persistence and PDF cases. Use fictional data. A passing automated receipt covers code checks only; it does not prove browser behavior.

Record the plan, results, checklist, limitations and commit in the work note and journal. UI behavior remains pending until the human tests the exact changes and records the outcome. Product failures remain blocked. Never claim a browser test ran when it did not.

## Final outcome sent back to Linear

Emit exactly one of these markers as the first line of the final reply (never put outcome markers in progress comments):

- `CODEX_IMPLEMENTATION_READY`: implementation complete and required checks passed. Include `Verification: passed`, commands/results, manual test results, plan path, artifact paths, limitations and known commit. Documentation-only work must explicitly state `Browser verification: not applicable` and its reason.
- `CODEX_TEST_PENDING`: implementation and automated code checks complete, but human manual testing is pending. Include `Verification: pending`, automated results, a manual testing checklist, task link, and instructions to review changes and create a PR. Do not describe it as verified.
- `CODEX_NEEDS_INPUT`: the task needs a human answer. Include `Verification: incomplete`, numbered questions, why they matter, partial work, and `Resume stage: planning|implementation|verification`. Stop until the human replies in this same task.
- `CODEX_IMPLEMENTATION_BLOCKED`: implementation or assertions still fail and cannot be resolved within scope. Include `Verification: failed`, reproduction/check evidence and the remaining work. Do not use the pending-test marker for an observed product failure.

Include the Linear issue ID and real task URL when available. The integration normally appends the task URL; never invent one. Ready goes to Pending PR creation, test-pending to Code completed — Pending test, and questions to Needs input. A local cloud commit or prepared PR description is not a published PR.

Human PR creation remains the publication path: preserve and commit changes in the cloud task if supported, then tell the human to open the task, review the diff and choose Create PR/Create draft PR. Do not attempt credential workarounds or repeated sandbox git pushes. Do not merge, deploy, force-push or push directly to main. Do not mark the issue Done.
