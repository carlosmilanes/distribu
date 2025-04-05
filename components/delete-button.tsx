import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, type ButtonProps } from './core/button';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

export function DeleteButton({ onPress, ...otherProps }: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      {...props(DeleteButtonStyles.base)}
      aria-label='Delete'
      {...otherProps}
    >
      <TrashIcon />
    </Button>
  );
}

const DeleteButtonStyles = create({
  base: {
    color: colors.alert,
    margin: '8px',
    width: '48px',
    height: '48px',
    borderRadius: borderRadius.full,
    border: '1px solid',
    padding: '8px',
    transitionProperty: 'background-color, color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: colors.alert,
      color: colors.background,
    },
  },
});
