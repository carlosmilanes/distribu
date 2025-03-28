import { Text, TextProps } from "./Text";

export function SecondaryText({ children, className, ...props }: TextProps) {
  return (
    <Text className={`text-label text-2xl ${className}`} {...props}>
      {children}
    </Text>
  );
}
