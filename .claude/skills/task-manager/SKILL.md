---
name: task-manager
description: Manage the project's task list in .claude/project/tasks.md - recommend the next task, add, update, reorder, complete or remove tasks. Use when the user types /task-manager or asks to manage, add, change or pick tasks.
argument-hint: "[next [preference] | add <task> | update <task> <change> | done <task> | remove <task> | list]"
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(git status:*), Bash(git branch:*), Bash(git log:*)
---

# /task-manager: manage tasks

Manage the open tasks in `.claude/project/tasks.md`.

The user's request: `$ARGUMENTS`

## Choosing the action

Infer the action from the request:

- **next** (also the default when the request is empty or a preference like "easy", "30 minutes", "security"): recommend one task.
- **add**: add a new task.
- **update**: change a task's text, effort tag or priority (position).
- **done**: mark a task finished, which deletes it (git history keeps it).
- **remove**: delete a task that is no longer wanted.
- **list**: show the open tasks, in file order, as short titles.

If the request is ambiguous, pick the most likely action and say which one you took.

## File format

- Path: `.claude/project/tasks.md`. If it does not exist, follow "Missing file" below.
- Header (`# Tasks` plus one intro line), then one task per `- [ ]` line.
- Separate tasks with one blank line.
- Order is priority, highest first.
- A task is `- [ ] **Short title**: what and why, in one or two sentences.` It may carry an effort tag after the title: `[S]`, `[M]` or `[L]`.
- Preserve any text in the file that is not a task (headers, notes). Do not delete notes unless the user says so.

## Actions

### next

1. Read the file. Each `- [ ]` line is an open task; the file's order is a hint, not a rule. Use effort tags when present, otherwise estimate.
2. Run `git status` and `git branch` so the recommendation fits reality (needed branch, unmerged work).
3. Score each task on:
   - **Impact**: fixes something broken, clears a security alert, or makes the app usable for real.
   - **Unblocking**: enables or simplifies other tasks, or speeds up every later session.
   - **Effort and clarity**: small, well-defined tasks beat vague or large ones when impact is similar.
   - **Blocked or waiting**: skip tasks that depend on an external release or on information the user still has to provide, unless nothing else is actionable.
   - **Optional or speculative**: rank last.
4. Treat the preference, if any, as a weighting, not an override ("tired" or "easy" favors small tasks; "30 minutes" favors tasks that fit; "security" or "UI" favors that kind). If nothing matches, pick the best overall and say so.
5. Spot-check the top two or three candidates against the code (Read or Grep the files and branches each names). If one is stale, say so and pick another. Keep it to a few targeted reads.
6. Pick one winner. Do not start the work.

Output:

**Recommended: <task title>**

<2-4 sentences: why this one now.>

End by asking whether to start on the recommended task. No runner-up, no other candidates, no mention of blocked/stale tasks.

### add

1. Turn the request into one task in the format above. Keep the user's meaning; tighten wording. Include concrete file names or commands when the user gave them.
2. Place it by priority. If the user gave no position, append it at the end.
3. Do not add near-duplicates; if a similar task exists, offer to update it instead.
4. Reply with the title and its position.

### update

1. Find the task by title or keywords. If several match, list them and ask which.
2. Apply only the requested change (text, tag, or move). Keep the rest as is.
3. Reply with what changed.

### done / remove

1. Find the task as in update.
2. Delete the whole entry, with its blank line. For `done`, first check the code or git log quickly; if it looks unfinished, say so and ask before deleting.
3. Reply with the deleted title.

### list

Show open tasks in order, one line each (title and tag). No analysis.

## Missing file

If the file does not exist, say so in one line and ask whether to create it. On a yes (or when the user is adding a task), create it with:

```markdown
# Tasks

Open tasks, highest priority first. Delete a task when it's done (git history keeps it).
```

Then continue with the requested action.

## Rules

- Only change the file for add, update, done or remove requests, and only the tasks the user named. `next` and `list` never edit it.
- Never invent tasks. If follow-up work comes up elsewhere, suggest it in the reply and wait for a yes.
- If the file has no open tasks, say so in one line.
- Keep replies short.
