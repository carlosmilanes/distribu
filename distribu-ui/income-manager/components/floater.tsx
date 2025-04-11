import { motion, type PanInfo } from 'motion/react';
import { create, props as style } from 'stylex';
import { colors, borderRadius, shadows } from '@/stylex/vars.stylex';
import { reactiveElevation } from '@/stylex/elevations.stylex';
import type { Medium } from '@/stylex/breakpoints.stylex';
import { glass } from '@/stylex/materials.stylex';

export function Floater({ isExpanded, setIsExpanded, children }: FloaterProps) {
  function handleDragUp(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y < -70) {
      setIsExpanded(true);
    }
  }

  return (
    <motion.div
      {...style(reactiveElevation.medium, styles.base, glass.regular)}
      layoutDependency={isExpanded}
      layoutId='income-manager-floater'
      onClick={() => setIsExpanded(true)}
      drag='y'
      dragTransition={{
        bounceStiffness: 90,
        bounceDamping: 8,
      }}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.3, bottom: 0 }}
      onDrag={handleDragUp}
      transition={{
        type: 'spring',
        duration: 0.5,
        bounce: 0.2,
        ease: 'easeOut',
      }}
      aria-label='Open Income Manager'
    >
      {children}
    </motion.div>
  );
}

type FloaterProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
};

const MEDIUM: Medium = '@media (min-width: 48rem)';

const styles = create({
  base: {
    // positioning
    position: 'fixed',
    bottom: '12px',
    left: '50%',
    translate: '-50%',

    // colors
    backgroundColor: colors.secondaryBackground,
    border: `1px solid ${colors.gray4}`,

    // dimensions
    height: '7rem',
    width: {
      default: '21rem',
      [MEDIUM]: '28rem',
    },

    // spacing
    padding: '2px 16px',

    // others
    borderRadius: borderRadius.big,
    cursor: 'pointer',
  },
});
