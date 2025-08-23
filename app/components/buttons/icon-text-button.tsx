import { Button, type ButtonProps } from '../core/button';
import { create, props as style } from 'stylex';
import {
  borderRadius,
  fixedSizes,
  fontSizes,
  dynamicSizes,
  colors,
} from '@/app/styles/vars.stylex';
import {
  lightReflection,
  reactiveElevation,
} from '@/app/styles/elevations.stylex';

export function IconTextButton({
  children,
  onPress,
  IconComponent,
  styleProps,
  ...otherProps
}: IconTextButtonProps) {
  return (
    <Button
      onPress={onPress}
      styleProps={[
        lightReflection.ofColor(colors.primary),
        reactiveElevation.low,
        styles.base,
        styleProps,
      ]}
      {...otherProps}
    >
      <IconComponent {...style(styles.icon)} />
      {children}
    </Button>
  );
}

type IconTextButtonProps = ButtonProps & {
  IconComponent: React.ComponentType;
};

const iconSize = fixedSizes.m2;

const styles = create({
  base: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: dynamicSizes.l3,
    gap: fixedSizes.s1,
    borderRadius: borderRadius.full,
    paddingLeft: fixedSizes.s4,
    paddingRight: fixedSizes.s4,
    paddingTop: fixedSizes.s1,
    paddingBottom: fixedSizes.s1,
    fontSize: fontSizes.l,
    whiteSpace: 'nowrap',
  },
  icon: {
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
  },
});
