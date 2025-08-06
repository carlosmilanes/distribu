import { Button, type ButtonProps } from '@/app/components/core/button';
import { OptionsIcon } from '@/app/components/icons';
import { create, props as style, type StyleXStyles } from 'stylex';
import { borderRadius, colors, dynamicSizes } from '@/app/styles/vars.stylex';
import { elevation, lightReflection } from '@/app/styles/elevations.stylex';
import type { PressEvent } from 'react-aria-components';

export function OptionsButton({
  onPress,
  styleProps,
  ...rest
}: OptionsButtonProps) {
  return (
    <Button
      onPress={onPress}
      styleProps={[
        styles.button,
        lightReflection.ofColor(colors.tertiaryBackground),
        elevation.low,
        styleProps,
      ]}
      {...rest}
    >
      <OptionsIcon {...style(styles.icon)} />
    </Button>
  );
}

type OptionsButtonProps = {
  styleProps?: StyleXStyles;
  onPress?: (e: PressEvent) => void;
} & ButtonProps;

const styles = create({
  button: {
    color: colors.text,
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.full,
    height: dynamicSizes.m1,
    width: dynamicSizes.m1,

    // extended touch/click area
    '::after': {
      content: '',
      position: 'absolute',
      top: '-20px' /* Extend 10px above */,
      left: '-20px' /* Extend 10px to the left */,
      right: '-20px' /* Extend 10px to the right */,
      bottom: '-20px' /* Extend 10px below */,
    },
  },
  icon: {
    width: '100%',
    height: '100%',
    strokeWidth: 1.5,
  },
});
