import { Button, type ButtonProps } from '@/app/components/core/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { fontSizes } from '@/app/styles/vars.stylex';
import { create, props } from 'stylex';

/**
 * Simple button for creating a new distribu.
 * Basic design without fancy animations - can be used throughout the app.
 *
 * @returns Simple button element for creating distribus
 */
export function DistribuCreationButton({ children, styling }: Props) {
  const handleCreateClick = () => {
    // TODO: Implement create distribu modal/form
  };

  return (
    <Button
      onPress={handleCreateClick}
      aria-label='Create new distribu'
      styling={styling}
    >
      {children}
    </Button>
  );
}

type Props = Pick<ButtonProps, 'children' | 'styling'>;
