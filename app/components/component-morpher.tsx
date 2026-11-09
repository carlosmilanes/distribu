import { cloneElement, type ReactElement } from 'react';
import { MotionContainer } from './motion-container';
import type { StyleXStyles } from 'stylex';

/**
 * Component that handles smooth morphing transitions between two React components
 * using Motion's shared layout animations. The components being morphed are unaware
 * of the transformation as the necessary Motion props are injected automatically.
 *
 * @param InitialComponent - The initial component to display
 * @param toComponent - The target component to morph into
 * @param morphed - Controls which component is shown (false = from, true = to)
 * @param layoutId - Motion's shared layout identifier for the morphing animation
 * @returns JSX element with morphing animation between components
 */
export function ComponentMorpher({
  InitialComponent,
  toComponent,
  morphed,
  layoutId,
  CommonStyles,
}: {
  InitialComponent: ReactElement;
  toComponent: ReactElement;
  morphed: boolean;
  layoutId: string;
  CommonStyles: StyleXStyles;
}) {
  const currentComponent = morphed ? toComponent : InitialComponent;

  // Clone the current component and inject layoutId as a key for React's reconciliation
  // This ensures smooth morphing by treating both components as the same element
  const morphedComponent = cloneElement(currentComponent, {
    key: `${layoutId}-${morphed ? 'to' : 'from'}`,
  });

  return (
    <MotionContainer
      layout // Enable layout animations for smooth morphing
      layoutId={layoutId}
    >
      {morphedComponent}
    </MotionContainer>
  );
}
