import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { create } from 'stylex';
import { motionPresets } from '@/app/motion/presets';

/**
 * Context for managing options visibility state and providing toggle functionality
 */
const OptionsContext = createContext<OptionsContextValue | undefined>(
  undefined
);

/**
 * Custom hook to access options context with error checking
 *
 * @returns Object containing options state and toggle functions
 * @throws Error if used outside of OptionsProvider
 */
export function useOptions(): OptionsContextValue {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
}

/**
 * Provider component that wraps children with Apple-like lift and blur animations
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

  const showOptions = useCallback(() => {
    setOptionsRevealed(true);
  }, []);

  const hideOptions = useCallback(() => {
    setOptionsRevealed(false);
  }, []);

  const toggleOptions = useCallback(() => {
    setOptionsRevealed((prev) => !prev);
  }, []);

  const contextValue = useContextValue({
    optionsRevealed,
    showOptions,
    hideOptions,
    toggleOptions,
    options,
  });

  return (
    <OptionsContext.Provider value={contextValue}>
      <div className='options-provider-container'>
        <AnimatePresence>
          {optionsRevealed && <BackgroundBlur />}
        </AnimatePresence>

        <ContentWrapper optionsRevealed={optionsRevealed}>
          {children}
        </ContentWrapper>

        <AnimatePresence>
          {optionsRevealed && <OptionsOverlay options={options} />}
        </AnimatePresence>
      </div>
    </OptionsContext.Provider>
  );
}

/**
 * Demo component showing how to use OptionsProvider with array format
 *
 * @returns JSX element demonstrating OptionsProvider usage
 */
export function OptionsProviderDemo() {
  const arrayOptions: OptionItem[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: '✏️',
      onSelect: () => console.log('Edit selected'),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: '🗑️',
      onSelect: () => console.log('Delete selected'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: '📤',
      onSelect: () => console.log('Share selected'),
    },
  ];

  const objectOptions: OptionsObject = {
    title: 'Quick Actions',
    items: [
      {
        id: 'copy',
        label: 'Copy to clipboard',
        icon: '📋',
        onSelect: () => console.log('Copy selected'),
      },
      {
        id: 'download',
        label: 'Download',
        icon: '⬇️',
        onSelect: () => console.log('Download selected'),
      },
    ],
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
      <OptionsProvider options={arrayOptions}>
        <DemoCard
          title='Array Options'
          subtitle='Click to show options'
        />
      </OptionsProvider>

      <OptionsProvider options={objectOptions}>
        <DemoCard
          title='Object Options'
          subtitle='Custom title and actions'
        />
      </OptionsProvider>
    </div>
  );
}

/**
 * Demo card component that uses the options context
 */
function DemoCard({ title, subtitle }: { title: string; subtitle: string }) {
  const { toggleOptions, optionsRevealed } = useOptions();

  return (
    <motion.div
      onClick={toggleOptions}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        cursor: 'pointer',
        minWidth: '200px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
      <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>{subtitle}</p>
      <p style={{ margin: '12px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
        {optionsRevealed ? 'Options visible' : 'Click to show options'}
      </p>
    </motion.div>
  );
}

/**
 * Custom hook to memoize context value to prevent unnecessary re-renders
 */
function useContextValue({
  optionsRevealed,
  showOptions,
  hideOptions,
  toggleOptions,
  options,
}: {
  optionsRevealed: boolean;
  showOptions: () => void;
  hideOptions: () => void;
  toggleOptions: () => void;
  options: OptionsProviderProps['options'];
}): OptionsContextValue {
  return useCallback(
    () => ({
        optionsRevealed,
      showOptions,
      hideOptions,
      toggleOptions,
      options,
    }),
    [optionsRevealed, showOptions, hideOptions, toggleOptions, options]
  )();
}

/**
 * Background blur overlay component with smooth fade animation
 */
function BackgroundBlur() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 10,
      }}
      onClick={() => {
        // Allow clicking backdrop to close options
        const context = useContext(OptionsContext);
        context?.hideOptions();
      }}
    />
  );
}

/**
 * Wrapper component that animates the main content with lift effect
 */
function ContentWrapper({ children, optionsRevealed }: ContentWrapperProps) {
  return (
    <motion.div
      animate={optionsRevealed ? 'lifted' : 'default'}
      variants={contentVariants}
      transition={motionPresets.springy}
      style={{ position: 'relative', zIndex: optionsRevealed ? 20 : 1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Options overlay component that displays the actual options
 */
function OptionsOverlay({
  options,
}: {
  options: OptionsProviderProps['options'];
}) {
  const { hideOptions } = useOptions();

  return (
    <motion.div
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
            onOptionSelect={hideOptions}
          />
        ) : options ? (
          <OptionsObject
            options={options}
            onOptionSelect={hideOptions}
          />
        ) : (
          <div>No options available</div>
        )}
      </div>
    </motion.div>
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
  optionsRevealed: boolean;
  showOptions: () => void;
  hideOptions: () => void;
  toggleOptions: () => void;
  options: OptionsProviderProps['options'];
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
});
