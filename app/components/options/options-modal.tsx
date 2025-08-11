import { useOptionsContext } from './options-provider';
import { MotionModal } from '../modals/motion-modal';
import { motionPresets } from '../../motion/presets';
import { glass } from '../../styles/materials.stylex';
import { elevation } from '../../styles/elevations.stylex';
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
  const { optionsRevealed, setOptionsRevealed } = useOptionsContext();

  return (
    <MotionModal
      isOpen={optionsRevealed}
      onOpenChange={setOptionsRevealed}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={motionPresets.springy}
      modalStyleProps={[glass.regular, elevation.high, styles.modal]}
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
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 30,
    padding: fixedSizes.s2,
    borderRadius: borderRadius.l,
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
