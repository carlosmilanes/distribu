import { Button } from '@/app/components/core/button';
import { OptionsIcon } from '@/app/components/icons';
import { create, props as style, type StyleXStyles } from 'stylex';
import { borderRadius, colors, dynamicSizes } from '@/app/styles/vars.stylex';
import { elevation, lightReflection } from '@/app/styles/elevations.stylex';

export function OptionsButton({ styleProps }: OptionsButtonProps) {
  return (
    <Button styleProps={[
      styles.button,
      lightReflection.ofColor(colors.tertiaryBackground),
      elevation.low,
      styleProps,
    ]}>
      <OptionsIcon {...style(styles.icon)} />
    </Button>
  );
}

type OptionsButtonProps = {
  styleProps?: StyleXStyles;
};

const styles = create({
  button: {
    color: colors.text,
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.full,
    height: dynamicSizes.m1,
    width: dynamicSizes.m1,
  },
  icon: {
    width: '100%',
    height: '100%',
    strokeWidth: 1.5,
  },
});