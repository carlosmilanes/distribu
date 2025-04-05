import { Text, type TextProps } from './core/text';
import { create, props } from 'stylex';
import { colors } from '../stylex/vars.stylex';

export function PrimaryText({ children, ...otherProps }: TextProps) {
  return (
    <Text
      {...props(PrimaryTextStyles.base)}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

const PrimaryTextStyles = create({
  base: {
    color: colors.text,
    fontSize: '30px',
  },
});
