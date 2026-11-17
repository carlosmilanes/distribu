---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript code generation rules

## General Principles

Always take into consideration:
- Modularity and reusability: Apply the Single Responsibility Principle (SRP). Follow DRY (Don't Repeat Yourself) principle.
- Performance implications.
- Error handling and edge cases.
- Best practices alignment.

## Type Generation

- Prefer types over interfaces. Use interfaces for extending object shapes.
- Avoid enums; use const maps instead.
- Implement proper type safety and inference.
- Use `satisfies` operator for type validation.

## Function Architecture

- Use functional and declarative programming patterns.
- Keep functions at a consistent level of abstraction:
    - High-level functions should orchestrate logic by calling lower-level functions without implementing details.
    - Low-level functions should encapsulate specific tasks without handling broader logic.
    - Each function should focus on a single level of responsibility, delegating subtasks to appropriately abstracted functions.
- Implement early returns for better readability.

## Naming Conventions

- Use descriptive names with auxiliary verbs (isLoading, hasError).
- Use lowercase with dashes for directories (components/auth-wizard).
- Favor named exports.