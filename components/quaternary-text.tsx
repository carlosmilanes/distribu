import { Text, type TextProps } from './core/text';

export function QuaternaryText({ children, className, ...props }: TextProps) {
  return (
    <Text
      className={`text-label/50 text-sm ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
}
