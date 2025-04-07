import { motion, type PanInfo } from 'motion/react';
import { create, props } from 'stylex';
import { colors, borderRadius } from '@/stylex/vars.stylex';
import { reactiveElevation } from '@/stylex/elevations.stylex';

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
      {...props(reactiveElevation.medium, styles.base)}
      layoutDependency={isExpanded}
      layoutId='morph'
      onClick={() => setIsExpanded(true)}
      drag='y'
      dragTransition={{
        bounceStiffness: 90,
        bounceDamping: 8,
      }}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.3, bottom: 0 }}
      onDrag={handleDragUp}
      aria-label='Expand Income Manager'
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

const styles = create({
  base: {
    // colors
    backgroundColor: colors.secondaryBackground,
    border: `1px solid ${colors.gray4}`,

    // dimensions
    height: '7rem',
    width: '21rem',
    '@media (min-width: 768px)': {
      width: '28rem',
    },

    // positioning
    position: 'fixed',
    bottom: '12px',
    left: 0,
    right: 0,

    // spacing
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',

    // others
    cursor: 'pointer',
    borderRadius: borderRadius.big,
    backdropFilter: 'blur(4px)',
  },
});
