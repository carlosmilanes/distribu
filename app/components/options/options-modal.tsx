import type { ReactNode } from 'react';
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

/**
 * Options modal component that displays the actual options
 * This component is passed as a prop to OptionsProvider and should wrap individual option components
 * (EditOption, DeleteOption, OptionsSeparator, etc.)
 *
 * Blocks interaction with other screen elements while displayed and handles positioning
 * based on screen location with animated entrance/exit
 *
 * @param children - Individual option components to display in the modal
 * @returns Positioned and animated modal containing the options
 */
export function OptionsModal({ children }: OptionsModalProps) {
  const {
    isContentInScreenUpperHalf,
    contentOffset,
    optionsRevealed,
    setOptionsRevealed,
  } = useOptionsContext();

  return (
    <MotionModal
      isOpen={optionsRevealed}
      onOpenChange={setOptionsRevealed}
      variants={animationVariants}
      initial={isContentInScreenUpperHalf ? 'fadeInUp' : 'fadeInDown'}
      animate="visible"
      transition={motionPresets.springy}
      modalStyleProps={[glass.regular, styles.modal]}
      dialogStyleProps={styles.dialog}
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
    >
      {children}
    </MotionModal>
  );
}

const animationVariants = {
  fadeInUp: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  fadeInDown: {
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
