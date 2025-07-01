import { Button, type ButtonProps } from '@/app/components/core/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { create } from 'stylex';
import { Modal } from '@/app/components/core/modal';
import { useState } from 'react';
import { DistribuCreationForm } from './distribu-creation-form';

/**
 * Simple button for creating a new distribu.
 * Basic design without fancy animations - can be used throughout the app.
 *
 * @returns Simple button element for creating distribus
 */
export function DistribuCreationButton({ children, styleProps }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  if (isPressed) {
    return (
      <Modal
        isOpen={isPressed}
        onOpenChange={setIsPressed}
      >
        <DistribuCreationForm />
      </Modal>
    );
  }

  return (
    <Button
      aria-label='Create new distribu'
      styleProps={styleProps}
      onPress={() => {
        setIsPressed(true);
      }}
    >
      {children}
    </Button>
  );
}

type Props = Pick<ButtonProps, 'children' | 'styleProps'>;
