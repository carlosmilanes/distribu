---
paths:
  - "**/*.tsx"
  - "**/*.stylex.ts"
---

# StyleX Styles Generation Rules

- Use named imports.
- Always import `props` as `style`.
- **Use only one `styles` variable at the very end of each file**, containing all the styles for the corresponding file. The `styles` constant must be the last thing defined in the file, after all components, hooks, helper functions, and types.
- **Always create styles using the available relevant variables defined in files inside mdc:app/styles/, especially from [vars.stylex.ts](mdc:app/styles/vars.stylex.ts) for color, spacing, typography, etc.. Do not use hardcoded values unless absolutely necessary and justified.**
- For responsive styles, always use shared breakpoints/types from `@styles/breakpoints.stylex.ts`.
- Define styles as atomic and reusable as possible (single responsibility per style key).
- Use descriptive, consistent style key names (e.g., `primaryButton`, `cardContainer`).
- Compose styles using arrays or spread syntax for shared patterns.
- Add a short comment for any non-obvious style rule or when deviating from conventions.
- Apply the styles (using the `{...style(styles.example)}` syntax) as the last prop on the styled elements.

## Example

```typescript
import { create, props as style } from 'stylex';
import { colors } from '@styles/vars.stylex';

function Component() {
  return (
    <div className="example" id="my-div" {...style(styles.base)}>
      {/* styles applied as the last prop */}
    </div>
  );
}

// All types defined here

type ComponentProps = {
  // component props
};

// styles must be the very last thing in the file
const styles = create({
  base: {
    color: colors.text,
  },
});
```