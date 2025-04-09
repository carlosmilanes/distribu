import { Button, type ButtonProps } from './core/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { create, props as style } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

export function CloseButton({ onPress, styling }: ButtonProps) {
  return (
    <Button
      styling={[styles.base, styling]}
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
    top: '12px',
    right: '12px',

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
    width: '30px',
    height: '30px',

    // border & spacing
    borderRadius: borderRadius.full,
    padding: '6px',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
