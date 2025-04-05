import { Text, type TextProps } from './core/text';
import { create, props } from 'stylex';
import { colors } from '../stylex/vars.stylex';

export function TertiaryText({ children, ...otherProps }: TextProps) {
  return (
    <Text
      {...props(TertiaryTextStyles.base)}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

const TertiaryTextStyles = create({
  base: {
    color: colors.secondaryText,
    fontSize: '16px',
  },
});
