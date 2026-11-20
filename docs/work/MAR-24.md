# MAR-24 — Identify the dashboard as demo data

Issue: https://linear.app/thynksoftware/issue/MAR-24/codex-linear-pilot-identify-the-dashboard-as-demo-data

## Configuration and scope

Before code changes, Marlon verified Settings → Linear Code → Agent configuration: Agent **Codex**, Model **Auto**, inference through **Linear credits**. This is the existing Linear session launched by the Codex-Linear Loop. The underlying model identifier is separate from the agent selection. Marlon remains the human assignee.

Add a static “Demo data” indicator near the dashboard heading. Preserve fictional jobs, stored records, greeting, controls, and inspection behavior.

## Implementation and test plan

1. In `src/main.tsx`, place the indicator beside the workspace label above the existing greeting.
2. In `src/style.css`, style a readable badge and allow the label row to wrap naturally. Avoid absolute positioning and reserve the existing greeting and reset-control layout.
3. Run existing Prettier, test TypeScript, Vitest, and production-build commands. This small static UI change does not require new implementation-mirroring unit tests.
4. Record actual results here and in `EXPERIMENT-JOURNAL.md`. Push the requested branch and create a draft PR linked to MAR-24.

| Acceptance criterion | Observable assertion |
| --- | --- |
| Short readable indicator near the heading | The dashboard visibly displays “Demo data” above the greeting, beside the workspace label. |
| Desktop and narrow visibility | At desktop, 390 px and 320 px widths, and increased text zoom, the indicator remains readable without overlapping the greeting or controls. Check all greeting lengths, especially evening. |
| Existing data and behavior unchanged | Existing unit/type/build checks pass; diff is restricted to dashboard markup/style and work documentation. Human review confirms filters, job navigation, saved fictional inspections and completed reports still work. |

Tools/data: existing npm scripts, Prettier, TypeScript, Vitest and Vite; existing fictional inspection data only. No database resets or fixture changes. Edge cases: narrow width, wrapped labels, evening greeting, text zoom, and returning from an inspection to the dashboard.

The issue explicitly prohibits Chromium and Playwright. Do not run `npm run verify`, `browser:check`, or `test:e2e`, and do not use browser automation to capture evidence. Desktop/mobile screenshots and UI confirmation remain part of pending human review.

## Manual checklist — pending Marlon's execution and confirmation

- [ ] Desktop (1440 × 900): open the dashboard. Expect “Demo data” near the heading, readable alongside the workspace label; greeting and Reset demo remain visible and usable.
- [ ] Narrow screens (390 px and 320 px): check morning, afternoon and evening greetings and 200% text zoom. Expect label wrapping as needed, no indicator overlap/clipping, and accessible existing controls. Capture desktop/mobile screenshots for review.
- [ ] Use search, status, Today and This week filters, then clear them. Expect the same matching fictional jobs, counts and empty state as before.
- [ ] Open/resume an existing fictional inspection, note its saved answers/photos, reload and return to the dashboard. Expect persisted contents unchanged and the indicator visible again. Do not reset demo data.
- [ ] Reopen a completed fictional inspection and download its PDF. Expect the existing report content and download behavior, without the dashboard indicator in the report.

## Evidence

- Implemented the static badge in the dashboard markup with a wrapping label row and the existing purple palette. The diff leaves jobs, storage, inspection logic and reports unchanged.
- `npm run format:check` — passed; all matched files use Prettier formatting.
- `npm run test:typecheck` — passed with no TypeScript errors.
- `npm test` — passed; one file, six tests.
- `npm run build` — passed; TypeScript compilation and Vite build completed (2,280 modules). Existing non-failing large-chunk and `lucide-react` directive warnings remain. npm also reported an unrecognized environment configuration option.
- `git diff --check` — passed.
- Local command logs: `artifacts/mar-24/format.log`, `typecheck.log`, `unit.log`, and `build.log`. These are workspace artifacts, not public download links, and are not committed.
- Chromium, Playwright, `npm run verify`, screenshots, and manual UI checks were not run per the explicit pilot instructions. No aggregate verification receipt or browser artifacts are claimed. Manual UI testing remains pending until Marlon confirms the checklist above.

## Publication guard

Marlon requested that publication must not start browser checks. The repository has one active GitHub Actions workflow (`Checks`), triggered by `push` and `pull_request`; it installs Chromium and runs the aggregate verification command. Publish with `[skip ci]` in the commit message, which GitHub supports for both events: https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs.

Confirm the remote branch/PR head and query GitHub Actions runs and PR check runs after publication. Record the actual GitHub outcome on MAR-24. Skipped required checks may remain pending; they must not be described as passing CI. Do not merge or deploy.
