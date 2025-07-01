import { type ButtonProps } from '@/app/components/core/button';
import { TextButton } from './text-button';
import { create } from 'stylex';
import { lightReflection } from '@/app/styles/elevations.stylex';
import { colors, dynamicSizes, fontWeights } from '@/app/styles/vars.stylex';

export function PrimaryButton({
  children,
  styleProps,
  ...otherProps
}: ButtonProps) {
  return (
    <TextButton
      styleProps={[
        lightReflection.ofColor(colors.primary),
        styles.button,
        styleProps,
      ]}
      autoFocus
      {...otherProps}
    >
      {children}
    </TextButton>
  );
}

const styles = create({
  button: {
    backgroundColor: colors.primary,
    color: colors.whiteText,
    fontWeight: fontWeights.medium,
    padding: `${dynamicSizes.s4} ${dynamicSizes.m2}`,
  },
});
