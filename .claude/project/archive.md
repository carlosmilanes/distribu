# Archive

Shelved code, kept as git tags instead of files in the tree. Use the `/archive` skill (`.claude/skills/archive/SKILL.md`) to do it.

## Convention

- Tag name: `archive/<name>`, kebab-case, named after the thing archived.
- The tag points at a commit that holds the files at their original paths. That commit is on no branch, so the tag is its only reference and the history stays clean.
- Every tag gets one entry below: tag, original path, what it was, why it was shelved.

## Entries

- `archive/component-morpher`: `app/components/component-morpher.tsx`. Wrapper that morphs two components by injecting `layoutId`, transition and crossfade with `cloneElement`. Shelved for the `useMorph` hook: same child requirements, but the props stay visible.
