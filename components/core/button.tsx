import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { create, props, type StyleXStyles } from 'stylex';
import { borderRadius } from 'stylex/vars.stylex';
// Implementation reference: https://react-spectrum.adobe.com/react-aria/Button.html

export function Button({
  children,
  type = 'button',
  styling,
  onPress,
}: ButtonProps) {
  return (
    <AriaButton
      {...props(styles.base, styling)}
      onPress={onPress}
      type={type}
    >
      {children}
    </AriaButton>
  );
}

const styles = create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.medium,
  },
});

export type ButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  styling?: StyleXStyles;
  onPress: (e: PressEvent) => void;
};
