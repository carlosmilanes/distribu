import { reactiveElevation } from '@/app/styles/elevations.stylex';
import { Button, type ButtonProps } from '../core/button';
import { create } from 'stylex';

export const TextButton = ({
  children,
  styling,
  ...otherProps
}: ButtonProps) => {
  return (
    <Button
      styling={[reactiveElevation.low, styles.button, styling]}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

const styles = create({
  button: {},
});
