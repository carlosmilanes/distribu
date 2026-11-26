import { PlusIcon } from '@heroicons/react/24/outline';
import {
  borderRadius,
  colors,
  dynamicSizes,
  fontSizes,
} from '@/app/styles/vars.stylex';
import { create, props as style, keyframes } from 'stylex';
import { elevation, reactiveElevation } from '@/app/styles/elevations.stylex';
import { useState } from 'react';
import { DistribuCreationForm } from './distribu-creation-form';
import { useDismiss } from '@/app/hooks/event-listeners/use-dismiss';
import { MotionButton } from '@/app/components/buttons/motion-button';
import { MotionContainer } from '@/app/components/motion-container';
import { useMorph, type MorphProps } from '@/app/motion/use-morph';

/**
Large, prominent button for creating a new distribu.
Morphs into the creation form when pressed, and back when dismissed.
Both states share the animated "dancing lights" background and the morph props from `useMorph`.
*/
export function StartButton() {
  const { isPressed, handlePress, handleDismiss } = useStartButton();
  const morph = useMorph();

  return isPressed ? (
    <CreationForm {...morph} dismissHandler={handleDismiss} />
  ) : (
    <CreationButton {...morph} pressHandler={handlePress} />
  );
}

/**
Tracks whether the creation form is open.
Returns the state plus handlers to open and close it.
*/
function useStartButton() {
  const [isPressed, setIsPressed] = useState(false);

  return {
    isPressed,
    handlePress: () => setIsPressed(true),
    handleDismiss: () => setIsPressed(false),
  };
}

/**
Button state: the "Create Distribu" button over the dancing lights.
Forwards the morph props, so it and the form morph into each other.
*/
function CreationButton({ pressHandler, ...morph }: CreationButtonProps) {
  return (
    <MotionButton
      {...morph}
      styleProps={[reactiveElevation.low, styles.sharedContainer, styles.button]}
      onPress={pressHandler}
    >
      <DancingLights />
      <ButtonContent />
    </MotionButton>
  );
}

/**
Decorative background of three blurred, drifting colored lights.
Must sit inside a positioned parent, which it fills and clips.
*/
function DancingLights() {
  return (
    <div aria-hidden {...style(styles.lightsContainer)}>
      <div {...style(styles.light, styles.redLight)} />
      <div {...style(styles.light, styles.orangeLight)} />
      <div {...style(styles.light, styles.greenLight)} />
    </div>
  );
}

/**
Plus icon and label of the creation button.
*/
function ButtonContent() {
  return (
    <div {...style(styles.buttonContent)}>
      <PlusIcon aria-hidden {...style(styles.plusIcon)} />
      Create Distribu
    </div>
  );
}

/**
Form state: the distribu creation form over the dancing lights.
Forwards the morph props, so it and the button morph into each other.
Closes on outside press or Escape.
*/
function CreationForm({ dismissHandler, ...morph }: CreationFormProps) {
  const ref = useDismiss<HTMLDivElement>(dismissHandler);

  return (
    <MotionContainer
      {...morph}
      ref={ref}
      {...style(elevation.medium, styles.sharedContainer)}
    >
      <DancingLights />
      <DistribuCreationForm styleProps={styles.form} />
    </MotionContainer>
  );
}

type CreationButtonProps = MorphProps & {
  /** Fires when the button is pressed, to open the form */
  pressHandler: () => void;
};

type CreationFormProps = MorphProps & {
  /** Fires on outside press or Escape, to close the form */
  dismissHandler: () => void;
};

// Light paths. Percentages are relative to each light's own size.
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

const styles = create({
  // container shared by the button and the form, so they morph into each other
  sharedContainer: {
    // box
    backgroundColor: colors.secondaryBackground,
    paddingBlock: dynamicSizes.m1,
    paddingInline: dynamicSizes.m3,
    borderRadius: borderRadius.l,

    // layout
    // positioned so the absolutely placed lights are anchored to the box
    position: 'relative',
  },

  button: {
    // content
    color: colors.income,
    fontSize: fontSizes.xl,

    // box
    outlineStyle: {
      default: 'none',
      ':focus': 'solid',
      ':active': 'none',
    },
    outlineWidth: '1px',
    outlineColor: colors.income,
  },

  buttonContent: {
    // layout
    display: 'flex',
    alignItems: 'center',
    gap: dynamicSizes.s1,
    position: 'relative',
    zIndex: 2,
  },

  plusIcon: {
    // size
    width: fontSizes.xxl,
    height: fontSizes.xxl,
  },

  form: {
    // layout
    position: 'relative',
    zIndex: 2,
  },

  lightsContainer: {
    // box
    borderRadius: 'inherit',
    overflow: 'hidden',

    // layout
    position: 'absolute',
    inset: 0,
  },

  // shared by all lights; color, size, blur and path are set per light
  light: {
    // box
    borderRadius: '50%',

    // layout
    position: 'absolute',
    zIndex: 1,

    // effects
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },

  // light sizes and blur are decorative, so they are hardcoded
  redLight: {
    // size
    width: '60px',
    height: '60px',

    // box
    backgroundColor: colors.usedIncome,

    // effects
    opacity: 0.25,
    animationName: redLightAnimation,
    animationDuration: '8s',
    filter: 'blur(15px)',
  },

  orangeLight: {
    // size
    width: '80px',
    height: '80px',

    // box
    backgroundColor: colors.assignedIncome,

    // effects
    opacity: 0.3,
    animationName: orangeLightAnimation,
    animationDuration: '6s',
    filter: 'blur(20px)',
  },

  greenLight: {
    // size
    width: '70px',
    height: '70px',

    // box
    backgroundColor: colors.income,

    // layout
    top: 10,
    right: -20,

    // effects
    opacity: 0.12,
    animationName: greenLightAnimation,
    animationDuration: '7s',
    filter: 'blur(18px)',
  },
});
