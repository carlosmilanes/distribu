import { useEffect, useState, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import { create, props as style } from 'stylex';
import { motion } from 'motion/react';
import { useMorph } from '@/app/motion/use-morph';
import {
  colors,
  dynamicSizes,
  fontSizes,
  fontWeights,
  zIndices,
} from '@/app/styles/vars.stylex';

/**
Takes over the whole page and shows one of two variants of a component at a time.
Space toggles between them with a morph, and the current variant's name is shown above it.

Temporary prototyping tool: render it anywhere, on any route, and remove it once a direction is chosen.
Each variant owns its state and props. Switching remounts the variant, so it restarts from its
initial values. To compare a state, set the same `useState` initial values in both variants.
Client-only: it portals to `document.body`, so don't render it during SSR.
*/
export function CompareVariants({ A, B }: CompareVariantsProps) {
  const activeKey = useActiveVariantKey();
  const morph = useMorph();

  const Variant = activeKey === 'A' ? A : B;

  return createPortal(
    <div {...style(styles.overlay)}>
      <div {...style(styles.column)}>
        <motion.div
          layout="position"
          transition={morph.transition}
          {...style(styles.label)}
        >
          {Variant.name}
        </motion.div>
        <motion.div key={activeKey} {...morph}>
          <Variant />
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}

/**
Tracks which variant is shown and flips it when Space is pressed.
Ignores Space while typing in a field, so variants stay usable.
*/
function useActiveVariantKey(): VariantKey {
  const [activeKey, setActiveKey] = useState<VariantKey>('A');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isToggleKey(e)) return;

      e.preventDefault();
      if (e.repeat) return;
      setActiveKey((key) => (key === 'A' ? 'B' : 'A'));
    }

    // Space activates a focused button on keyup, so cancel that too
    function handleKeyUp(e: KeyboardEvent) {
      if (isToggleKey(e)) e.preventDefault();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return activeKey;
}

/**
Tells whether a keyboard event is Space pressed outside an editable element.
*/
function isToggleKey(e: KeyboardEvent): boolean {
  return e.code === 'Space' && !isTypingTarget(e.target);
}

/**
Tells whether a keyboard event came from an editable element.
*/
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  );
}

type VariantKey = 'A' | 'B';

type CompareVariantsProps = {
  /** First variant, shown on load */
  A: ComponentType;
  B: ComponentType;
};

const styles = create({
  overlay: {
    // box
    backgroundColor: colors.background,
    overflow: 'auto',

    // layout
    display: 'grid',
    placeItems: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: zIndices.top,
  },

  // Keeps the label a fixed distance above the variant, whatever its size
  column: {
    // layout
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: dynamicSizes.m1,
  },

  label: {
    // content
    color: colors.text,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
});
