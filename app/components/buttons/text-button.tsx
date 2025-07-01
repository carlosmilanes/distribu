import { elevation, reactiveElevation } from '@/app/styles/elevations.stylex';
import { Button, type ButtonProps } from '../core/button';
import { create } from 'stylex';

export const TextButton = ({
  children,
  isDisabled = false,
  styleProps,
  ...otherProps
}: ButtonProps) => {
  return (
    <Button
      styleProps={[
        isDisabled ? elevation.low : reactiveElevation.low,
        styles.button,
        isDisabled && styles.disabled,
        styleProps,
      ]}
      isDisabled={isDisabled}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

const styles = create({
  button: {
    lineHeight: 1,
  },
  disabled: {
    transition: 'opacity 0.2s ease-in-out',
    opacity: 0.7,
    cursor: 'not-allowed',
  },
});
