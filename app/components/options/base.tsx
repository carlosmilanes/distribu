import type { ReactNode } from 'react';
import { create, props as style, type StyleXStyles } from 'stylex';
import { dynamicSizes } from '@/app/styles/vars.stylex';

// TODO: docs
export function OptionBase({ icon, label, styleProps }: OptionBaseProps) {
  return (
    <div {...style(styles.base, styleProps)}>
      {icon} {label}
    </div>
  );
}

type OptionBaseProps = {
  icon: ReactNode;
  label: string;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: dynamicSizes.s2,
  },
});
