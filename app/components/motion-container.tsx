import { motion, type HTMLMotionProps } from 'motion/react';

export function MotionContainer({
  children,
  ...otherProps
}: HTMLMotionProps<'div'>) {
  return <motion.div {...otherProps}>{children}</motion.div>;
}
