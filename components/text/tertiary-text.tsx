import { Text, type TextProps } from '@/components/core/text';
import { create } from 'stylex';
import { colors, dynamicSizes } from '@/stylex/vars.stylex';

export function TertiaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.tertiaryText,
    fontSize: dynamicSizes.s4,
  },
});
