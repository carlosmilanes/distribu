import type { IncomeState } from '@/data/types';
import { findBasicPercentage } from '@/utils/findBasicPercentage';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../../../stylex/vars.stylex';

export function StackedBar({ state, ...otherProps }: { state: IncomeState }) {
  return (
    <div
      {...props(StackedBarStyles.container)}
      {...otherProps}
    >
      <div
        {...props(StackedBarStyles.bar, StackedBarStyles.assigned)}
        style={{
          width: `${findBasicPercentage(state.assigned, state.total)}%`,
        }}
      />
      <div
        {...props(StackedBarStyles.bar, StackedBarStyles.used)}
        style={{
          width: `${findBasicPercentage(state.used, state.total)}%`,
        }}
      />
    </div>
  );
}

const StackedBarStyles = create({
  container: {
    backgroundColor: colors.income,
    position: 'relative',
    height: '20px',
    overflow: 'hidden',
    borderRadius: borderRadius.full,
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  bar: {
    position: 'absolute',
    inset: 0,
    borderRadius: borderRadius.full,
    transitionProperty: 'all',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-in-out',
    borderRight: `1px solid ${colors.background}`,
    boxShadow: '4px 0 4px rgba(0, 0, 0, 0.1)',
  },
  assigned: {
    backgroundColor: colors.assignedIncome,
  },
  used: {
    backgroundColor: colors.usedIncome,
  },
});
