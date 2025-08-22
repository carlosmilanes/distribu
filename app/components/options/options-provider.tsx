/**
 * This file exports a wrapper component (OptionsProvider) that standardizes the way options are displayed throughout the app. This component:
 * - is meant for wrapping content that handles options
 * - shows or hides the component received as the `OptionsModal` prop based on the `optionsRevealed` state variable
 * - animates the wrapped content with a lift effect and the background with a blur effect when options are shown
 * - provides context for managing options state, content positioning, and screen position detection
 * - tracks element offsets and screen positioning to properly place the options modal
 * - handles z-index layering to ensure proper stacking order during animations
 *
 * USAGE PATTERN:
 * This component must be used together with OptionsModal. Individual option components 
 * (delete-option, edit-option, options-separator, etc.) should be wrapped inside OptionsModal.
 *
 * Example:
 * <OptionsProvider OptionsModal={MyOptionsModal}>
 *   <ContentWithOptions />
 * </OptionsProvider>
 *
 * function MyOptionsModal() {
 *   return (
 *     <OptionsModal>
 *       <EditOption onSelect={() => {}} />
 *       <OptionsSeparator />
 *       <DeleteOption onSelect={() => {}} />
 *     </OptionsModal>
 *   );
 * }
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
} from '@/app/hooks/use-element-offsets';

/**
 * Wrapper component providing options context and animations
 * When options are shown, the wrapped component is "lifted" and the background is blurred
 *
 * @param children - Content to be wrapped and animated
 * @param OptionsModal - Component to render as the options modal when revealed
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
 * Context for managing options visibility state, content positioning, and screen detection
 * Provides access to content refs, offsets, screen position, and options reveal state
 */
const OptionsContext = createContext<OptionsContextValue | undefined>(
  undefined
);

/**
 * Custom hook to access options context
 *
 * @returns Object containing content ref, offsets, screen position, options state and toggle function
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
 * Applies different lift directions based on screen position (up/down) and adjusts z-index
 *
 * @param children - Content to be animated
 * @param optionsRevealed - Whether options are currently revealed
 * @returns Animated container with lift effect
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
