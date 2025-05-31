import {
  Modal as AriaModal,
  ModalOverlay,
  Dialog,
  Heading,
} from 'react-aria-components';
import { create, props, type StyleXStyles } from 'stylex';
import { colors, borderRadius, dynamicSizes } from '@/app/styles/vars.stylex';
import { CloseButton } from '../buttons/close-button';
import { elevation } from '@/app/styles/elevations.stylex';

// TODO: provide for Motion animations or just 'morphing' animations from 'trigger' for that matter

export function Modal({
  heading,
  withCloseButton,
  children,
  styling,
  overlayStyling,
  isOpen,
  onOpenChange,
  ...otherProps
}: ModalProps) {
  return (
    <ModalOverlay
      {...props(styles.overlay, overlayStyling)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
    >
      <AriaModal
        {...props(elevation.high, styles.modal, styling)}
        {...otherProps}
      >
        <Dialog {...props(styles.dialog)}>
          {({ close }) => (
            <>
              {heading && <Heading>{heading}</Heading>}
              {withCloseButton && <CloseButton onPress={close} />}
              {children}
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

type ModalProps = {
  heading?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  withCloseButton?: boolean;
  children: React.ReactNode;
  styling?: StyleXStyles;
  overlayStyling?: StyleXStyles;
};

// Styles
const styles = create({
  modal: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.l,
    border: `1px solid ${colors.gray4}`,
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
  dialog: {
    position: 'relative',
    margin: dynamicSizes.m1,
  },
});
