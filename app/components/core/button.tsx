import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { create, props as style, type StyleXStyles } from 'stylex';
import { borderRadius, colors } from '@/app/styles/vars.stylex';
import { reactiveElevation } from '@/app/styles/elevations.stylex';
// Implementation reference: https://react-spectrum.adobe.com/react-aria/Button.html

export function Button({
  children,
  type = 'button',
  styling,
  onPress,
  ...otherProps
}: ButtonProps) {
  return (
    <AriaButton
      {...style(styles.base, styling)}
      onPress={onPress}
      type={type}
      {...otherProps}
    >
      {children}
    </AriaButton>
  );
}

export type ButtonProps = React.ComponentPropsWithoutRef<typeof AriaButton> & {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  styling?: StyleXStyles;
  onPress: (e: PressEvent) => void;
};

const styles = create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.m,
    cursor: 'pointer',
  },
});
