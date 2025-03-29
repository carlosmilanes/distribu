import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, type ButtonProps } from './Button';

export function DeleteButton({ onPress, className }: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      className={`text-alert-600 hover:bg-alert-600 hover:text-alert-50 m-2 size-12 rounded-full border p-2 transition ${className}`}
      aria-label='Delete'
    >
      <TrashIcon />
    </Button>
  );
}
