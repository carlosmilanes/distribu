import { colors } from '@/app/styles/vars.stylex';
import { create, props as style, type StyleXStyles } from 'stylex';

export function Text({ children, styleProps }: TextProps) {
  return <div {...style(styles.base, styleProps)}>{children}</div>;
}

export type TextProps = {
  children: React.ReactNode;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    lineHeight: 1,
    color: colors.text,
  },
});
