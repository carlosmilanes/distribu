import { Text, TextProps } from "./Text";

export function QuaternaryText({ children, className, ...props }: TextProps) {
  return (
    <Text className={`text-label/50 text-sm ${className}`} {...props}>
      {children}
    </Text>
  );
}
