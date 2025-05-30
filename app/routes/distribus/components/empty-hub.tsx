import { PrimaryButton } from '@/app/components/buttons/primary-button';
import {
  colors,
  fixedSizes,
  fontSizes,
  fontWeights,
  shadows,
} from '@/app/styles/vars.stylex';
import { borderRadius } from '@/app/styles/vars.stylex';
import { create, props, keyframes } from 'stylex';

/**
 * EmptyHub displays a full-page empty state when no distribus exist.
 * Prompts the user to create their first distribu with a prominent button.
 *
 * @returns Full viewport empty state UI with create button
 */
export function EmptyHub() {
  return (
    <main
      {...props(styles.base)}
      aria-label='No distribus'
    >
      <h1 {...props(styles.emptyTitle)}>No Distribus Here</h1>
      <p {...props(styles.emptyDescription)}>Get started by creating one</p>
      <CreateDistribuButtonLarge />
    </main>
  );
}

/**
 * Large, prominent button for creating the first distribu in the empty state.
 * Features animated moving lights background using income-related colors.
 *
 * @returns Button element with animated background
 */
function CreateDistribuButtonLarge() {
  const handleCreateClick = () => {
    // TODO: Implement create distribu modal/form
  };
  return (
    <div {...props(styles.buttonContainer)}>
      <div {...props(styles.orangeDot)} />
      <div {...props(styles.redDot)} />
      <PrimaryButton
        styling={styles.button}
        onPress={handleCreateClick}
        aria-label='Create your first distribu'
      >
        Create Distribu
      </PrimaryButton>
    </div>
  );
}

// Define the keyframes animations for each dot
const orangeDotAnimation = keyframes({
  '0%': {
    transform: 'translate(-40%, 20%) scale(0.8)',
  },
  '25%': {
    transform: 'translate(300%, -20%) scale(1.2)',
  },
  '50%': {
    transform: 'translate(160%, 120%) scale(0.6)',
  },
  '75%': {
    transform: 'translate(-30%, 130%) scale(1.1)',
  },
  '100%': {
    transform: 'translate(-40%, 20%) scale(0.8)',
  },
});

const redDotAnimation = keyframes({
  '0%': {
    transform: 'translate(140%, -10%) scale(1.0)',
  },
  '25%': {
    transform: 'translate(-50%, -30%) scale(0.7)',
  },
  '50%': {
    transform: 'translate(-60%, 110%) scale(1.3)',
  },
  '75%': {
    transform: 'translate(170%, 140%) scale(0.9)',
  },
  '100%': {
    transform: 'translate(140%, -10%) scale(1.0)',
  },
});

// Styles
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
  button: {
    color: colors.income,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    outline: 'none',
    fontSize: fontSizes.xl,
    position: 'relative',
    zIndex: 2,
    borderRadius: borderRadius.m,
    border: `1px solid ${colors.income}`,
  },
  buttonContainer: {
    position: 'relative',
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    boxShadow: shadows.m,
  },
  orangeDot: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: colors.assignedIncome,
    filter: 'blur(20px)',
    animationName: orangeDotAnimation,
    animationDuration: '6s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    opacity: 0.7,
  },
  redDot: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: colors.usedIncome,
    filter: 'blur(15px)',
    animationName: redDotAnimation,
    animationDuration: '8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    opacity: 0.6,
  },
});
