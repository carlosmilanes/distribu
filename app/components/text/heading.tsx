import { create, props as style, type StyleXStyles } from 'stylex';
import { fixedSizes, fontSizes } from '@/app/styles/vars.stylex';

export function Heading({ children, styleProps }: HeadingProps) {
  return <h1 {...style(styles.base, styleProps)}>{children}</h1>;
}

type HeadingProps = {
  children: React.ReactNode;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    fontSize: fontSizes.xxl,
    marginBottom: fixedSizes.s3,
  },
});
