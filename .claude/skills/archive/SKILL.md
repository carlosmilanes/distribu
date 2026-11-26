---
name: archive
description: Shelve files as a local git tag `archive/<name>` and remove them from the tree, then log it in .claude/project/archive.md. Use when the user types /archive or wants to shelve code without deleting it.
argument-hint: "<name> <path>..."
disable-model-invocation: true
allowed-tools: Read, Edit, Bash(git status:*), Bash(git add:*), Bash(git commit:*), Bash(git tag:*), Bash(git reset:*), Bash(git rm:*), Bash(git ls-files:*), Bash(git diff:*), Bash(rm:*)
---

# /archive: shelve code as a git tag

Convention: `.claude/project/archive.md`. Request: `$ARGUMENTS` (`<name> <path>...`).

If the name or paths are missing or the paths don't exist, ask. Don't push or commit anything else.

## Steps

1. Check `archive/<name>` doesn't exist (`git tag -l`). Stop if it does.
2. Tag the files:
   - Tracked and unmodified (`git status --short -- <paths>` empty): `git tag archive/<name>`.
   - Otherwise: `git add -- <paths>`, `git commit --only -m "Archive <name>" -- <paths>`, `git tag archive/<name>`, `git reset --soft HEAD~1`. The tagged commit is now on no branch.
3. Remove the files from the tree and index: `git rm -r -f --cached -- <paths>` (skip untracked ones), then `rm -r <paths>`.
4. Add an entry to `.claude/project/archive.md` under "Entries": tag, original path, what it was, why shelved. Ask for the "why" if the conversation doesn't say.
5. Report the tag, and that it is local only. Leave the removal and the `archive.md` change uncommitted.
