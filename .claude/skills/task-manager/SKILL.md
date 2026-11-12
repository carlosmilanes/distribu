---
name: task-manager
description: Pick the single best task to work on next from .claude/tasks.md and explain why in a few sentences. Accepts an optional preference such as "easy", "30 minutes" or "security". Use when the user types /task-manager or asks what to work on next.
argument-hint: "[optional preference, e.g. easy | 30 minutes | security]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git branch:*), Bash(git log:*)
---

# /task-manager: choose the next task

Read `.claude/tasks.md` and recommend the one open task that will deliver the most value if worked on now.

The user's optional preference: `$ARGUMENTS`

## Steps

1. Read `.claude/tasks.md`. If it does not exist, follow "Missing file" below and stop.
2. Each `- [ ]` line is an open task, listed roughly by priority (the file's own order is a hint, not a rule). A task may carry an optional effort tag such as `[S]`, `[M]` or `[L]` (small, medium, large). Use the tag when present; otherwise estimate effort from the description.
3. Check the current state with `git status` and `git branch` so the recommendation fits reality (for example, a task that needs a branch that is not checked out, or unmerged work).
4. Score each task on:
   - **Impact**: does it fix something broken, clear a security alert, or make the app usable for real?
   - **Unblocking**: does it enable or simplify other tasks, or make every later session faster?
   - **Effort and clarity**: small, well-defined tasks beat vague or large ones when impact is similar.
   - **Blocked or waiting**: skip tasks that depend on an external release or on information the user still has to provide, unless nothing else is actionable.
   - **Optional or speculative**: rank these last.
5. Apply the preference in `$ARGUMENTS`, if any. Treat it as a weighting on step 4, not an override. For example, "tired" or "easy" favors small, clear tasks; "30 minutes" favors tasks that fit that time; "security" or "UI" favors tasks of that kind. If the preference leaves no good match, pick the best overall task and say so.
6. Spot-check the top two or three candidates: Read or Grep the files and branches each one names, to confirm the task still matches the code (not already done, not stale, no changed assumptions). If a task looks stale, say so and pick another. Keep this to a few targeted reads; do not scan the whole project.
7. Pick one winner. Do not start the work.

## Output format

Keep it short:

**Recommended: <task title>**

<2-4 sentences: why this one gives the most results now, and why it beats the closest alternative. Mention the preference if it changed the outcome.>

**Runner-up:** <task title>, in one line on why it comes second. (Omit if there is only one actionable task.)

If a task is blocked on something the user must provide, or looks stale after the spot-check, mention that in one line.

End by asking whether the user wants to start on the recommended task.

## Missing file

If `.claude/tasks.md` does not exist, say so in one line and ask whether to create it. Do not create it without a yes. On a yes, create it with exactly this content:

```markdown
# Tasks

Open tasks, highest priority first. Delete a task when it's done (git history keeps it).
```

Then stop. Do not invent tasks.

## Rules

- Never edit, add, reorder or delete entries in `.claude/tasks.md`. This skill only suggests; the one exception is creating the empty file after the user says yes.
- Do not invent tasks that are not in the file.
- If the file has no open tasks, say so in one line.
