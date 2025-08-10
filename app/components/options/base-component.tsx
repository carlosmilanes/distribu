import type { ComponentType, SVGProps } from 'react';
import { create, props as style, type StyleXStyles } from 'stylex';
import { colors, dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';

// TODO: docs
export function BaseOption({
  IconComponent,
  label,
  styleProps,
}: OptionBaseProps) {
  return (
    <div {...style(styles.base, styleProps)}>
      <IconComponent {...style(styles.icon)} /> {label}
    </div>
  );
}

type OptionBaseProps = {
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    color: colors.text,
    fontSize: fontSizes.l,
    display: 'flex',
    alignItems: 'center',
    gap: dynamicSizes.s2,
  },
  icon: {
    width: dynamicSizes.m1,
    height: dynamicSizes.m1,
    flexShrink: 0,
  },
});
