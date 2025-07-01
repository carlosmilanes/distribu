import { Text, type TextProps } from '../core/text';
import { create } from 'stylex';
import { colors, fontSizes } from '@/app/styles/vars.stylex';

export function PrimaryText({ children, styleProps }: TextProps) {
  return <Text styleProps={[styles.base, styleProps]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.text,
    fontSize: fontSizes.xl,
  },
});
