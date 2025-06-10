import { PlusIcon } from '@heroicons/react/24/outline';
import { colors, dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';
import { borderRadius } from '@/app/styles/vars.stylex';
import { create, props, keyframes } from 'stylex';
import { elevation, reactiveElevation } from '@/app/styles/elevations.stylex';
import { useState } from 'react';
import { DistribuCreationForm } from './distribu-creation-form';
import { useDismiss } from '@/app/hooks/event-listeners/use-dismiss';
import { MotionButton } from '@/app/components/buttons/motion-button';
import { MotionContainer } from '@/app/components/motion-container';
import { layoutTransitions } from '@/app/motion/presets';

/**
 * Large, prominent button for creating a new distribu with fancy animations.
 * Features animated moving lights background using income-related colors.
 * Wraps the simple DistribuCreationButton with decorative effects.
 *
 * @returns Enhanced button element with animated background
 */
export function StartButton() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      {isPressed ? (
        <CreationForm onDismiss={() => setIsPressed(false)} />
      ) : (
        <CreationButton onPress={() => setIsPressed(true)} />
      )}
    </>
  );
}

function CreationButton({ onPress }: { onPress: () => void }) {
  return (
    <MotionButton
      layoutId='start'
      styling={[reactiveElevation.low, styles.button]}
      onPress={onPress}
      transition={layoutTransitions.springy}
    >
      <DancingLights />
      <ButtonContent />
    </MotionButton>
  );
}

function ButtonContent() {
  return (
    <div {...props(styles.buttonContent)}>
      <PlusIcon {...props(styles.plusIcon)} />
      Create Distribu
    </div>
  );
}

function CreationForm({ onDismiss }: CreationFormProps) {
  const ref = useDismiss<HTMLDivElement>(onDismiss);

  return (
    <MotionContainer
      {...props(elevation.medium, styles.formContainer)}
      layoutId='start'
      ref={ref}
      transition={layoutTransitions.springy}
    >
      <DancingLights />
      <DistribuCreationForm styling={styles.form} />
    </MotionContainer>
  );
}

function DancingLights() {
  return (
    <div {...props(styles.lightsContainer)}>
      <div {...props(styles.redLight)} />
      <div {...props(styles.orangeLight)} />
      <div {...props(styles.greenLight)} />
    </div>
  );
}

type CreationFormProps = {
  onDismiss: () => void;
};

// Define the keyframes animations for each light
const redLightAnimation = keyframes({
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

const orangeLightAnimation = keyframes({
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

const greenLightAnimation = keyframes({
  '0%': {
    transform: 'translate(-20%, -40%) scale(0.9)',
  },
  '25%': {
    transform: 'translate(-40%, 10%) scale(1.1)',
  },
  '50%': {
    transform: 'translate(-10%, 30%) scale(0.8)',
  },
  '75%': {
    transform: 'translate(-30%, -10%) scale(1.0)',
  },
  '100%': {
    transform: 'translate(-20%, -40%) scale(0.9)',
  },
});

// Styles
const shared = {
  backgroundColor: colors.secondaryBackground,
  border: `0.5px solid ${colors.glassyBorder}`,
  borderRadius: borderRadius.l,
  padding: `${dynamicSizes.m1} ${dynamicSizes.m3}`,
};

const styles = create({
  button: {
    backgroundColor: shared.backgroundColor,
    color: colors.income,
    fontSize: fontSizes.xl,
    borderRadius: shared.borderRadius,
    padding: shared.padding,
    border: shared.border,
    ':focus': {
      outline: `1px solid ${colors.income}`,
    },
    ':active': {
      outline: 'none',
    },
  },

  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: dynamicSizes.s1,
    zIndex: 2,
  },

  plusIcon: {
    width: fontSizes.xxl,
    height: fontSizes.xxl,
  },

  formContainer: {
    position: 'relative',
    backgroundColor: shared.backgroundColor,
    border: shared.border,
    borderRadius: shared.borderRadius,
    padding: shared.padding,
  },

  form: {
    position: 'relative',
    zIndex: 2,
  },

  // Dancing lights
  lightsContainer: {
    border: 'inherit',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    overflow: 'hidden',
  },
  orangeLight: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: colors.assignedIncome,
    filter: 'blur(20px)',
    animationName: orangeLightAnimation,
    animationDuration: '6s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    opacity: 0.5,
    zIndex: 1,
  },
  redLight: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: colors.usedIncome,
    filter: 'blur(15px)',
    animationName: redLightAnimation,
    animationDuration: '8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    opacity: 0.4,
    zIndex: 1,
  },
  greenLight: {
    position: 'absolute',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: colors.income,
    filter: 'blur(18px)',
    animationName: greenLightAnimation,
    animationDuration: '7s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    opacity: 0.2,
    right: -20,
    top: 10,
    zIndex: 1,
  },
});
