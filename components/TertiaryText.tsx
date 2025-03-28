import { Text, TextProps } from "./Text";

export function TertiaryText({ children, className, ...props }: TextProps) {
  return (
    <Text className={`text-label/70 text-md ${className}`} {...props}>
      {children}
    </Text>
  );
}
