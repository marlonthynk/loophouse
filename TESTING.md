# Testing LoopHouse changes

Run `npm ci` and `npm run verify`. Verification runs formatting, test TypeScript, unit tests and the production build. `artifacts/verification.json` records these automated code checks; a passing receipt does not mean the application was tested in a browser.

Do not run Chromium or Playwright as part of this workflow. For each UI change, give Marlon an actionable manual checklist with setup, steps, expected results and relevant mobile, persistence and PDF checks. Use fictional inspection data. Record the tested commit and results on the Linear issue. Keep the issue in **Code completed — Pending test** until the human reports a pass. If the human reports a failure, continue the existing Codex task to fix it. After a recorded pass, route to **Pending PR creation**. PR creation and review remain human actions.

For a bug, reproduce it before fixing where practical. Run focused unit tests where suitable. Record the plan, automated checks, manual checklist, limitations and results in the work note and experiment journal. The legacy cloud setup installs npm packages only; it does not install browser dependencies.
