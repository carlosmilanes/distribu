---
paths:
  - "**/*.tsx"
---

# React Code Generation Rules

## General Principles

- Define component prop types separate from the corresponding component itself.
- Use traditional function declarations instead of arrow functions for components and named functions. Use arrow functions for inline event handlers and callbacks.

## Documentation

- **All components, hooks, and functions must have a docstring** in TSDoc format, placed directly above the declaration (not inside the body).
- Write the block as plain prose with no leading `*` on each line. Put `/**` and `*/` on their own lines.
- Keep it short: 1-3 lines on purpose. Don't restate what the name or types already say.
- Don't use `@param` or `@returns` by default, since TypeScript types already cover them. Mention parameters or return values in the prose only when the meaning isn't obvious from the name and type (units, formats, side effects, constraints).
- For components, describe what they render and key props.
- For hooks, describe the state/logic they manage and what they return.
- For helper functions, describe their purpose and transformation logic.
- Document props in the props type, with a single-line `/** ... */` above each non-obvious field. Skip obvious ones.
- Whenever you make changes to a component, hook, or function, update its docstring (and prop comments) to reflect the changes.

### Documentation Examples:

```typescript
/**
Shows a transaction row with amount, category and status.

Used in lists only. Don't use it in the detail view.
Selection is controlled by the parent via onSelect, not by this component.
*/
export function TransactionRow({ tx, onSelect }: TransactionRowProps) {
  // component logic
}

type TransactionRowProps = {
  tx: Transaction;
  /** Fires on row click, not on the menu button */
  onSelect?: (id: string) => void;
};

/**
Manages distribu list state and loading/error flags.
Returns the distribus array, loading state, and error state.
*/
function useDistribusData(initialDistribu: Distribu[]): UseDistribusDataReturn {
  // hook logic
}

/**
Converts a distribu name to a URL-safe slug, e.g. "Family Budget" becomes "family-budget".
*/
function createSlug(name: string): string {
  // helper logic
}
```

## Component Architecture

- Extract component logic into hooks. Separate component logic from presentation. Custom hooks should manage side effects, state, and logic; the component focuses only on rendering.
- Do not implement memoization techniques like useMemo and useCallback, since React Compiler is installed in this project.
- Implement lazy loading for large components to improve initial load performance.

## Component Organization

- **Hierarchical dependency structure**: Each component should be immediately followed by its dependencies in this order:
  1. **Hooks** (custom hooks used by the component)
  2. **Helper functions** (utility functions used by the component)
  3. **Subcomponents** (in order of appearance in the parent component)
- **File structure order**: After all components and their dependencies are laid out hierarchically, follow with:
  1. **Types** (component prop types grouped together, one for each component)

### Example Structure:

```typescript
// Main exported component first
export default function MainComponent() {
  const data = useCustomHook();
  const result = helperFunction(data);

  return (
    <div>
      <FirstSubComponent />
      <SecondSubComponent />
    </div>
  );
}

// Dependencies of MainComponent follow immediately:
function useCustomHook() {
  // Hook logic
}

function helperFunction(data) {
  // Helper logic
}

function FirstSubComponent() {
  return <NestedComponent />;
}

// Dependencies of FirstSubComponent:
function NestedComponent() {
  return <span>Nested</span>;
}

function SecondSubComponent() {
  return <div>Second</div>;
}

// Types (after all components) - one for each component
type MainComponentProps = {
  // props for MainComponent
};

type FirstSubComponentProps = {
  // props for FirstSubComponent
};

type SecondSubComponentProps = {
  // props for SecondSubComponent
};
```

## Naming Conventions

- Prefix event handlers with "handle" (handleClick, handleSubmit).
- Use kebab-case naming for component files.
- Favor named exports for components.

## Accessibility

- Ensure accessibility compliance.
- Avoid using <div> and <span> when semantic elements exist.
- Utilize ARIA landmarks when semantic HTML isn't sufficient.
- Use `aria-label` for elements without visible text.
- Implement `aria-expanded` for expandable content.
- Apply `aria-controls` to establish relationships between elements.
- Use `aria-live` regions for dynamic content updates.
- Add `aria-hidden` for decorative elements.