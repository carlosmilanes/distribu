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
import { motion, AnimatePresence } from 'motion/react';
import { create, props as style } from 'stylex';
import { MotionContainer } from '@/app/components/motion-container';
import { motionPresets } from '@/app/motion/presets';

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
      <AnimatePresence>
        {optionsRevealed && <OptionsModal options={options} />}
      </AnimatePresence>
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
function ContentLifter({ children, optionsRevealed }: ContentWrapperProps) {
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
function OptionsModal({
  options,
}: {
  options: OptionsProviderProps['options'];
}) {
  const { setOptionsRevealed } = useOptionsContext();

  return (
    <MotionContainer
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={motionPresets.springy}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        minWidth: '200px',
      }}
    >
      <div>
        {Array.isArray(options) ? (
          <OptionsList
            options={options}
            onOptionSelect={() => setOptionsRevealed(false)}
          />
        ) : options ? (
          <OptionsObject
            options={options}
            onOptionSelect={() => setOptionsRevealed(false)}
          />
        ) : (
          <div>No options available</div>
        )}
      </div>
    </MotionContainer>
  );
}

/**
 * Component to render array of options
 */
function OptionsList({
  options,
  onOptionSelect,
}: {
  options: OptionItem[];
  onOptionSelect: () => void;
}) {
  return (
    <div>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
        Options
      </h3>
      {options.map((option, index) => (
        <motion.button
          key={option.id || index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            option.onSelect?.();
            onOptionSelect();
          }}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px 12px',
            margin: '4px 0',
            background: 'none',
            border: '1px solid #e5e5e5',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {option.icon && (
            <span style={{ marginRight: '8px' }}>{option.icon}</span>
          )}
          {option.label}
        </motion.button>
      ))}
    </div>
  );
}

/**
 * Component to render options object
 */
function OptionsObject({
  options,
  onOptionSelect,
}: {
  options: OptionsObject;
  onOptionSelect: () => void;
}) {
  const { title = 'Options', items = [] } = options;

  return (
    <div>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
        {title}
      </h3>
      {items.map((item, index) => (
        <motion.button
          key={item.id || index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            item.onSelect?.();
            onOptionSelect();
          }}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px 12px',
            margin: '4px 0',
            background: 'none',
            border: '1px solid #e5e5e5',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}

// Type definitions
type OptionItem = {
  id?: string | number;
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
};

type OptionsObject = {
  title?: string;
  items: OptionItem[];
};

type OptionsProviderProps = {
  children: ReactNode;
  options?: OptionItem[] | OptionsObject;
};

type OptionsContextValue = {
  options: OptionsProviderProps['options'];
  optionsRevealed: boolean;
  setOptionsRevealed: (value: boolean) => void;
};

type ContentWrapperProps = {
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
});
