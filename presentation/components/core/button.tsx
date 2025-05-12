import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { create, props as style, type StyleXStyles } from 'stylex';
import { borderRadius } from '@/presentation/stylex/vars.stylex';
// Implementation reference: https://react-spectrum.adobe.com/react-aria/Button.html

export function Button({
  children,
  type = 'button',
  styling,
  onPress,
}: ButtonProps) {
  return (
    <AriaButton
      {...style(styles.base, styling)}
      onPress={onPress}
      type={type}
    >
      {children}
    </AriaButton>
  );
}

export type ButtonProps = {
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
