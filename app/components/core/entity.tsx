import { usePress, useLongPress, mergeProps } from 'react-aria';
import { create, props as style, type StyleXStyles } from 'stylex';

/**
 * Interactive entity component that extends div with press and long press capabilities
 *
 * @param props - Standard div props plus optional onPress and onLongPress handlers
 * @returns Interactive div element with press gesture support
 */
export function Entity({
  onPress,
  onLongPress,
  children,
  styleProps,
  ...props
}: EntityProps) {
  const { pressProps } = usePress({
    onPress: onPress,
  });

  const { longPressProps } = useLongPress({
    accessibilityDescription: 'Long press to show options',
    onLongPress: onLongPress,
  });

  return (
    <div
      {...props}
      {...mergeProps(longPressProps, pressProps)}
      {...style(styles.base, styleProps)}
    >
      {children}
    </div>
  );
}

type EntityProps = React.ComponentProps<'div'> & {
  onPress?: () => void;
  onLongPress?: () => void;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    cursor: 'pointer',
    userSelect: 'none',
  },
});
