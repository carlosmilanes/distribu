
import type { FundsStatus } from '../../data/types';
import { findBasicPercentage } from '@/global/utils/findBasicPercentage';
import { create, props as style, type StyleXStyles } from 'stylex';
import { colors, borderRadius } from '@/global/styles/vars.stylex';

export function StatusBar({ status, styling }: StatusBarProps) {
  return (
    <div {...style(styles.staticIncomeBar, styling)}>
      <div
        {...style(
          styles.dynamicBar(findBasicPercentage(status.assigned, status.total)),
          styles.assigned
        )}
      />
      <div
        {...style(
          styles.dynamicBar(findBasicPercentage(status.used, status.total)),
          styles.used
        )}
      />
    </div>
  );
}

type StatusBarProps = {
  status: FundsStatus;
  styling?: StyleXStyles;
};

const styles = create({
  staticIncomeBar: {
    backgroundColor: colors.income,
    position: 'relative',
    height: '20px',
    overflow: 'hidden',
    borderRadius: borderRadius.full,
    outline: `1px solid ${colors.glassyBorder}`,
  },
  dynamicBar: (width: number) => ({
    position: 'absolute',
    inset: 0,
    width: `${width}%`,
    borderRadius: borderRadius.full,
    transition: 'width 300ms ease-in-out',
    borderRight: `1px solid ${colors.gray4}`,
    boxShadow: '4px 0 4px rgba(0, 0, 0, 0.1)',
  }),
  assigned: {
    backgroundColor: colors.assignedIncome,
  },
  used: {
    backgroundColor: colors.usedIncome,
  },
});
