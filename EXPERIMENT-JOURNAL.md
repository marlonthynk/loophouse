# LoopHouse experiment journal

## Purpose

Learn Linear, especially Loops, by building a small property-inspection application and using it to explore issue-to-pull-request workflows. Marlon intends to write a blog post about the experiment afterwards. This journal records the material for that article as the work happens.

## Current state

- LoopHouse is a React and TypeScript property inspection demo with browser-local IndexedDB storage and a purple theme.
- The baseline is built and published in the [public GitHub repository](https://github.com/marlonthynk/loophouse).
- The [LoopHouse Linear project](https://linear.app/thynksoftware/project/loophouse-1cc76ffdc9a2) is In Progress in the Marlon Grech team. Eight retrospective feature stories are Done; [MAR-13](https://linear.app/thynksoftware/issue/MAR-13/complete-remaining-baseline-checks) tracks outstanding verification.
- The [LoopHouse bug delegation Loop](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/overview) is enabled. Codex is connected to Linear and has successfully read the repository in the Legacy Codex Cloud environment `loophouse-linear`.

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
- Created the public GitHub repository https://github.com/marlonthynk/loophouse and pushed the initial baseline. GitHub Actions was configured to run tests and the production build on each push and pull request.

### 10 November 2026 — Linear project setup

- Marlon approved a LoopHouse project with simulated, retrospective user stories for the existing baseline.
- Created [LoopHouse](https://linear.app/thynksoftware/project/loophouse-1cc76ffdc9a2) in the Marlon Grech team and linked the GitHub repository and journal.
- Created eight completed Feature stories, MAR-5 through MAR-12, explicitly marked as retrospective. Created [MAR-13](https://linear.app/thynksoftware/issue/MAR-13/complete-remaining-baseline-checks) as a Todo task for the outstanding checks.
- The project is In Progress for the broader experiment. No Loop or team setting was changed.

### 10 November 2026 — First Loop draft

- Marlon asked to begin experimenting with Linear Loops.
- Opened Linear's Autofix bugs template as an unpublished draft named LoopHouse bug investigation in the Marlon Grech team. The draft currently triggers when an issue is created with Project = LoopHouse and the Bug label; team access is limited to Marlon Grech, changes outside the triggering issue are off, and draft code access is set to Read & write.
- Triage was not enabled; Linear's template suggested enabling it, but the current draft uses issue creation. The Loop has not been created or tested, and the GitHub integration and coding-agent prerequisites remain to be verified.
- Candidate for a first real bug investigation: the PDF code currently places photos into a fixed 80-by-55 rectangle, which appears likely to distort images of other aspect ratios. This is a code-based observation, not yet a separately reproduced bug report.

### 10 November 2026 — Codex cloud environment

- Marlon requested help creating a Codex cloud environment. The previous settings URL redirected to the current ChatGPT web interface, so setup continued through Codex mode → Select environment → Create environment.
- Used the existing GitHub connection as marlonthynk and selected marlonthynk/loophouse. Created and published the private environment named loophouse; the UI confirmed publication and loaded a fresh draft based on that published version.
- The setup agent reported dependencies installed, two tests passing, production build passing with bundler warnings, and the development server serving the app. Its browser smoke test timed out. These are setup-agent reports, not independent full application verification.
- The agent could not save its reusable configuration through its integration (INVALID_ARGUMENT). Saved the install script and start instructions through the settings UI instead, then published successfully.
- Install script runs npm ci --cache /workspace/.npm from /workspace/loophouse. Start instructions cover AGENTS.md, Node.js 22+, npm test, npm run build, and the Vite development server. No secrets or environment variables were added. Package-manager networking is enabled; unrestricted public internet access is off.
- The newer environment's compatibility with the separate Codex-for-Linear integration remains unverified. The Linear Loop draft was not published.

### 10 November 2026 — Fresh Loop and Codex connection

- Marlon discarded the earlier Loop draft and requested a fresh setup. He approved and completed the Codex connection to Linear himself.
- [MAR-14](https://linear.app/thynksoftware/issue/MAR-14/verify-codex-can-use-the-loophouse-cloud-environment) initially failed with “the workspace has no available environments”, despite the newer `loophouse` environment existing. The current official environment documentation distinguishes Legacy environments for Linear integration from the newer environment system: https://learn.chatgpt.com/docs/environments/cloud-environments.
- Created the Legacy environment [`loophouse-linear`](https://chatgpt.com/settings/cloud-environments/6af320a7da508191903b86e02185273f) for `marlonthynk/loophouse`, with setup commands `npm ci`, `npm test`, and `npm run build`. No secrets were added; agent internet access is off.
- Retried MAR-14 through an explicit Codex mention. The [Codex task](https://chatgpt.com/s/cd_6af321053000819185cc7e35a3ac83ae) completed and reported that AGENTS.md and package.json were readable in `/workspace/loophouse`, on a provisioned `work` branch. It reported no configured Git remote, so repository identity could not be independently checked from remote metadata. It made no code changes and did not run tests or builds; it confirmed the available commands. Marked MAR-14 Done after reading that result.
- Created and enabled **LoopHouse — delegate bugs to Codex**. It triggers when an issue is created in the Marlon Grech team with Project = LoopHouse and label = Bug. It asks for missing reproduction details; clear reports are handed to the installed Codex agent with explicit `loophouse-linear` routing, repository guidance, test/build commands, and human review. Linear code access is disabled; changes outside the triggering issue are off; merge and deployment are not authorised by the instructions.
- Automatic smoke test [MAR-15](https://linear.app/thynksoftware/issue/MAR-15/loop-smoke-test-pdf-photos-look-wrong) passed: the Loop ran for 11 seconds and posted one clarification comment requesting observed behavior, expected behavior, and reproduction details. The issue remained undelegated. [Run evidence](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/run/d6f6e26f-9d5f-4df8-8821-af4d018896ff).
- Created [MAR-16](https://linear.app/thynksoftware/issue/MAR-16/preserve-photo-aspect-ratios-in-inspection-pdf-reports) to test a clear report: source inspection shows all PDF photos placed in a fixed 80-by-55 rectangle. The report explicitly asks Codex to confirm the defect before fixing it. The first automatic run stopped because no human assignee was set. Assigned Marlon as human owner and reran the Loop. The 23-second retry appended routing context, delegated to Codex, posted a handoff comment, and started a task in `loophouse-linear`, as confirmed in the visible agent activity. This verifies the handoff; the code fix, tests and review remain pending. [Retry run](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/run/f672cca5-7178-4850-9e42-27877e860919).
- Operational lesson at this stage: create new Bug issues with the LoopHouse project, clear reproduction details, and a human assignee. The creator-assignment rule added later below removes the need to set that owner manually for eligible human creators. Because the trigger is issue creation, correcting an existing issue requires a manual Run now retry.
- These journal additions remain local until committed and pushed. No local application code was changed during connection setup.

### 10 November 2026 — Source readability cleanup

- Marlon observed that the source looked minified. Inspection confirmed the authored code was densely compressed: the main React file had 19 lines, the stylesheet had two, and PDF generation had three. These were source files, rather than just generated production bundles.
- Reformatted TypeScript, TSX, CSS, HTML and JSON with Prettier, without refactoring application logic. Added a pinned development dependency, shared formatting settings, `npm run format` and `npm run format:check`, plus a formatting check in GitHub Actions and usage instructions in the README. Generated files and Markdown are excluded from formatting.
- Verification: Prettier's debug check passed before formatting; the formatting check, both existing inspection-rule tests, TypeScript compilation and the production build passed afterward. The build reported a large JavaScript chunk and warnings about `use client` directives in lucide-react dependencies. No new browser walkthrough was performed for this formatting-only change.
- The cleanup is local; it has not been committed or pushed. The separate PDF aspect-ratio investigation remains outside this change.
- Follow-up: Marlon asked for clearer indentation in `model.ts`. Expanded the remaining compact object types, separated declarations with blank lines, and added braces around validation branches. Formatting checks, both tests and the production build passed again; the same build warnings remain.
- Applied the same readability cleanup to storage, PDF generation, tests and the React entry point: separated functions, expanded control-flow blocks and object declarations, and gave each React state variable its own declaration. The Vite type-reference file needs no expansion. Formatting checks, both tests and the production build passed; the production asset hashes remained unchanged. Changes remain local.

### 10 November 2026 — Default missing ownership to the issue creator

- Marlon requested that an issue with no owner be automatically assigned to its creator. Updated and saved the existing Loop's instructions to read the actual Created by metadata, preserve any existing human assignee, assign an unowned issue to its eligible human creator, and confirm the assignment before Codex delegation. If the creator is an agent, integration, inactive, or unassignable, the Loop must explain the problem and stop instead of selecting another owner.
- Preserved the current trigger, scope, routing and other instructions. The current trigger has Project = LoopHouse and Labels include all of Bug and Improvement; both labels were therefore used on the disposable test. The instructions say Bug or Improvement. This filter/instruction mismatch was observed but not changed as part of the ownership request.
- Created [MAR-18](https://linear.app/thynksoftware/issue/MAR-18/ownership-smoke-test-assign-an-unowned-issue-to-its-creator) with no assignee and intentionally incomplete bug details. The automatic [19-second run](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/run/348e2ddd-6641-4066-8afb-7ec107333dce) assigned it to Marlon. Connector verification confirmed that createdById and assigneeId match. It posted one clarification comment and left delegate empty. Marked the disposable test Done.
- Verified automatic creator assignment for an unowned issue. Preservation of another existing owner and the unassignable-creator branch are specified in the instructions but were not independently tested. No application code was changed and no code tests were rerun for this configuration-only change. Journal update remains local.

### 10 November 2026 — Require publication and a draft pull request

- Marlon requested that coding work must be pushed to GitHub and end with a pull request, rather than remaining only in a cloud workspace. Reviewed the existing Loop and saved explicit publication requirements inside the routing text that must be passed to Codex before delegation.
- For code or documentation changes, Codex must commit on a task-specific `codex/` branch, push that branch, create a draft PR against `main` (or update the task's existing PR), verify the remote branch and actual PR, and post the real PR URL with summary and test results on the originating Linear issue. A local commit, prepared PR title/body, or cloud task link alone does not satisfy completion. No merge, deployment, direct push to main or force push is authorised.
- Preserved exceptions for no-change investigations and blocked publication: do not create empty PRs, and explicitly report missing publishing capability, permissions, remote or network access together with the cloud task link, known branch/commit details, unpublished work and recovery step. Instructions cannot grant tools or credentials absent from the environment. Official documentation describes a completed Codex task link from which a user can create a PR: https://learn.chatgpt.com/docs/third-party/linear.
- Added a check for a real PR URL when the Codex result is available. Missing publication requires a follow-up in the existing Codex thread or an explicit blocker; a task summary alone must not move an issue to Done. Retained human review. Clarified that improvements/new functionality need intended behavior and acceptance criteria rather than reproduction of a nonexistent feature. Preserved ownership fallback, environment selection, permissions and trigger settings.
- Read MAR-17's completion comment: the worker reported commit `0ab0236`, three passing tests, a passing build, and a prepared PR title, but supplied no PR URL. GitHub search showed no open PR in the repository. A manual [Loop recovery run](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/run/3494981d-bfca-4888-8482-12f8a9014b91) against MAR-17 took 23 seconds, appended the completion requirements to the issue and replied in its existing Codex thread without starting a second implementation. Its reply did not explicitly mention Codex; no worker response was observed during the initial check. Clarified the saved instructions to explicitly mention `@Codex` in an existing-thread follow-up and sent that mention through this chat to test the cloud task's actual publishing capability. Publishing outcome pending; no automatic PR creation is claimed.
- The explicit mention continued the existing [Codex task](https://chatgpt.com/s/cd_6af329c631908191b32070b16224f349). Its [publication result](https://linear.app/thynksoftware/issue/MAR-17/to-have-a-button-to-filter-all-the-appointments-that-i-have-for-today#comment-a63e77f5) was **Publication Blocked**: `git push` received `CONNECT tunnel failed, response 403`, `gh auth status` showed no authenticated GitHub host, and the task reported no GitHub publishing or PR tool. It prepared local branch `codex/mar-17-today-filter` and an origin URL but did not publish a PR. It reported the task's current commit as `8f9ce3acdb8a2a4a4af588a24e66cd72f50972a9` and could not resolve the earlier reported `0ab0236`; both are cloud-task reports, not verified GitHub commits.
- Verified that the saved Loop forwards publication requirements and detects missing PR delivery. Actual automatic PR creation is blocked by the current cloud task's publishing capabilities and access; the instruction change alone does not resolve that infrastructure limitation. No application code was changed in this local chat and no local tests/build were rerun. Journal update remains local.
### 10 November 2026 — Dashboard today filter (MAR-17)

- Added an accessible Today toggle beside the dashboard job counter. It composes with the existing address and status filters and restores all matching appointments when toggled off.
- Added the requested empty state, “No appointments to show”, and a regression test confirming appointment dates are compared with the user's local calendar date.

### 10 November 2026 — Dashboard this-week filter (MAR-20)

- Added a This week toggle beside Today with the same visual and interaction pattern. The two date filters are mutually exclusive, and selecting the active filter again returns to all dates.
- This week uses the user's local calendar week from Monday through Sunday and composes with the existing address and status filters. Regression tests cover both week boundaries and Sunday behavior.
- Follow-up testing found the new action could be pushed beyond the viewport on narrow screens because the inspection heading and all three actions shared one row. The mobile layout now stacks the actions beneath the heading and allows them to wrap.
- Follow-up testing found the new action could be pushed beyond the viewport on narrow screens because the inspection heading and all three actions shared one row. The mobile layout now stacks the actions beneath the heading and allows them to wrap.


## 11 November 2026 — plan and verify before PR handoff

Marlon approved automatic execution after a recorded implementation/test plan, with questions pausing in the same Codex task. Added Playwright Chromium tests for date/search/status composition, validation, photo and caption persistence, completion/PDF contents and mobile overflow. Five unit tests and three browser journeys pass locally. Inspected mobile and report screenshots. A deliberate missing-browser run returned test_pending rather than success; a subsequent normal run passed. This verifies the local failure classification, not cloud routing.

Added Code completed — Pending test and Needs input as Started statuses. Extended the existing two Loops instead of adding another: dispatch carries the planning/testing contract; completion interprets four Codex outcomes and human replies in the original thread, with Slack receipts to avoid duplicate sends. Browser assertions that fail remain product failures; unavailable infrastructure is a distinct pending state. These are agent instructions, not deterministic enforcement of test execution. CI reruns the tests after publication. Cloud setup and lifecycle acceptance evidence will be recorded after the pilot.

The original checkout contained journal conflict markers from earlier edits. Reconciled both histories in an isolated worktree, preserving source changes already merged on main and local experiment notes. Original checkout backed up before any integration.
