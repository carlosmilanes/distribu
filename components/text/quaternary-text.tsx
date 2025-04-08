import { Text, type TextProps } from '@/components/core/text';
import { create } from 'stylex';
import { colors } from '@/stylex/vars.stylex';

export function QuaternaryText({ children, styling }: TextProps) {
  return <Text styling={[styles.base, styling]}>{children}</Text>;
}

const styles = create({
  base: {
    color: colors.quaternaryText,
    fontSize: '0.875rem',
  },
});
