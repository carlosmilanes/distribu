import {
  Modal as AriaModal,
  ModalOverlay,
  Dialog,
  Heading,
} from 'react-aria-components';
import { create, props as style, type StyleXStyles } from 'stylex';
import { colors, borderRadius, dynamicSizes } from '@/app/styles/vars.stylex';
import { CloseButton } from '../buttons/close-button';
import { elevation } from '@/app/styles/elevations.stylex';

// TODO: provide for Motion animations or just 'morphing' animations from 'trigger' for that matter

export function Modal({
  heading,
  withCloseButton,
  children,
  modalStyleProps,
  dialogStyleProps,
  overlayStyleProps,
  isOpen,
  onOpenChange,
  ...otherProps
}: ModalProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      {...style(overlayStyleProps)}
    >
      <AriaModal
        {...style(elevation.high, styles.modal, modalStyleProps)}
        {...otherProps}
      >
        <Dialog {...style(dialogStyleProps)}>
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
  modalStyleProps?: StyleXStyles;
  dialogStyleProps?: StyleXStyles;
  overlayStyleProps?: StyleXStyles;
};

// Styles
const styles = create({
  modal: {
    position: 'relative',
    borderRadius: borderRadius.l,
  },
});
