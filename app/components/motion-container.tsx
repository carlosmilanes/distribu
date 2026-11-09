import { motion, type HTMLMotionProps } from 'motion/react';
import { props as style, type StyleXStyles } from 'stylex';

export function MotionContainer({
  children,
  styleProps,
  ...otherProps
}: MotionContainerProps) {
  return (
    <motion.div
      {...style(styleProps)}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
}

type MotionContainerProps = HTMLMotionProps<'div'> & {
  styleProps?: StyleXStyles;
};
