import { borderRadius } from '@/app/styles/vars.stylex';
import { colors } from '@/app/styles/vars.stylex';
import { Modal } from '@/app/components/core/modal';
import { create } from 'stylex';

export function CenteredModal({
  children,
  isOpen,
  onOpenChange,
}: CenteredModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      overlayStyleProps={styles.overlay}
    >
      {children}
    </Modal>
  );
}

type CenteredModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const styles = create({
  modal: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.l,
    // border: `1px solid ${colors.gray4}`,
    outline: 'none',
    maxHeight: '90vh',
    maxWidth: '90vw',
    overflow: 'auto',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
});
