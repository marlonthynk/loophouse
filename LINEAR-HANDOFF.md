# Linear workflow

The active **LoopHouse — Codex-Linear** Loop handles new LoopHouse issues labelled Bug or Improvement. It starts Linear's cloud coding agent configured for Codex. The two earlier Loops are paused. Live Linear settings, not a repository file, control the Loop.

1. The agent first checks whether the reported problem or missing feature actually exists. If the request is already satisfied, it comments with evidence and how to find and use the feature, makes no code change or PR, and leaves the issue In Progress for human review. If partly satisfied, it identifies and implements only the gap; if inconclusive, it asks a focused question.
2. The agent records a concise implementation and testing plan on the issue or in the existing agent session before making changes. It proceeds unless a material requirement needs clarification.
3. It runs the checks in [TESTING.md](TESTING.md), including Playwright for code changes, and records actual results and evidence on the issue. Relevant experiment observations go in [EXPERIMENT-JOURNAL.md](EXPERIMENT-JOURNAL.md).
4. After verification, it publishes a real draft PR linked to the issue, checks its head and reports CI separately. A person reviews and merges.

| Outcome | Status |
| --- | --- |
| Requested behavior already exists | In Progress — human review |
| Verified change with draft PR | In Review |
| Required test infrastructure unavailable | Code completed — Pending test |
| Verified change but PR publication blocked | Pending PR creation |
| Unanswered material question | Needs input |
| Failed assertion or unfinished work | In Progress |

The agent updates the triggering issue with the evidence and blocker or next action. It never marks work Done, merges, deploys or claims unrun checks passed. Preserve the human assignee and continue the existing session. Earlier experiment history is in the journal.
