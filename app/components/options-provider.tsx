/**
 * This file exports a wrapper component (OptionsProvider) meant for:
 * - wrapping any component that handles options
 * - receiving an options array as props
 * - providing context (options, optionsRevealed, setOptionsRevealed) consumable by any child component
 * - animating an 'options modal' with a lift and blur effect
 *
 * OPTIONS DEFINITION EXAMPLE:
 * const options = [
 *   {
 *     id: 'edit',
 *     label: 'Edit',
 *     onSelect: () => {
 *       console.log('Edit option selected');
 *     },
 *   },
 *   {
 *     id: 'delete',
 *     label: 'Delete',
 *     onSelect: () => {
 *       console.log('Delete option selected');
 *     },
 *   },
 * ];
 *
 * USAGE:
 * <OptionsProvider options={options}>
 *   <YourComponent />
 * </OptionsProvider>
 */

import { createContext, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { create, props as style } from 'stylex';
import { MotionContainer } from '@/app/components/motion-container';
import { motionPresets } from '@/app/motion/presets';
import { MotionModal } from './modals/motion-modal';
import { Button } from '@/app/components/core/button';
import {
  borderRadius,
  colors,
  dynamicSizes,
  fixedSizes,
} from '../styles/vars.stylex';
import { elevation } from '../styles/elevations.stylex';
import { glass } from '../styles/materials.stylex';
import type { PressEvent } from 'react-aria';

/**
 * Wrapper component providing options context and animations
 * When options are shown, the wrapped component is "lifted" and the background is blurred
 *
 * @param children - Content to be wrapped and animated
 * @param options - Array of option objects or configuration object for options
 * @returns JSX element with animated wrapper and context provider
 */
export function OptionsProvider({
  children,
  options = [],
}: OptionsProviderProps) {
  const [optionsRevealed, setOptionsRevealed] = useState(false);

  const context = {
    options,
    optionsRevealed,
    setOptionsRevealed,
  };

  return (
    <OptionsContext value={context}>
      <AnimatePresence>{optionsRevealed && <BackgroundBlur />}</AnimatePresence>
      <ContentLifter optionsRevealed={optionsRevealed}>
        {children}
      </ContentLifter>
      <AnimatePresence>{optionsRevealed && <OptionsModal />}</AnimatePresence>
    </OptionsContext>
  );
}

/**
 * Context for managing options visibility state and providing toggle functionality
 */
const OptionsContext = createContext<OptionsContextValue | undefined>(
  undefined
);

/**
 * Custom hook to access options context
 *
 * @returns Object containing options, options state and toggle function
 * @throws Error if used outside of OptionsProvider
 */
export function useOptionsContext(): OptionsContextValue {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error('useOptionsContext must be used within an OptionsProvider');
  }
  return context;
}

/**
 * Background blur overlay component with smooth fade animation
 */
function BackgroundBlur() {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      {...style(styles.blur)}
    />
  );
}

/**
 * Wrapper component that animates the main content with lift effect
 */
function ContentLifter({ children, optionsRevealed }: ContentLifterProps) {
  return (
    <MotionContainer
      animate={optionsRevealed ? 'lifted' : 'default'}
      variants={contentVariants}
      transition={motionPresets.springy}
      {...style(styles.lifter(optionsRevealed))}
    >
      {children}
    </MotionContainer>
  );
}

// Animation variants for the content lift effect
const contentVariants = {
  default: {
    scale: 1,
    y: 0,
    filter: 'brightness(1)',
  },
  lifted: {
    scale: 0.95,
    y: -10,
    filter: 'brightness(0.8)',
  },
};

/**
 * Options overlay component that displays the actual options
 */
function OptionsModal() {
  const { options, optionsRevealed, setOptionsRevealed } = useOptionsContext();

  return (
    <MotionModal
      isOpen={optionsRevealed}
      onOpenChange={setOptionsRevealed}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={motionPresets.springy}
      modalStyleProps={[glass.regular, elevation.high, styles.modal]}
      dialogStyleProps={styles.dialog}
    >
      {options.map((option) => (
        <OptionButton
          key={option.id}
          option={option}
        />
      ))}
    </MotionModal>
  );
}

function OptionButton({ option }: OptionButtonProps) {
  const { setOptionsRevealed } = useOptionsContext();

  function handleOnPress(e: PressEvent) {
    e.continuePropagation();
    option.onSelect?.();
    setOptionsRevealed(false);
  }

  return (
    <Button
      onPress={handleOnPress}
      styleProps={styles.optionButton}
    >
      {option.component()}
    </Button>
  );
}

// Type definitions
type Option = {
  id: string | number;
  component: () => ReactNode;
  onSelect?: () => void;
};

type OptionButtonProps = {
  option: Option;
};

type OptionsProviderProps = {
  children: ReactNode;
  options?: Option[];
};

type OptionsContextValue = {
  options: Option[];
  optionsRevealed: boolean;
  setOptionsRevealed: (value: boolean) => void;
};

type ContentLifterProps = {
  children: ReactNode;
  optionsRevealed: boolean;
};

// Styles
const styles = create({
  container: {
    position: 'relative',
  },
  blur: {
    position: 'fixed',
    inset: 0,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  },
  lifter: (optionsRevealed: boolean) => ({
    position: 'relative',
    zIndex: optionsRevealed ? 20 : 1,
  }),
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 30,
    padding: fixedSizes.s2,
    borderRadius: borderRadius.l,
    minWidth: fixedSizes.l3,
    transition: 'scale 0.2s ease-in-out',
    ':active': {
      scale: 0.98,
    },
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    gap: dynamicSizes.s2,
  },
  optionButton: {
    display: 'flex',
    justifyContent: 'start',
    padding: fixedSizes.s1,

    ':hover': {
      backgroundColor: colors.gray3,
    },

    ':active': {
      backgroundColor: colors.gray2,
    },
  },
});
