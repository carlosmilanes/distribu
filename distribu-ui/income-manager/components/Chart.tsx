import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { IncomeState } from '@/data/types';
import { QuaternaryText } from '@/components/text/quaternary-text';
import { StackedBar } from './stacked-bar';
import { findBasicPercentage } from '@/utils/findBasicPercentage';
import { Money } from '@/components/money';
import { create, props as style } from 'stylex';
import { colors } from '@/stylex/vars.stylex';
import { useState } from 'react';
import { useOutsidePress } from '@/hooks/use-outside-press';
import { TertiaryText } from '@/components/text/tertiary-text';
import { glass } from '@/stylex/materials.stylex';

export function Chart({ incomeState }: { incomeState: IncomeState }) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useOutsidePress<HTMLDivElement>(() => setCollapsed(true));

  return (
    <div
      {...style(glass.regular, styles.base)}
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
    >
      <TotalHeader
        total={incomeState.total}
        collapsed={collapsed}
      />

      <Legend
        incomeState={incomeState}
        hidden={collapsed}
      />

      <StackedBar
        state={incomeState}
        styling={styles.stackedBar}
      />
    </div>
  );
}

function TotalHeader({ total, collapsed }: TotalHeaderProps) {
  return (
    <div {...style(styles.totalHeader)}>
      <div {...style(styles.totalContent)}>
        <TertiaryText styling={styles.totalLabel}>Total</TertiaryText>

        <Money
          styling={styles.totalAmount}
          amount={total}
        />
      </div>

      <ChevronDownIcon
        {...style(styles.chevron, collapsed && styles.chevronCollapsed)}
      />
    </div>
  );
}

function Legend({ incomeState, hidden }: LegendProps) {
  if (!incomeState) return null;

  return (
    <div {...style(styles.legend, hidden && styles.legendHidden)}>
      <LegendItem
        label='Disponible'
        amount={incomeState.assignable}
        total={incomeState.total}
        color={colors.income}
      />
      <LegendItem
        label='Asignado'
        amount={incomeState.assigned}
        total={incomeState.total}
        color={colors.assignedIncome}
      />
      <LegendItem
        label='Usado'
        amount={incomeState.used}
        total={incomeState.total}
        color={colors.usedIncome}
      />
    </div>
  );
}

function LegendItem({ label, amount, total, color }: LegendItemProps) {
  return (
    <div {...style(styles.legendItem)}>
      <QuaternaryText styling={styles.legendLabel}>{label}</QuaternaryText>

      <div {...style(styles.legendContent)}>
        <Money
          styling={[styles.legendAmount, styles.legendAmountColor(color)]}
          amount={amount}
        />

        <QuaternaryText
          styling={[
            styles.legendPercentage,
            styles.legendPercentageColor(color),
          ]}
        >
          {findBasicPercentage(amount, total)}%
        </QuaternaryText>
      </div>

      <DottedDivider />
    </div>
  );
}

function DottedDivider() {
  return (
    <div
      {...style(styles.dottedDivider)}
      style={{
        backgroundImage: `radial-gradient(circle, ${colors.gray} 1px, transparent 1px)`,
        backgroundSize: '10px 4px',
      }}
    />
  );
}

type TotalHeaderProps = {
  total: string;
  collapsed: boolean;
};

type LegendProps = {
  incomeState?: IncomeState;
  hidden: boolean;
};

type LegendItemProps = {
  label: string;
  amount: string;
  total: string;
  color: string;
};

const styles = create({
  base: {
    position: 'absolute',
    bottom: '-1px',
    zIndex: 10,
    width: '100%',
    borderTop: `2px solid ${colors.glassyBorder}`,
    paddingBottom: '12px',
  },
  stackedBar: {
    margin: '0 12px',
  },
  totalHeader: {
    position: 'relative',
    margin: '8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px 0 12px',
  },
  totalContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  totalLabel: {
    color: colors.gray,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  chevron: {
    width: '1.5rem',
    height: '1.5rem',
    strokeWidth: '2',
    transition: 'transform 300ms ease-in-out',
  },
  chevronCollapsed: {
    transform: 'rotate(180deg)',
  },
  legend: {
    height: '12.5rem',
    margin: '0 12px',
    overflow: 'hidden',
    transition: 'height 300ms ease-in-out, opacity 300ms ease-in-out',
  },
  legendHidden: {
    height: 0,
    opacity: 0,
  },
  legendItem: {
    marginBottom: '8px',
  },
  legendContent: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  legendLabel: {
    color: colors.gray,
    fontSize: '1rem',
  },
  legendAmount: {
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  legendPercentage: {
    fontSize: '1rem',
  },
  dottedDivider: {
    height: '4px',
    backgroundRepeat: 'repeat-x',
  },
  legendAmountColor: (color: string) => ({
    color,
  }),
  legendPercentageColor: (color: string) => ({
    color,
  }),
});
