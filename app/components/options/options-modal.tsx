import { useOptionsContext } from './options-provider';
import { MotionModal } from '../modals/motion-modal';
import { motionPresets } from '../../motion/presets';
import { glass } from '../../styles/materials.stylex';
import { create } from 'stylex';
import {
  dynamicSizes,
  fixedSizes,
  borderRadius,
} from '@/app/styles/vars.stylex';
import type { ReactNode } from 'react';

/**
 * Options overlay component that displays the actual options
 */
export function OptionsModal({ children }: OptionsModalProps) {
  const {
    isContentInScreenUpperHalf,
    contentOffset,
    optionsRevealed,
    setOptionsRevealed,
  } = useOptionsContext();

  const variants = {
    appearAbove: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    appearBelow: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <MotionModal
      isOpen={optionsRevealed}
      onOpenChange={setOptionsRevealed}
      initial={isContentInScreenUpperHalf ? 'appearAbove' : 'appearBelow'}
      animate="visible"
      exit={isContentInScreenUpperHalf ? 'appearAbove' : 'appearBelow'}
      variants={variants}
      transition={motionPresets.springy}
      modalStyleProps={[glass.regular, styles.modal]}
      style={{
        position: 'fixed',
        top:
          isContentInScreenUpperHalf && contentOffset
            ? contentOffset.bottom
            : undefined,
        bottom:
          !isContentInScreenUpperHalf && contentOffset
            ? contentOffset.top
            : undefined,
        right: contentOffset ? contentOffset.right : undefined,
      }}
      dialogStyleProps={styles.dialog}
    >
      {children}
    </MotionModal>
  );
}

export type OptionsModalProps = {
  children: ReactNode;
};

const styles = create({
  modal: {
    zIndex: 30,
    padding: fixedSizes.s2,
    borderRadius: borderRadius.xl,
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
});
