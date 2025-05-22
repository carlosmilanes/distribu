import { Text, type TextProps } from '../core/text';
import { create } from 'stylex';
import { colors, fontSizes } from '@/frontend/global/styles/vars.stylex';

export function SecondaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.secondaryText,
    fontSize: fontSizes.m,
  },
});
