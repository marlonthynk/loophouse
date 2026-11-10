# LoopHouse experiment journal

## Purpose

Learn Linear, especially Loops, by building a small property-inspection application and using it to explore issue-to-pull-request workflows. Marlon intends to write a blog post about the experiment afterwards. This journal records the material for that article as the work happens.

## Current state

- Experiment name: LoopHouse, confirmed by Marlon on 10 November 2026.
- React and TypeScript: confirmed by Marlon on 10 November 2026.
- Screen and storage proposal: see [BUILD-PLAN.md](BUILD-PLAN.md); awaiting approval before implementation.
- Planning is underway; application implementation has not started.
- The connected Linear workspace is Marlon Grech: https://linear.app/thynksoftware.
- The local workspace contains an empty Git repository with no GitHub remote, as checked on 10 November 2026.
- No application, GitHub repository, Linear project or Loop has been created for this experiment.

## Intended application

An inspector sees assigned property-inspection jobs and their addresses, starts an inspection, fills in a short form, adds photographs, and generates a PDF report.

## Proposed approach

The following is the working proposal, rather than a record of completed work or final technical decisions:

1. Build a small working baseline with fictional properties and a demo inspector.
2. Put the application on GitHub and connect it to a dedicated Linear learning project.
3. Complete one bug-fixing workflow manually, from issue through investigation, tests, draft pull request, review, merge and verification.
4. Automate the proven workflow with a narrowly scoped Loop.
5. Test a clear bug, an ambiguous report, and an issue that should not trigger the Loop.
6. Extend the experiment to other workflows once the first Loop is understood.

## Dated log

### 10 November 2026 — Define the experiment

- Marlon described a property-inspection app as the base for learning Linear and Loops.
- The initial proposal focuses on a working baseline, followed by a manual bug-fix walkthrough and then automation.
- Marlon responded positively to the proposal and added that he intends to write a blog post after completing the experiment.
- Marlon requested a Markdown record of the work to support that future article.
- Marlon selected LoopHouse as the experiment name.
- Marlon confirmed React and TypeScript and requested a screen and storage plan to approve before implementation.
- Proposed four screens and IndexedDB storage in BUILD-PLAN.md. Those details remain proposals pending approval.

## Evidence and lessons to collect

- What we expected before each experiment, what happened, and what we learned.
- Decisions and their rationale, including alternatives and changes of direction.
- Links to Linear issues, Loop runs, GitHub commits, pull requests and relevant screenshots.
- Agent instructions and the changes that improved their results.
- Verification results, failed attempts and the human intervention required.
- Time and AI-credit usage when observed; distinguish measurements from estimates.
- Distinguish native Linear automation, coding-agent work and work performed in this chat.
- Record limitations and unresolved questions alongside successful outcomes.

## Possible article question

How far can Linear Loops take a small bug report towards a verified fix, and where does human judgment still matter?

This is a candidate angle to test, not a conclusion.

## Reference documentation

- Linear Loops: https://linear.app/docs/loops
- Linear cloud coding agent: https://linear.app/docs/linear-cloud-coding-agent
- GitHub integration: https://linear.app/docs/github-integration

These describe product capabilities; they are not evidence that we have configured or successfully used them.

### 10 November 2026 — Baseline implementation

- Marlon approved the build plan, React and TypeScript, and requested a purple theme.
- Built the dashboard, job details, inspection form, review and completed-report screens using React, TypeScript and Vite. IndexedDB stores fictional jobs, drafts and optimised photos; jsPDF generates reports in the browser.
- Automated verification: `npm test` passed two inspection-rule tests; `npm run build` passed TypeScript and production bundling. Vite reported a large JavaScript chunk warning.
- Browser walkthrough: six seeded jobs appeared; opened a job, started an inspection, selected all six conditions, reviewed and completed it. The completed report and Download PDF action appeared. Clicked Download PDF; the browser did not expose confirmation of the resulting file in the observed state.
- Remaining verification: actual PDF contents and pagination, photo upload/caption persistence, reload/resume, mobile layout, save failures and reset have not yet been independently verified. Do not treat them as proven.
- No GitHub repository, Linear project or Loop has been created.

### 10 November 2026 — Browser testing and repository preparation

- Marlon requested browser testing and a new public GitHub repository.
- In the browser, address search and Scheduled/Completed filters returned the expected jobs. Required-section validation identified missing conditions.
- Created a test inspection with a generated image, caption and notes. After reload, the draft, condition, notes, image and caption were retained. Completed it and downloaded a PDF; PDFKit text extraction and rendered-page inspection confirmed the notes, image and caption were present and legible on the one-page example.
- Inspected the dashboard and completed report at a 390-pixel-wide viewport. Reset a disposable draft on the separate localhost origin and observed six Scheduled jobs afterward; existing 127.0.0.1 data was not reset.
- A longer multi-page PDF, deliberate storage failure, mobile camera capture and full mobile form interaction remain unverified. The existing two unit tests and production build pass.
