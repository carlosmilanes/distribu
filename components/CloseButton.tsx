import { Button, type ButtonProps } from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function CloseButton({ onPress, className }: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      className={`bg-primary-200/80 text-primary-600 size-7 rounded-full p-1.5 backdrop-blur-xs ${className}`}
      aria-label='Close'
    >
      <XMarkIcon className='size-full' />
    </Button>
  );
}
