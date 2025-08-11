import type { ComponentType, SVGProps } from 'react';
import { Button } from '@/app/components/core/button';
import { create, props as style, type StyleXStyles } from 'stylex';
import {
  colors,
  dynamicSizes,
  fixedSizes,
  fontSizes,
} from '@/app/styles/vars.stylex';

// TODO: docs
export function Option({
  IconComponent,
  label,
  onSelect,
  styleProps,
}: OptionProps) {
  return (
    <Button
      onPress={onSelect}
      styleProps={[styles.base, styleProps]}
    >
      <IconComponent {...style(styles.icon)} /> {label}
    </Button>
  );
}

type OptionProps = {
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  onSelect: () => void;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    display: 'flex',
    color: colors.text,
    fontSize: fontSizes.l,
    gap: dynamicSizes.s2,
    justifyContent: 'start',
    padding: fixedSizes.s1,

    ':hover': {
      backgroundColor: colors.gray3,
    },

    ':active': {
      backgroundColor: colors.gray2,
    },
  },
  icon: {
    width: dynamicSizes.m1,
    height: dynamicSizes.m1,
    flexShrink: 0,
  },
});
