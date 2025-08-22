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

/**
 * Base option component that serves as the common denominator for all individual option components
 * Provides standardized styling, behavior, and auto-dismissal functionality for options menus
 * 
 * This component automatically closes the options modal when selected and handles the standard
 * option layout with icon + label. Individual option components (EditOption, DeleteOption, etc.)
 * should use this as their foundation and be wrapped by the OptionsModal component.
 *
 * @param IconComponent - SVG icon component to display alongside the label
 * @param label - Text label for the option
 * @param onSelect - Callback function executed when the option is selected
 * @param styleProps - Optional additional StyleX styles to apply
 * @returns Clickable option button with icon and label
 */
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
