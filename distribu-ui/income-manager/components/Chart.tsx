import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { IncomeState } from '@/data/types';
import { SecondaryText } from '@/components/text/secondary-text';
import { QuaternaryText } from '@/components/text/quaternary-text';
import { StackedBar } from './stacked-bar';
import { findBasicPercentage } from '@/utils/findBasicPercentage';
import { Money } from '@/components/money';
import { ChartState } from './chart-state';
import { create, props } from 'stylex';
import { colors } from '../../../stylex/vars.stylex';

type ChartProps = {
  incomeState: IncomeState;
};

export function Chart({ incomeState }: ChartProps) {
  return (
    <ChartState incomeState={incomeState}>
      <TotalHeader total={incomeState.total} />
      <Legend />
      <StackedBar
        state={incomeState}
        {...props(ChartStyles.stackedBar)}
      />
    </ChartState>
  );
}

type TotalHeaderProps = {
  total: string;
  collapsed?: boolean;
};

function TotalHeader({ total, collapsed = false }: TotalHeaderProps) {
  return (
    <div {...props(ChartStyles.totalHeader)}>
      <div {...props(ChartStyles.totalContent)}>
        <QuaternaryText>Total</QuaternaryText>
        <Money
          {...props(ChartStyles.money)}
          amount={total}
        />
      </div>

      <ChevronDownIcon
        {...props(
          ChartStyles.chevron,
          collapsed && ChartStyles.chevronCollapsed
        )}
      />
    </div>
  );
}

type LegendProps = {
  incomeState?: IncomeState;
  hidden?: boolean;
};

function Legend({ incomeState, hidden = false }: LegendProps) {
  if (!incomeState) return null;

  return (
    <div {...props(ChartStyles.legend, hidden && ChartStyles.legendHidden)}>
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

type LegendItemProps = {
  label: string;
  amount: string;
  total: string;
  color: string;
};

function LegendItem({ label, amount, total, color }: LegendItemProps) {
  return (
    <div {...props(ChartStyles.legendItem)}>
      <QuaternaryText>{label}</QuaternaryText>

      <div {...props(ChartStyles.legendContent)}>
        <SecondaryText
          {...props(
            ChartStyles.legendAmount,
            ChartStyles.legendAmountColor(color)
          )}
        >
          {amount}
        </SecondaryText>

        <QuaternaryText
          {...props(
            ChartStyles.legendPercentage,
            ChartStyles.legendPercentageColor(color)
          )}
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
      {...props(ChartStyles.dottedDivider)}
      style={{
        backgroundImage: `radial-gradient(circle, ${colors.gray} 1px, transparent 1px)`,
        backgroundSize: '10px 4px',
      }}
    />
  );
}

const ChartStyles = create({
  stackedBar: {
    marginLeft: '12px',
    marginRight: '12px',
  },
  totalHeader: {
    position: 'relative',
    marginTop: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '16px',
    paddingLeft: '12px',
  },
  totalContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  money: {
    fontSize: '20px',
    fontWeight: '600',
  },
  chevron: {
    width: '24px',
    height: '24px',
    strokeWidth: '2',
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },
  chevronCollapsed: {
    transform: 'rotate(180deg)',
  },
  legend: {
    marginLeft: '12px',
    marginRight: '12px',
    overflow: 'hidden',
    borderTop: `1px solid ${colors.income}`,
    transitionProperty: 'height, opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
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
  legendAmount: {
    fontSize: '20px',
    fontWeight: '600',
  },
  legendPercentage: {
    fontSize: '14px',
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
