# LoopHouse agent guidance

LoopHouse is a small demo for experimenting with Linear Loops. Keep changes focused on the issue and preserve the property-inspection workflow. Read BUILD-PLAN.md, TESTING.md and EXPERIMENT-JOURNAL.md. Use only fictional data. Never overwrite unrelated working-tree changes.

## Current execution and publication policy — MAR-25

Use Linear's own cloud coding environment for marlonthynk/loophouse, based on current main. Workspace Linear Code is configured Agent Codex, Model Auto; accept that configuration without model probing. Do not route work through an external Codex integration or a Legacy environment. This policy supersedes older manual-only, no-browser and human-only PR instructions. Keep all issue writes and handoffs on the triggering issue, preserve its human assignee and existing session, and send no Slack messages. Do not change other repositories, workspace billing or model settings.

Prepare fresh Linux sessions with `bash scripts/cloud-setup.sh`: locked npm dependencies, matching pinned Playwright Chromium, required Linux libraries and a real launch preflight. When Linux libraries are already provisioned without package-install privileges, use `bash scripts/cloud-setup.sh --browser-only`; the launch preflight still must pass. See TESTING.md for prerequisites and recovery.

## Investigate before implementing

Check the issue's claims against current main before planning changes: inspect relevant code and tests, and run the app or targeted tests where practical using isolated fictional data. For each requested behavior distinguish fully present, partly present, absent and inconclusive; source code alone does not prove user-visible behavior. Record what was checked and the evidence on the issue.

If the request is fully satisfied, make no code changes or PR. Comment on the issue with where to find the feature, steps to use it, evidence and limitations; leave it In Progress for human review, not Done. Mention discoverability concerns as observations. If partly present, explain the gap and implement only what is missing. If inconclusive, explain the uncertainty and ask a focused question before assuming.

## Plan, then proceed

Before changing implementation, record a short implementation and test plan on the Linear issue or in its existing agent session before editing. Map each acceptance criterion to an observable assertion, list likely files and edge cases, and identify the data and tools needed. Proceed automatically after recording the plan. Do not wait for plan approval unless the issue explicitly requires it.

If a material requirement cannot be resolved from the issue, comments or repository, stop and ask concise, numbered questions in the same task. Do not invent requirements or ask the user to answer things the repository already establishes. Preserve any partial work and the plan. A human answers in the same Linear Codex thread, mentioning @Codex to continue the existing task; do not create a replacement task.

## Verify user behavior

For code changes run `npm run verify`: formatting, test TypeScript, Vitest unit tests, TypeScript/production build, Chromium launch preflight and Playwright browser tests. Add a focused behavior test for the issue when appropriate. For bugs, demonstrate the failure before the fix where practical, then show it passing. For UI changes, exercise the actual changed flow, inspect relevant desktop/mobile screenshots and preserve evidence. Screenshots supplement assertions; they do not replace them. Use computer use for additional exploration only when the task actually has that tool.

The browser fixture uses isolated storage on port 4175, a fixed clock and fictional jobs. Never reset or reuse the user's development browser. Test PDFs for relevant contents, not only download existence. Do not weaken tests, skip required browser verification, or treat missing infrastructure as a pass. Fix assertion failures before handoff. Documentation-only changes can use a proportionate check with an explicit reason, except testing-workflow rollouts such as MAR-25, which must run the full existing browser journeys even when only documentation changes.

Record commands, actual results, limitations and artifact paths on the issue or in its session and, when relevant to the experiment, in the journal. Read `artifacts/verification.json` after a verification run. The receipt must belong to the current implementation; rerun affected checks after subsequent code or test changes. Reports/screenshots live under `artifacts/` and are not committed. Link only artifacts the task or CI actually exposes; otherwise provide task-relative paths without claiming they are downloadable. GitHub Actions reruns verification after publication and retains the report.

## Final outcome sent back to Linear

Emit exactly one of these markers as the first line of the final reply (never put outcome markers in progress comments):

- `CODEX_ALREADY_EXISTS`: the requested behavior is fully verified as present. Include where to find it, how to use it, evidence, checks and limitations; keep In Progress for human review and do not create a PR.
- `CODEX_IMPLEMENTATION_READY`: implementation complete and required checks passed. Include `Verification: passed`, commands/results, browser scenarios, plan location, artifact paths, limitations and known commit. Only eligible documentation-only work that did not require browsers may state `Browser verification: not applicable`, with its reason. Workflow rollouts must report actual browser results.
- `CODEX_TEST_PENDING`: implementation written, but required verification could not run because a browser, dependency or environment capability is unavailable. Include `Verification: pending`, what was and was not tested, the exact infrastructure blocker and a concrete recovery step. Do not describe it as verified.
- `CODEX_NEEDS_INPUT`: the task needs a human answer. Include `Verification: incomplete`, numbered questions, why they matter, partial work, and `Resume stage: planning|implementation|verification`. Stop until the human replies in this same task.
- `CODEX_IMPLEMENTATION_BLOCKED`: implementation or assertions still fail and cannot be resolved within scope. Include `Verification: failed`, reproduction/check evidence and the remaining work. Do not use the pending-test marker for an observed product failure.

Include the Linear issue ID and real task URL when available; never invent one. When changes are needed and required verification passes, commit on the task branch, push using native `git_push`, then automatically create a real draft PR against main using `create_pull_request` with `draft: true` (or update the existing task PR). Link the triggering issue; a branch containing its identifier already provides the automatic association. Check for a PR template first. Verify the actual remote PR, draft flag, base and head; a local commit or prepared description is insufficient. Preserve human edits/media when updating an existing PR description.

Keep CI enabled without skip directives or browser suppression. Inspect and report its actual status separately from session checks: queued/pending is not passed. Do not wait for CI completion unless explicitly asked to monitor it. Human review and merge remain required regardless of passing tests.

The agent must post the final handoff and update the triggering issue itself while the older Loops are paused: verified work plus a published draft PR goes to In Review; verified work with unavailable publication goes to Pending PR creation with the exact blocker/recovery; unavailable required test infrastructure goes to Code completed — Pending test; material questions go to Needs input; unresolved implementation/assertion failures stay In Progress. Include actual results, plan, tested revision/working tree, review link and accessible evidence (or honest task-relative paths), limitations and the real session link. Preserve the human assignee. Do not mark Done, merge, deploy, force-push or push directly to main.
