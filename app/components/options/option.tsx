import type { ComponentType, SVGProps } from 'react';
import { Button } from '@/app/components/core/button';
import { create, props as style, type StyleXStyles } from 'stylex';
import {
  colors,
  dynamicSizes,
  fixedSizes,
  fontSizes,
  borderRadius,
} from '@/app/styles/vars.stylex';
import { useOptionsContext } from '@/app/components/options/options-provider';

// TODO: docs
export function Option({
  IconComponent,
  label,
  onSelect,
  styleProps,
}: OptionProps) {
  const { setOptionsRevealed } = useOptionsContext();

  function handleSelect() {
    onSelect();
    setOptionsRevealed(false);
  }

  return (
    <Button
      onPress={handleSelect}
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
    fontSize: fontSizes.m,
    gap: dynamicSizes.s2,
    justifyContent: 'start',
    padding: fixedSizes.s1,
    borderRadius: borderRadius.l,

    ':hover': {
      backgroundColor: colors.glassHover,
    },
  },
  icon: {
    width: dynamicSizes.m1,
    height: dynamicSizes.m1,
    flexShrink: 0,
  },
});
