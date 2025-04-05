import { Text, type TextProps } from './core/text';
import { create, props } from 'stylex';
import { colors } from '../stylex/vars.stylex';

export function QuaternaryText({ children, ...otherProps }: TextProps) {
  return (
    <Text
      {...props(QuaternaryTextStyles.base)}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

const QuaternaryTextStyles = create({
  base: {
    color: colors.tertiaryText,
    fontSize: '14px',
  },
});
