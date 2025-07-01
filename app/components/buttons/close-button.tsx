import { Button, type ButtonProps } from '../core/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { create, props as style } from 'stylex';
import { colors, borderRadius, fixedSizes } from '@/app/styles/vars.stylex';

export function CloseButton({ onPress, styleProps }: ButtonProps) {
  return (
    <Button
      styleProps={[styles.base, styleProps]}
      onPress={onPress}
      aria-label='Close'
    >
      <XMarkIcon {...style(styles.icon)} />
    </Button>
  );
}

const styles = create({
  base: {
    // positioning
    position: 'absolute',
    top: fixedSizes.s3,
    right: fixedSizes.s3,

    // colors
    backgroundColor: colors.secondaryBackground,
    color: colors.gray,
    ':hover': {
      backgroundColor: colors.gray4,
    },
    ':active': {
      backgroundColor: colors.gray2,
    },
    transition: 'background-color 0.2s ease',

    // dimensions
    width: fixedSizes.m2,
    height: fixedSizes.m2,

    // border & spacing
    borderRadius: borderRadius.full,
    padding: '6px',
  },
  icon: {
    width: '100%',
    height: '100%',
    strokeWidth: '2',
  },
});
