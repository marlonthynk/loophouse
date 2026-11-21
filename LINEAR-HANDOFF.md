# Linear workflow

The active **LoopHouse — Codex-Linear** Loop handles new LoopHouse issues labelled Bug or Improvement. It starts Linear's cloud coding agent configured for Codex. The two earlier Loops are paused. Live Linear settings, not a repository file, control the Loop.

1. The agent records a concise implementation and testing plan on the issue or in the existing agent session before making changes. It proceeds unless a material requirement needs clarification.
2. It runs the checks in [TESTING.md](TESTING.md), including Playwright for code changes, and records actual results and evidence on the issue. Relevant experiment observations go in [EXPERIMENT-JOURNAL.md](EXPERIMENT-JOURNAL.md).
3. After verification, it publishes a real draft PR linked to the issue, checks its head and reports CI separately. A person reviews and merges.

| Outcome | Status |
| --- | --- |
| Verified change with draft PR | In Review |
| Required test infrastructure unavailable | Code completed — Pending test |
| Verified change but PR publication blocked | Pending PR creation |
| Unanswered material question | Needs input |
| Failed assertion or unfinished work | In Progress |

The agent updates the triggering issue with the evidence and blocker or next action. It never marks work Done, merges, deploys or claims unrun checks passed. Preserve the human assignee and continue the existing session. Earlier experiment history is in the journal.
