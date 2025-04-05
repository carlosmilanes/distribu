import { Button, type ButtonProps } from './core/button';
import { create, props } from 'stylex';
import { borderRadius } from '../stylex/vars.stylex';

export function IconTextButton({
  children,
  onPress,
  ...otherProps
}: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      {...props(IconTextButtonStyles.base)}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

const IconTextButtonStyles = create({
  base: {
    fontWeight: '600',
    gap: '4px',
    borderRadius: borderRadius.full,
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '18px',
  },
});
