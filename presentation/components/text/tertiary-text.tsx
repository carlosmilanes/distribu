
import { Text, type TextProps } from '@/presentation/components/core/text';
import { create } from 'stylex';
import { colors, fontSizes } from '@/presentation/stylex/vars.stylex';

export function TertiaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.tertiaryText,
    fontSize: fontSizes.s,
  },
});
