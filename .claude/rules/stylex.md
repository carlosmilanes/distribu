---
paths:
  - "**/*.tsx"
  - "**/*.stylex.ts"
---

# StyleX Styles Generation Rules

- Use named imports.
- Always import `props` as `style`.
- **Use only one `styles` variable at the very end of each file**, containing all the styles for the corresponding file. The `styles` constant must be the last thing defined in the file, after all components, hooks, helper functions, and types.
- **Always create styles using the available relevant variables defined in files inside app/styles/, especially from [vars.stylex.ts](app/styles/vars.stylex.ts) for color, spacing, typography, etc.. Do not use hardcoded values unless absolutely necessary and justified.**
- For responsive styles, always use shared breakpoints/types from @app/styles/breakpoints.stylex.ts.
- Define styles as atomic and reusable as possible (single responsibility per style key).
- Use descriptive, consistent style key names (e.g., `primaryButton`, `cardContainer`).
- Compose styles using arrays or spread syntax for shared patterns.
- Add a short comment for any non-obvious style rule or when deviating from conventions.
- Apply the styles (using the `{...style(styles.example)}` syntax) as the last prop on the styled elements.

## Property order

Define properties inside each style key in this concentric (inside-out) order. **Always** separate groups with a blank line and put a comment above each group (`// size`, `// content`, `// box`, `// layout`, `// effects`), whatever the number of properties. Omit groups that have no properties.

1. **`// size`**: `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`
2. **`// content`**: `color`, `font*`, `lineHeight`, `letterSpacing`, `textAlign`, `textDecoration`, `whiteSpace`, other text props
3. **`// box`**: `backgroundColor`, `padding*`, `border*`, `borderRadius`, `outline`, `boxShadow`, `overflow`, `cursor`, `margin*`
4. **`// layout`**: first how children are arranged (`display`, `flexDirection`, `gap`, `alignItems`, `justifyContent`, `gridTemplate*`), then how the element sits in its parent (`flex`, `alignSelf`, `gridArea`, `position`, insets `top`/`right`/`bottom`/`left`, `zIndex`)
5. **`// effects`**: `opacity`, `transform`, `transition`, `animation`, `filter`

## Longhand properties

Be specific: use longhand properties (`borderWidth`, `borderStyle`, `borderColor`, `paddingBlock`, `paddingInline`). Never use `border` or multi-value shorthands (e.g., `padding: '8px 16px'`). Single-value shorthands (e.g., `padding: dynamicSizes.s4`) are fine. This is enforced by the `@stylexjs/valid-shorthands` ESLint rule.

## Example

```typescript
import { create, props as style } from 'stylex';
import { borderRadius, colors, dynamicSizes } from '@styles/vars.stylex';

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
    // size
    width: '100%',

    // content
    color: colors.text,

    // box
    backgroundColor: colors.secondaryBackground,
    padding: dynamicSizes.s4,
    borderRadius: borderRadius.m,

    // layout
    display: 'flex',
    gap: dynamicSizes.s2,
    position: 'relative',

    // effects
    transition: 'opacity 0.2s',
  },
});
```