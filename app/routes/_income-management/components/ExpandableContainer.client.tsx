import { useState } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { motion, type PanInfo, useDragControls } from 'motion/react';
import { CloseButton } from '@/components/CloseButton';

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
      className={`${twClasses.shared} ${twClasses.floater}`}
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
        className={`${twClasses.shared} ${twClasses.modal}`}
      >
        <Dialog className='outline-none'>
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
      className='rounded-t-3xl py-1 pl-3'
    >
      <Heading
        level={1}
        className='text-4xl'
      >
        Ingresos
      </Heading>
      <CloseButton
        className='absolute top-3 right-3'
        onPress={() => setIsExpanded(false)}
      />
    </motion.div>
  );
}

const twClasses = {
  shared: 'border-gray4/50 fixed left-1/2 -translate-x-1/2 border',
  modal: 'bg-background h-[95%] bottom-0 w-full rounded-t-3xl md:h-[47rem]',
  floater:
    'bg-background/60 h-[7rem] w-[21rem] bottom-3 px-4 py-2 cursor-pointer rounded-3xl shadow-lg backdrop-blur-sm transition-[scale] duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:duration-200 active:scale-95 active:shadow-lg md:w-[28rem]',
};
