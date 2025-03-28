"use client";

import { usePress } from "react-aria";

type PressableAreaProps = {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  props?: React.HTMLAttributes<HTMLDivElement>;
};

export function PressableArea({
  children,
  className,
  onPress,
  ...props
}: PressableAreaProps) {
  const { pressProps } = usePress({
    onPress: () => {
      onPress?.();
    },
  });

  return (
    <div className={className} {...pressProps} {...props}>
      {children}
    </div>
  );
}
