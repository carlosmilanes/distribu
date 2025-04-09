import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { motion, type PanInfo, useDragControls } from 'motion/react';
import { create, props as style } from 'stylex';
import { colors, borderRadius } from '@/stylex/vars.stylex';
import { CloseButton } from '@/components/close-button';
import { PrimaryText } from '@/components/text/primary-text';

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
        {...style(styles.modal)}
        layoutDependency={isExpanded}
        layoutId='income-manager-floater'
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
        <Dialog {...style(styles.dialog)}>
          <DraggableHeader
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

function DraggableHeader({
  dragControls,
  setIsExpanded,
}: DraggableHeaderProps) {
  return (
    <motion.div
      {...style(styles.header)}
      onPointerDown={(e) => dragControls.start(e)}
    >
      <Heading level={1}>
        <PrimaryText>Ingresos</PrimaryText>
      </Heading>

      <CloseButton onPress={() => setIsExpanded(false)} />
    </motion.div>
  );
}

type ExpandedFloaterProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
};

type DraggableHeaderProps = {
  dragControls: ReturnType<typeof useDragControls>;
  setIsExpanded: (expanded: boolean) => void;
};

const styles = create({
  modal: {
    // positioning
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,

    // dimensions
    height: '95%',
    width: '100%',

    // colors
    backgroundColor: colors.background,

    // border
    border: `1px solid ${colors.gray4}`,
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
  },
  dialog: {
    outline: 'none',
  },
  header: {
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
    padding: '4px 12px',
  },
});
