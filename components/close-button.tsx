import { Button, type ButtonProps } from './core/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

export function CloseButton({ onPress, ...otherProps }: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      {...props(CloseButtonStyles.base)}
      aria-label='Close'
      {...otherProps}
    >
      <XMarkIcon {...props(CloseButtonStyles.icon)} />
    </Button>
  );
}

const CloseButtonStyles = create({
  base: {
    backgroundColor: 'rgba(200, 200, 200, 0.8)',
    color: colors.gray,
    width: '28px',
    height: '28px',
    borderRadius: borderRadius.full,
    padding: '6px',
    backdropFilter: 'blur(4px)',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
