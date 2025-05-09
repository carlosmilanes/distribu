import { Button, type ButtonProps } from './core/button';
import { create, props } from 'stylex';
import { borderRadius, fixedSizes } from '../stylex/vars.stylex';

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
    gap: fixedSizes.s1,
    borderRadius: borderRadius.full,
    paddingLeft: fixedSizes.s4,
    paddingRight: fixedSizes.s4,
    paddingTop: fixedSizes.s1,
    paddingBottom: fixedSizes.s1,
    fontSize: '18px',
  },
});
