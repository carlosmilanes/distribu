---
paths:
  - "**/*.tsx"
---

# React Code Generation Rules

## General Principles

- Define component prop types separate from the corresponding component itself.
- Use traditional function declarations instead of arrow functions for components and named functions. Use arrow functions for inline event handlers and callbacks.

## Documentation

- Components and hooks follow the documentation rules in the TypeScript rules file.
- Don't use `@param` for components; props are documented on the props type.
- For components, describe what they render and key props.
- For hooks, describe the state/logic they manage and what they return.
- Document props in the props type, with a single-line `/** ... */` above each non-obvious field. Skip obvious ones.
- Whenever you change a component or hook, update its docstring (and prop comments) to reflect the changes.

### Documentation Examples:

```typescript
/**
Shows a transaction row with amount, category and status.

Used in lists only. Don't use it in the detail view.
Selection is controlled by the parent via onSelect, not by this component.
*/
export function TransactionRow({ tx, onSelect }: TransactionRowProps) {
  const status = useTransactionStatus(tx);
}

/**
Derives the display status of a transaction.
Returns the status label and color tone.
*/
function useTransactionStatus(tx: Transaction): UseTransactionStatusReturn {
  // hook logic
}

type TransactionRowProps = {
  tx: Transaction;
  /** Fires on row click, not on the menu button */
  onSelect?: (id: string) => void;
};
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
export function MainComponent() {
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

## Accessibility

- Ensure accessibility compliance.
- Avoid using <div> and <span> when semantic elements exist.
- Utilize ARIA landmarks when semantic HTML isn't sufficient.
- Use `aria-label` for elements without visible text.
- Implement `aria-expanded` for expandable content.
- Apply `aria-controls` to establish relationships between elements.
- Use `aria-live` regions for dynamic content updates.
- Add `aria-hidden` for decorative elements.