# LoopHouse: manual PR handoff

Configured and verified on 10 November 2026 at Marlon's request. This replaces the earlier requirement that the Codex sandbox itself must publish a PR.

## Original workflow — 10 November

`Todo → In Progress → Pending PR creation → In Review → Done`

The human owns the issue throughout. Codex implements the change in `loophouse-linear`. Once implementation is ready, Linear puts it in the human publication queue, comments with the task link and sends Marlon a Slack DM. The human opens the task, reviews the diff, uses Create PR/Create draft PR, links the actual GitHub PR and moves the issue to In Review. Done remains a later human/merge decision.

Pending PR creation is a MAR team status in the Started category, not a completed state.

## Configured resources

- [Dispatch Loop](https://linear.app/thynksoftware/loop/loophouse-delegate-bugs-to-codex-56cc0a499272/overview): issue created in MAR; project LoopHouse; labels include **any** of Bug or Improvement. Assigns an unowned issue to its eligible human creator, validates its requirements, appends the Codex instructions, sets In Progress and delegates. Existing work is not duplicated.
- [Completion Loop](https://linear.app/thynksoftware/loop/loophouse-pr-handoff-notifications-b8421904a4f2/overview): new issue comment contains `CODEX_IMPLEMENTATION_READY`; project LoopHouse. Requires the comment's actual author to be the installed Codex agent. Team access is MAR, code/web/admin access are disabled, and changes outside the triggering issue are off.
- [Pending PR creation view](https://linear.app/thynksoftware/view/loophouse-pending-pr-creation-dff2082025aa): team MAR, project LoopHouse, status Pending PR creation. Saved as a shared team view and added to Marlon's Favorites.
- Slack: existing `grech-home` integration attached to the completion Loop. Notifications go only to Marlon's direct messages, not a public channel. Marlon personally approved linking his Slack account and explicitly approved adding Codex as a trusted trigger source. Only Codex is selected as a trusted external source for this Loop; Jira remains unselected.

## Completion contract

Codex's final reply must include `CODEX_IMPLEMENTATION_READY` only when changes are ready, plus the summary, checks actually run, limitations and known branch/commit details. The Codex integration appends the real cloud-task URL. It must not invent a link or claim a local commit is published. Incomplete implementations use `CODEX_IMPLEMENTATION_BLOCKED` and do not enter the ready queue. No-change investigations do not need a PR.

The completion Loop preserves ownership and delegation, sets Pending PR creation, and posts an actionable task link and reported test results on the issue. It does not regress Done/Canceled/Duplicate issues or issues already associated with a published PR. It sends the Slack DM and records `PR_HANDOFF_READY`/`PR_HANDOFF_NOTIFIED` receipts against the completion comment and task. A failed Slack send must not remove the task link or roll back the queue status. This is agent-executed configuration; receipts provide an audit trail rather than a deterministic database uniqueness constraint.

## Verification

[MAR-19](https://linear.app/thynksoftware/issue/MAR-19/document-the-manual-pr-handoff-workflow-in-the-readme) is a small README-only improvement used to test this workflow with a real Codex task.

Observed through the Linear connector:

- Created without an assignee, with only Improvement label.
- Dispatch assigned Marlon, set In Progress, appended the new instructions and delegated to Codex.
- Codex returned the required ready marker, its real task link, a README summary and reported checks. Its local cloud commit was reported as `e706ca4`; it is not a verified GitHub commit.
- The completion event was initially held as untrusted. After Marlon explicitly approved Codex as a trusted source, added it to the workspace allowlist and enabled it on the completion Loop. Manually continued this already-held event. Future matching Codex comments now have the required source trust configured; a second post-trust completion event was not separately tested.
- The completion run set Pending PR creation and posted the handoff comment. The saved view was independently queried and showed MAR-19.
- Independently searched Slack and confirmed the explicit DM's recipient, content, issue link and Codex task link. The Linear Slack tool returned a success timestamp but no permalink; the Slack connector supplied the verified message link below.

Evidence:

- [Codex task](https://chatgpt.com/s/cd_6af3306589188191a9f45aa874bfb8b7)
- [Completion run](https://linear.app/thynksoftware/loop/loophouse-pr-handoff-notifications-b8421904a4f2/run/89760e7f-4917-5c4e-8244-e8ba78e0b617)
- [Issue handoff comment](https://linear.app/thynksoftware/issue/MAR-19/document-the-manual-pr-handoff-workflow-in-the-readme#comment-c4d21e04)
- [Verified Slack DM](https://grech-home.slack.com/archives/D0C7RCVGMNE/p1794322815231769)

Codex reported formatting, three tests, build and diff checks passing. These were not rerun independently in the local workspace during this configuration task. No application source was edited by this chat. MAR-17 was already Done with a GitHub PR link and MAR-16 Canceled when checked; neither was reopened for this setup.

These notes were originally local because the journal contained concurrent conflict markers. On 11 November the histories were reconciled in an isolated worktree and included in the testing-workflow PR; the original checkout was preserved.


## Updated workflow — 11 November 2026

The existing two Loops now implement planning and verification before handoff. Dispatch still triggers on new Bug OR Improvement issues; it delegates missing-requirement questions to Codex so replies can continue the same task. Codex records docs/work/<ISSUE-ID>.md before code, then proceeds without approval unless a material question remains. AGENTS.md and TESTING.md are the repository contract. Reference prompts are in docs/linear-*-instructions.txt; the live Linear configuration is authoritative and is not automatically synced from those files.

The completion trigger is now **New issue comment** within LoopHouse, so it can see all four final markers and substantive human answers in the original Codex conversation. It checks actual Codex authorship for outcome reports and ignores progress, unrelated comments and its own receipts. This broader trigger may create ignored runs for non-actionable comments; it is the tradeoff for handling ordinary replies without requiring the human to type a special marker.

| Codex outcome | Linear status | Human action |
| --- | --- | --- |
| Verified implementation and changed behavior | Pending PR creation | Review task diff, Create PR |
| Implementation complete, required infrastructure unavailable | Code completed — Pending test | Resolve blocker and retry the same task |
| Material unanswered question | Needs input | Answer in original Codex thread, mention @Codex |
| Actual product or implementation failure | In Progress | Fix failure; do not call it test-pending |

The human assignee and Codex delegation remain unchanged. Human replies that answer the question/request retry with @Codex move back to In Progress; native integration resumes the original task. Lifecycle replies use LOOPHOUSE_OUTCOME_RECORDED / LOOPHOUSE_OUTCOME_NOTIFIED receipts keyed by result comment, task and outcome. The connected Slack integration sends Marlon the issue, same task and question/blocker/PR action. Delivery must be confirmed by the tool before a receipt is recorded.

Local missing-browser classification and Linux CI have been verified. End-to-end cloud question/pending/ready routing is awaiting the MAR-22 pilot after PR #4 lands on main. Do not infer it passed from configuration alone.
