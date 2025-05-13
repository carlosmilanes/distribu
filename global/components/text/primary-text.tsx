import { Text, type TextProps } from '../core/text';
import { create } from 'stylex';
import { colors, fontSizes } from '@/global/styles/vars.stylex';

export function PrimaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.text,
    fontSize: fontSizes.xl,
  },
});
