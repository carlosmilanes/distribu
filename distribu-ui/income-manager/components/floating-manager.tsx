import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { IncomeData } from '@/data/types';
import { AddIncomeButton } from './add-income-button';
import { StackedBar } from './stacked-bar';
import { TertiaryText } from '@/components/tertiary-text';
import { Money } from '@/components/money';
import { Incomes } from './incomes';
import { Chart } from './chart';
import { Floater } from './floater';
import { ExpandedFloater } from './expanded-floater';
import { create, props } from 'stylex';
import { colors } from '@/stylex/vars.stylex';

export function FloatingManager({ incomeData }: { incomeData: IncomeData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <ExpandedFloater
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        <AddIncomeButton {...props(ExpandedManagerPartsStyles.addButton)}>
          <PlusIcon {...props(ExpandedManagerPartsStyles.plusIcon)} />
          Añadir
        </AddIncomeButton>

        <Incomes incomes={incomeData.incomes || []} />

        <Chart incomeState={incomeData.state} />
      </ExpandedFloater>
    );
  }

  return (
    <Floater
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    >
      <Money
        {...props(CompactManagerPartsStyles.money)}
        amount={parseFloat(incomeData.state.assignable).toString()}
      />
      <TertiaryText {...props(CompactManagerPartsStyles.label)}>
        Ingreso disponible
      </TertiaryText>

      <StackedBar state={incomeData.state} />

      <AddIncomeButton styling={CompactManagerPartsStyles.button}>
        <PlusIcon {...props(CompactManagerPartsStyles.icon)} />
      </AddIncomeButton>
    </Floater>
  );
}

const CompactManagerPartsStyles = create({
  money: {
    color: colors.income,
    fontSize: '30px',
    fontWeight: '600',
    display: 'block',
  },
  label: {
    marginBottom: '12px',
  },
  button: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
  icon: {
    width: '32px',
    height: '32px',
  },
});

const ExpandedManagerPartsStyles = create({
  addButton: {
    position: 'absolute',
    top: '8px',
    right: '48px',
    display: 'flex',
    gap: '4px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '18px',
  },
  plusIcon: {
    width: '24px',
    height: '24px',
    strokeWidth: '2',
  },
});
