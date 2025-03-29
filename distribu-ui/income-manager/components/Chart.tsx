import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { IncomeState } from '@/data/types';
import { SecondaryText } from '@/components/secondary-text';
import { QuaternaryText } from '@/components/quaternary-text';
import { StackedBar } from './stacked-bar';
import { findBasicPercentage } from '@/utils/findBasicPercentage';
import { Money } from '@/components/money';
import { ChartState } from './chart-state';

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
        className='mx-3'
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
    <div className='relative my-2 flex items-center justify-between pr-4 pl-3'>
      <div className='flex flex-col'>
        <QuaternaryText>Total</QuaternaryText>
        <Money
          className='text-xl font-semibold'
          amount={total}
        />
      </div>

      <ChevronDownIcon
        className={`size-6 stroke-2 transition-transform duration-300 ease-in-out ${
          collapsed ? 'rotate-180' : ''
        }`}
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
    <div
      className={`mx-3 overflow-hidden border-income transition-[height,opacity] duration-300 ease-in-out ${
        hidden ? 'h-0 opacity-0' : 'h-48 opacity-100'
      }`}
    >
      <LegendItem
        label='Disponible'
        amount={incomeState.assignable}
        total={incomeState.total}
        material='income'
      />
      <LegendItem
        label='Asignado'
        amount={incomeState.assigned}
        total={incomeState.total}
        material='assigned'
      />
      <LegendItem
        label='Usado'
        amount={incomeState.used}
        total={incomeState.total}
        material='expense'
      />
    </div>
  );
}

type LegendItemProps = {
  label: string;
  amount: string;
  total: string;
  material: string;
};

function LegendItem({ label, amount, total, material }: LegendItemProps) {
  return (
    <div className='mb-2'>
      <QuaternaryText>{label}</QuaternaryText>

      <div className='flex items-end justify-between'>
        <SecondaryText className={`text-xl font-semibold text-${material}`}>
          {amount}
        </SecondaryText>

        <QuaternaryText className={`text-sm text-${material}`}>
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
      className='h-1 bg-repeat-x'
      style={{
        backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
        backgroundSize: '10px 4px',
      }}
    />
  );
}
