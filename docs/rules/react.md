# React Code Generation Rules

## General Principles

- Define component prop types separate from the corresponding component itself.
- Use traditional function declarations instead of arrow functions for components and named functions. Use arrow functions for inline event handlers and callbacks.

## Documentation

- **All components, hooks, and functions must have docstrings** using TSDoc format.
- Whenever you make changes to a component, hook, or function, make sure to update its docstring to reflect the changes.
- Include brief description of purpose, parameters, and return values.
- For components, describe what they render and key props.
- For hooks, describe the state/logic they manage and return values.
- For helper functions, describe their purpose and transformation logic.

### Documentation Examples:

```typescript
/**
 * Main distribu selection component that allows users to choose or create workspaces
 *
 * @param loaderData - Contains the list of available distribus from the loader
 * @returns JSX element with distribu selection interface
 */
export default function DistribusHub({ loaderData }: Route.ComponentProps) {
  // component logic
}

/**
 * Custom hook for managing distribu data state and loading states
 *
 * @param initialDistribu - Initial list of distribus from server
 * @returns Object containing distribus array, loading state, and error state
 */
function useDistribusData(initialDistribu: Distribu[]): UseDistribusDataReturn {
  // hook logic
}

/**
 * Converts a distribu name to a URL-safe slug format
 *
 * @param name - The distribu name (e.g., "Family Budget")
 * @returns URL-safe slug (e.g., "family-budget")
 */
function createSlug(name: string): string {
  // helper logic
}
```

## Component Architecture

- Extract component logic into hooks. Separate component logic from presentation. Custom hooks should manage side effects, state, and logic; the component focuses only on rendering.
- Optimize for performance and Web Vitals.
  - Implement memoization techniques (use, useMemo, useCallback) where necessary to optimize re-renders.
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