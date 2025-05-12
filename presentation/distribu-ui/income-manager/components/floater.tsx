import { motion, type PanInfo } from 'motion/react';
import { create, props as style } from 'stylex';
import {
  colors,
  borderRadius,
  dynamicSizes,
  fixedSizes,
} from '@/presentation/stylex/vars.stylex';
import { reactiveElevation } from '@/presentation/stylex/elevations.stylex';
import type { Medium } from '@/presentation/stylex/breakpoints.stylex';
import { glass } from '@/presentation/stylex/materials.stylex';

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
    bottom: fixedSizes.s4,
    left: '50%',
    translate: '-50%',

    // colors
    backgroundColor: colors.secondaryBackground,
    border: `1px solid ${colors.gray4}`,

    // dimensions
    width: {
      default: '90%',
      [MEDIUM]: dynamicSizes.xl2,
    },

    // spacing
    padding: `${fixedSizes.s2} ${fixedSizes.s3}`,

    // others
    borderRadius: borderRadius.xl,
    cursor: 'pointer',
  },
});
