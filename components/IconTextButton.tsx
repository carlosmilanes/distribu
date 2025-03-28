import { Button, ButtonProps } from "./Button";

export function IconTextButton({ children, onPress, className }: ButtonProps) {
  return (
    <Button
      onPress={onPress}
      className={`text-semibold gap-1 rounded-full px-4 py-1 text-lg ${className}`}
    >
      {children}
    </Button>
  );
}
