# LoopHouse

A small property inspection application for exploring Linear Loops. Built with React, TypeScript, IndexedDB and client-side PDF generation.

## Run locally

Install Node.js 22 or later, then:

```sh
npm ci
npm run dev
```

Open the address printed by Vite. Use the fictional jobs to start an inspection, add observations and photos, and complete and download a report. Changes are stored in this browser and origin. Reset demo clears all inspections and photos.

## Checks

Use the full verification workflow for code changes:

```sh
bash scripts/cloud-setup.sh
npm run browser:check
npm run verify
npm run test:report
```

Preparation installs locked dependencies, matching Playwright Chromium and required Linux libraries. It requires package-download access and Linux package-install privileges; use `bash scripts/cloud-setup.sh --browser-only` when system libraries are already provisioned (the rendering preflight still must pass). Verification runs formatting, test TypeScript, unit tests, production build, Chromium preflight and real Playwright journeys. Run `npm run format` to format source and configuration files.

See [TESTING.md](TESTING.md) for isolated fictional fixtures, reports, fresh Linear session setup and failure recovery. Browser tests use port 4175 and do not reset your development browser's data. Missing infrastructure is pending verification, never a pass.

For Linear issues, record the implementation and test plan on the issue or in its existing agent session before implementation, map acceptance criteria to observable checks, then proceed automatically. Add useful issue-specific behavior tests, exercise changed flows and inspect desktop/mobile screenshot evidence. Testing-workflow rollouts run browser journeys even for documentation changes. Record actual receipt/report paths, results and limitations.

Work runs in Linear's own cloud coding environment with the configured Codex agent and Model Auto. After verification the agent pushes the task branch and automatically publishes a real draft PR, then posts the handoff and sets the triggering issue In Review. CI runs independently; pending CI is not a pass. Humans review and merge. Preserve the human assignee and original session; no Slack notifications, automatic merge or deployment. See [LINEAR-HANDOFF.md](LINEAR-HANDOFF.md) for current statuses and publication-blocker handling.

Data is local to the browser, can be cleared or evicted, and does not sync across devices. Use fictional data. The safety section is a demo, not a regulatory assessment.

See [BUILD-PLAN.md](BUILD-PLAN.md) for the scope and [EXPERIMENT-JOURNAL.md](EXPERIMENT-JOURNAL.md) for the learning record.
