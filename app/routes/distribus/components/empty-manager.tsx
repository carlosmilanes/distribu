import {
  colors,
  fixedSizes,
  fontSizes,
  fontWeights,
} from '@/app/styles/vars.stylex';
import { create, props } from 'stylex';
import { StartButton } from '@/app/routes/distribus/components/start-button';
import { MotionContainer } from '@/app/components/motion-container';
import { layoutTransitions } from '@/app/motion/presets';
import { LayoutGroup } from 'motion/react';

/**
 * EmptyHub displays a full-page empty state when no distribus exist.
 * Prompts the user to create their first distribu with a prominent button.
 *
 * @returns Full viewport empty state UI with create button
 */
export function EmptyManager() {
  return (
    <LayoutGroup>
      <main
        {...props(styles.base)}
        aria-label='No distribus'
      >
        <StartText />
        <StartButton />
      </main>
    </LayoutGroup>
  );
}

function StartText() {
  return (
    <MotionContainer
      layout
      transition={layoutTransitions.springy}
    >
      <h1 {...props(styles.emptyTitle)}>No Distribus Here</h1>
      <p {...props(styles.emptyDescription)}>Get started by creating one</p>
    </MotionContainer>
  );
}

const styles = create({
  base: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    textAlign: 'center',
    padding: fixedSizes.m2,
  },
  emptyTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.text,
    letterSpacing: '-0.01em',
  },
  emptyDescription: {
    fontSize: fontSizes.l,
    color: colors.gray,
    marginBottom: fixedSizes.m2,
  },
});
