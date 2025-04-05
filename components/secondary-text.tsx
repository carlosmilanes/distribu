import { Text, type TextProps } from './core/text';
import { create, props } from 'stylex';
import { colors } from '../stylex/vars.stylex';

export function SecondaryText({ children, ...otherProps }: TextProps) {
  return (
    <Text
      {...props(SecondaryTextStyles.base)}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

const SecondaryTextStyles = create({
  base: {
    color: colors.text,
    fontSize: '24px',
  },
});
