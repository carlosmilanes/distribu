import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { create, props, type StyleXStyles } from 'stylex';
import { borderRadius } from 'stylex/vars.stylex';
// Implementation reference: https://react-spectrum.adobe.com/react-aria/Button.html

export type ButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  styles?: StyleXStyles;
  onPress: (e: PressEvent) => void;
};

export function Button({
  children,
  type = 'button',
  styles,
  onPress,
}: ButtonProps) {
  return (
    <AriaButton
      {...props(ButtonStyles.all, styles)}
      onPress={onPress}
      type={type}
    >
      {children}
    </AriaButton>
  );
}

const ButtonStyles = create({
  all: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.medium,
  },
});
