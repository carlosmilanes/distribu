import { Text, type TextProps } from './Text';

export function PrimaryText({ children, className, ...props }: TextProps) {
  return (
    <Text className={`text-label text-3xl ${className}`} {...props}>
      {children}
    </Text>
  );
}
