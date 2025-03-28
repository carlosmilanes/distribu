import { twMerge } from "tailwind-merge";

export type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export function Text({ children, className }: TextProps) {
  const styles = {
    component: twMerge("flex w-min whitespace-nowrap", className),
  };

  return <div className={styles.component}>{children}</div>;
}
