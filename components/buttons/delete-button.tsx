import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, type ButtonProps } from '@/components/core/button';
import { create, props } from 'stylex';
import { colors, borderRadius, fixedSizes } from '@/stylex/vars.stylex';

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
    margin: fixedSizes.s2,
    width: fixedSizes.m3,
    height: fixedSizes.m3,
    borderRadius: borderRadius.full,
    border: '1px solid',
    padding: fixedSizes.s2,
    transitionProperty: 'background-color, color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: colors.alert,
      color: colors.background,
    },
  },
});
