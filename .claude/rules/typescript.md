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

## Documentation

- **All named functions must have a docstring** in TSDoc format, placed directly above the declaration (not inside the body). Inline callbacks and event handlers don't need one.
- Write the block as plain prose with no leading `*` on each line. Put `/**` and `*/` on their own lines.
- Keep it short: 1-3 lines on purpose and when to use or not use it. Don't restate what the name or types already say.
- Use `@param` for a parameter, and `@returns` for the result, only when the meaning isn't obvious from the name and type (units, formats, constraints, side effects). Never restate the type. Skip the tags when the signature is self-explanatory.
- For helper functions, describe their purpose and transformation logic.
- Exported domain types may get a short docstring or field comments when the meaning isn't obvious (units, formats, constraints).
- Whenever you change a function or type, update its docstring to reflect the changes.

### Documentation Examples:

```typescript
/**
Converts a distribu name to a URL-safe slug, e.g. "Family Budget" becomes "family-budget".
*/
function createSlug(name: string): string {
  // helper logic
}

/**
Formats an amount as a euro string, e.g. 1250 becomes "12,50 €".

@param amount - In cents, not euros
*/
function formatAmount(amount: number): string {
  // helper logic
}

type Transaction = {
  id: string;
  /** Amount in cents, negative for expenses */
  amount: number;
};
```

## Naming Conventions

- Use descriptive names with auxiliary verbs (isLoading, hasError).
- Use lowercase with dashes for directories (components/auth-wizard).
- Favor named exports.