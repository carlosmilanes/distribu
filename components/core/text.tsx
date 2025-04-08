import { props as style, type StyleXStyles } from 'stylex';

export function Text({ children, styling }: TextProps) {
  return <div {...style(styling)}>{children}</div>;
}

export type TextProps = {
  children: React.ReactNode;
  styling?: StyleXStyles;
};
