import { Button, type ButtonProps } from '@/app/components/core/button';
import {
  lightReflection,
  reactiveElevation,
} from '@/app/styles/elevations.stylex';
import {
  colors,
  fixedSizes,
  fontWeights,
  shadows,
} from '@/app/styles/vars.stylex';
import { create } from 'stylex';

export function PrimaryButton({
  children,
  styling,
  ...otherProps
}: ButtonProps) {
  return (
    <Button
      styling={[
        reactiveElevation.low,
        lightReflection.ofColor(colors.primary),
        styles.base,
        styling,
      ]}
      autoFocus
      {...otherProps}
    >
      {children}
    </Button>
  );
}

const styles = create({
  base: {
    backgroundColor: colors.primary,
    color: colors.whiteText,
    fontWeight: fontWeights.medium,
    padding: `${fixedSizes.m1} ${fixedSizes.m3}`,
  },
});
