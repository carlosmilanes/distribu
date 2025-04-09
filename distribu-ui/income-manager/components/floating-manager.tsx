import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { IncomeData } from '@/data/types';
import { AddIncomeButton } from './add-income-button';
import { StackedBar } from './stacked-bar';
import { TertiaryText } from '@/components/text/tertiary-text';
import { Money } from '@/components/money';
import { Incomes } from './incomes';
import { Chart } from './chart';
import { Floater } from './floater';
import { ExpandedFloater } from './expanded-floater';
import { create, props as style } from 'stylex';
import { colors } from '@/stylex/vars.stylex';

export function FloatingManager({ incomeData }: { incomeData: IncomeData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <ExpandedFloater
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        <AddIncomeButton {...style(styles.textIconButton)}>
          <PlusIcon {...style(styles.plusIcon)} />
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
        amount={parseFloat(incomeData.state.assignable).toString()}
        styling={styles.money}
      />
      <TertiaryText styling={styles.label}>Ingreso disponible</TertiaryText>

      <StackedBar state={incomeData.state} />

      <AddIncomeButton styling={styles.iconButton}>
        <PlusIcon {...style(styles.soloIcon)} />
      </AddIncomeButton>
    </Floater>
  );
}

const styles = create({
  money: {
    paddingBottom: '0px',
    color: colors.income,
    fontSize: '2.1rem',
    fontWeight: '600',
  },
  label: {
    marginTop: '-0.5rem',
    color: colors.vibrantText,
    marginBottom: '10px',
  },
  iconButton: {
    position: 'absolute',
    top: '10px',
    right: '16px',
  },
  soloIcon: {
    width: '2.5rem',
    height: '2.5rem',
    strokeWidth: '2',
  },
  textIconButton: {
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
    width: '1.5rem',
    height: '1.5rem',
    strokeWidth: '2',
  },
});
