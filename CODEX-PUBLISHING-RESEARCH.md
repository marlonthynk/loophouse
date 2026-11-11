# Codex Cloud publication research

Researched 10 November 2026 for the LoopHouse experiment. These are external reports and documentation findings, not successful verification of LoopHouse publication.

## Finding

A failure to run `git push` or authenticated `gh` inside a cloud task does not establish that Codex's separate GitHub publishing UI is unavailable. The official Linear integration documentation describes returning a completed task link so the user can create a PR. We have tested shell publication for MAR-17 and seen a proxy 403, missing GitHub CLI authentication, and no task publishing tool. We have not tested the completed task's Create PR action.

Official source: https://learn.chatgpt.com/docs/third-party/linear

Legacy environment agent internet is disabled by default, while setup scripts have network access. This explains why successful repository setup is not proof of outbound shell access during a task. Turning on network access would also not supply GitHub authentication. Do not treat unrestricted networking as a demonstrated fix.

Official source: https://learn.chatgpt.com/docs/cloud/internet-access

## Reports and workarounds

- **Codex UI publication:** A Linear user reported the same missing Git remote and used the Codex UI to create PRs. This is a firsthand workaround, not proof that a fully automatic Loop can invoke that UI action. https://www.reddit.com/r/Linear/comments/1sh3r0r/codex_agent_in_linear_frequent_errors/
- **Prompting does not supply publishing capability:** In a June 2026 OpenAI community thread, a user reported that asking the agent to create PRs failed while clicking Create PR worked. Suggestions to use skills did not solve their problem. The feature request was acknowledged without an implementation timeline. API/MCP approaches were suggested, not demonstrated as a working solution in that thread. https://community.openai.com/t/codex-cloud-not-able-to-create-automatic-prs/1382682
- **Reconnect when UI publication itself fails:** In GitHub issue #21227, a May 2026 user reported success after revoking and reconnecting ChatGPT-related GitHub access. OpenAI marked that incident mitigated the next day. This is historical and anecdotal; it does not establish that reconnecting fixes the current LoopHouse task or enables automatic PR creation. https://github.com/openai/codex/issues/21227
- **Patch recovery:** An August 2026 community report matches the combination of successful coding, missing PR/diff UI, proxy 403 and missing `gh` authentication. The author exported `git format-patch` via encoded chunks, then abandoned the result and reimplemented locally. OpenAI Support requested task evidence in October. This is an emergency export route, not a usable steady-state workflow. https://community.openai.com/t/codex-cloud-task-completed-successfully-but-no-diff-create-pr-download-handoff-is-available/1391037
- **Networking is not a universal cure:** GitHub issue #20928 reports proxy 403 even with unrestricted internet and remains open when checked. It is not evidence that the same root cause affects LoopHouse, whose Legacy agent internet is off. https://github.com/openai/codex/issues/20928

## Recommended next verification

Open the existing MAR-17 Codex task and inspect its supported Create PR/Create draft PR action. If present, test that path and independently verify the resulting branch and PR on GitHub. If successful, the current workflow has a human publication step. Fully automatic publication remains unproven. If the action is missing or fails, preserve a patch and collect evidence before considering connector reconnection or Support escalation.

MAR-17 task: https://chatgpt.com/s/cd_6af329c631908191b32070b16224f349

No environment access or authentication settings were changed during this research. Findings were saved separately because EXPERIMENT-JOURNAL.md currently contains unresolved merge-conflict markers alongside concurrent application changes; this research did not resolve or alter those changes.
