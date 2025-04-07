import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { motion, type PanInfo, useDragControls } from 'motion/react';
import { create, props } from 'stylex';
import { colors, borderRadius } from '@/stylex/vars.stylex';
import { CloseButton } from '@/components/close-button';

type ExpandedFloaterProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
};

type ModalDraggableHeaderProps = {
  dragControls: ReturnType<typeof useDragControls>;
  setIsExpanded: (expanded: boolean) => void;
};

export function ExpandedFloater({
  isExpanded,
  setIsExpanded,
  children,
}: ExpandedFloaterProps) {
  const dragControls = useDragControls();

  function handleDragDown(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y > 70) {
      setIsExpanded(false);
    }
  }

  return (
    <ModalOverlay
      isDismissable
      isOpen={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <MotionModal
        {...props(
          ExpandedModalContainerStyles.shared,
          ExpandedModalContainerStyles.modal
        )}
        layoutDependency={isExpanded}
        layoutId='morph'
        drag='y'
        dragListener={false}
        dragControls={dragControls}
        dragTransition={{
          bounceStiffness: 90,
          bounceDamping: 8,
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.3 }}
        onDrag={handleDragDown}
        transition={{
          type: 'spring',
          duration: 0.6,
          bounce: 0.2,
          ease: 'easeIn',
        }}
      >
        <Dialog {...props(ExpandedModalContainerStyles.dialog)}>
          <ModalDraggableHeader
            dragControls={dragControls}
            setIsExpanded={setIsExpanded}
          />
          {children}
        </Dialog>
      </MotionModal>
    </ModalOverlay>
  );
}

const MotionModal = motion.create(Modal);

function ModalDraggableHeader({
  dragControls,
  setIsExpanded,
}: ModalDraggableHeaderProps) {
  return (
    <motion.div
      {...props(ModalDraggableHeaderStyles.header)}
      onPointerDown={(e) => dragControls.start(e)}
    >
      <Heading
        {...props(ModalDraggableHeaderStyles.heading)}
        level={1}
      >
        Ingresos
      </Heading>
      <CloseButton
        {...props(ModalDraggableHeaderStyles.closeButton)}
        onPress={() => setIsExpanded(false)}
      />
    </motion.div>
  );
}

const ExpandedModalContainerStyles = create({
  shared: {
    border: `1px solid ${colors.gray4}80`,
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  modal: {
    backgroundColor: colors.background,
    height: '95%',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
    '@media (min-width: 768px)': {
      height: '47rem',
    },
  },
  dialog: {
    outline: 'none',
  },
});

const ModalDraggableHeaderStyles = create({
  header: {
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
    paddingTop: '4px',
    paddingLeft: '12px',
  },
  heading: {
    fontSize: '36px',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
  },
});
