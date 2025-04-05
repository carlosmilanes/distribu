import { useState } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { motion, type PanInfo, useDragControls } from 'motion/react';
import { CloseButton } from '@/components/close-button';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../../../stylex/vars.stylex';

type ExpandableContainerProps = {
  colapsedManagerParts: React.ReactNode;
  expandedManagerParts: React.ReactNode;
};

export function ExpandableContainer({
  colapsedManagerParts,
  expandedManagerParts,
}: ExpandableContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <ExpandedModalContainer
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        {expandedManagerParts}
      </ExpandedModalContainer>
    );
  }

  return (
    <CompactContainer
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    >
      {colapsedManagerParts}
    </CompactContainer>
  );
}

type CompactContainerProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
};

function CompactContainer({
  isExpanded,
  setIsExpanded,
  children,
}: CompactContainerProps) {
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
      {...props(
        ExpandableContainerStyles.shared,
        ExpandableContainerStyles.floater
      )}
      aria-label='Open Income Manager'
    >
      {children}
    </motion.div>
  );
}

type ExpandedModalContainerProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
};

function ExpandedModalContainer({
  isExpanded,
  setIsExpanded,
  children,
}: ExpandedModalContainerProps) {
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
        {...props(
          ExpandableContainerStyles.shared,
          ExpandableContainerStyles.modal
        )}
      >
        <Dialog {...props(ExpandableContainerStyles.dialog)}>
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

type ModalDraggableHeaderProps = {
  dragControls: ReturnType<typeof useDragControls>;
  setIsExpanded: (expanded: boolean) => void;
};

function ModalDraggableHeader({
  dragControls,
  setIsExpanded,
}: ModalDraggableHeaderProps) {
  return (
    <motion.div
      onPointerDown={(e) => dragControls.start(e)}
      {...props(ExpandableContainerStyles.header)}
    >
      <Heading
        level={1}
        {...props(ExpandableContainerStyles.heading)}
      >
        Ingresos
      </Heading>
      <CloseButton
        {...props(ExpandableContainerStyles.closeButton)}
        onPress={() => setIsExpanded(false)}
      />
    </motion.div>
  );
}

const ExpandableContainerStyles = create({
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
  floater: {
    backgroundColor: `${colors.background}99`,
    height: '7rem',
    width: '21rem',
    bottom: '12px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    cursor: 'pointer',
    borderRadius: borderRadius.big,
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(4px)',
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '500ms, 200ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    ':active': {
      transform: 'scale(0.95)',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    '@media (min-width: 768px)': {
      width: '28rem',
    },
  },
  dialog: {
    outline: 'none',
  },
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
