# MAR-23 — Time-appropriate dashboard greeting

## Scope

Replace the dashboard's fixed “Good morning” title with a greeting derived from the user's current local time. Keep the inspector name, decorative mark, dashboard copy, inspection workflow, storage, and PDF behavior unchanged.

## Acceptance criteria

1. Before 12:00 local time, the dashboard title says “Good morning, Alex”.
2. From 12:00 through 17:59 local time, the dashboard title says “Good afternoon, Alex”.
3. From 18:00 through 23:59 local time, the dashboard title says “Good evening, Alex”.
4. The greeting uses the browser's local hour and does not affect persisted inspections or generated PDFs.

## Implementation plan

1. Add a small pure greeting helper to `src/model.ts` so the time boundaries can be checked without a browser.
2. Render the helper's result in the dashboard heading in `src/main.tsx`.
3. Add focused Vitest coverage for morning, noon/afternoon, and evening boundaries in `src/model.test.ts`.
4. Record automated results and manual-testing limitations here and in `EXPERIMENT-JOURNAL.md`.

## Acceptance criteria to checks

| Criterion | Observable assertion |
| --- | --- |
| Morning | Unit test expects `Good morning` at 00:00 and 11:59 local time. |
| Afternoon | Unit test expects `Good afternoon` at 12:00 and 17:59 local time. |
| Evening | Unit test expects `Good evening` at 18:00 and 23:59 local time. |
| No unrelated behavior change | Existing unit suite, type check, format check, and production build pass; human checks dashboard and a persisted fictional inspection. |

## Edge cases and tools

- Boundary hours are 12:00 and 18:00 in the user's local timezone.
- A supplied `Date` makes the helper deterministic in unit tests; normal rendering uses the current browser time.
- Tools: Vitest, TypeScript, Prettier, and Vite. Per the issue contract, Chromium, Playwright, and `npm run verify` will not be run.
- Test data is fictional and uses inspector Alex Morgan.

## Manual test checklist (pending human execution)

- [ ] Before noon, open the dashboard and confirm the title is “Good morning, Alex”.
- [ ] From noon through 17:59, open or reload the dashboard and confirm the title is “Good afternoon, Alex”.
- [ ] At or after 18:00, open or reload the dashboard and confirm the title is “Good evening, Alex”.
- [ ] At a narrow mobile viewport, confirm the full greeting remains readable without horizontal overflow.
- [ ] Start or resume a fictional inspection, reload the app, and confirm its saved answers remain present while the greeting matches the current time.
- [ ] Reopen a completed fictional inspection and download its PDF; confirm the report remains unchanged and does not include the dashboard greeting.

## Evidence

- `npm run format:check` — passed; all matched files use Prettier formatting.
- `npm run test:typecheck` — passed with no TypeScript errors.
- `npm test` — passed; one test file and six tests, including the greeting boundary cases.
- `npm run build` — passed; Vite built 2,280 modules. It retained non-failing warnings about a chunk larger than 500 kB and `use client` directives in `lucide-react`.
- Chromium, Playwright, `npm run verify`, screenshots, and manual UI checks were not run, as required by the issue's manual-testing decision.
- Human UI verification remains pending. The checklist above records expected results; none of its boxes represent an executed check.
