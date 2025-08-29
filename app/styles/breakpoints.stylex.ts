// Currently, there's no way to define breakpoints constants in stylex.
// This is a workaround taken from https://github.com/facebook/stylex/issues/238#issuecomment-1876699301 to keep media queries consistent across files

// This seems to be resolved by 'defineConst'
// TODO: DELETE

export type Medium = '@media (min-width: 48rem)';
export type Wide = '@media (min-width: 78.75rem)';