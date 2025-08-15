/**
 * This file exports a wrapper component (OptionsProvider) meant for:
 * - wrapping any component that handles options
 * - receiving options modal component as props
 * - providing context (options, optionsRevealed, setOptionsRevealed) consumable by any child component
 * - animating an 'options modal' with a lift and blur effect
 */

import {
  createContext,
  useContext,
  useState,
  useRef,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from 'react';
import { AnimatePresence } from 'motion/react';
import { create, props as style } from 'stylex';
import { MotionContainer } from '@/app/components/motion-container';
import { motionPresets } from '@/app/motion/presets';
import { useIsElementInScreenUpperHalf } from '@/app/hooks/use-is-element-in-screen-upper-half';
import {
  useElementOffsets,
  type Offset,
} from '@/app/hooks/event-listeners/use-element-offsets';

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
  OptionsModal,
}: OptionsProviderProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isContentInScreenUpperHalf = useIsElementInScreenUpperHalf(contentRef);
  const contentOffset = useElementOffsets(contentRef);
  const [optionsRevealed, setOptionsRevealed] = useState(false);

  const context = {
    contentRef,
    contentOffset,
    isContentInScreenUpperHalf,
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
  const { isContentInScreenUpperHalf } = useOptionsContext();

  function setLiftVariant() {
    if (isContentInScreenUpperHalf) {
      return 'liftedUp';
    } else {
      return 'liftedDown';
    }
  }

  return (
    <MotionContainer
      animate={optionsRevealed ? setLiftVariant() : 'default'}
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
  liftedUp: {
    scale: 0.95,
    y: -10,
    filter: 'brightness(0.8)',
  },
  liftedDown: {
    scale: 0.95,
    y: 10,
    filter: 'brightness(0.8)',
  },
};

// Type definitions
type OptionsProviderProps = {
  children: ReactNode;
  OptionsModal: ComponentType;
};

type OptionsContextValue = {
  contentRef: RefObject<HTMLDivElement | null>;
  isContentInScreenUpperHalf: boolean;
  contentOffset: Offset | null;
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
  optionButton: {},
});
