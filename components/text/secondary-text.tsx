import { Text, type TextProps } from '@/components/core/text';
import { create } from 'stylex';
import { colors, dynamicSizes } from '@/stylex/vars.stylex';

export function SecondaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.secondaryText,
    fontSize: dynamicSizes.m1,
  },
});
