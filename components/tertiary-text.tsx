import { Text, type TextProps } from './core/text';

export function TertiaryText({ children, className, ...props }: TextProps) {
  return (
    <Text
      className={`text-label/70 text-md ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
}
