import type { ReactNode } from 'react';
import { create, props as style, type StyleXStyles } from 'stylex';
import { colors, dynamicSizes } from '@/app/styles/vars.stylex';

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
    cursor: 'pointer',
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    gap: dynamicSizes.s2,
  },
});
