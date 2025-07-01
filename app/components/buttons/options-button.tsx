import { Button } from '@/app/components/core/button';
import { OptionsIcon } from '@/app/components/icons';
import { create, props as style, type StyleXStyles } from 'stylex';
import { borderRadius, colors, dynamicSizes, fixedSizes } from '@/app/styles/vars.stylex';

export function OptionsButton({ styleProps }: OptionsButtonProps) {
  return (
    <Button styleProps={[styles.button, styleProps]}>
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