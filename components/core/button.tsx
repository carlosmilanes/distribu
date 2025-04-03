import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

// Implementation reference: https://react-spectrum.adobe.com/react-aria/Button.html

export type ButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onPress: (e: PressEvent) => void;
};

export function Button({
  children,
  type = 'button',
  className,
  onPress,
}: ButtonProps) {
  const twClasses = twMerge(
    'flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-100',
    'cursor-pointer',
    className
  );

  return (
    <AriaButton
      onPress={onPress}
      type={type}
      className={twClasses}
    >
      {children}
    </AriaButton>
  );
}
