import type { IncomeData } from '@/data/types';
import { TertiaryText } from '@/components/tertiary-text';
import { StackedBar } from './stacked-bar';
import { AddIncomeButton } from './add-income-button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Money } from '@/components/money';

import { create, props } from '@stylexjs/stylex';

type CompactManagerPartsProps = {
  incomeState: IncomeData['state'];
};

export function CompactManagerParts({ incomeState }: CompactManagerPartsProps) {
  return (
    <>
      <Money
        {...props(styles.money)}
        amount={parseFloat(incomeState.assignable).toString()}
        // className='block text-3xl font-semibold text-income'
      />
      <TertiaryText className='mb-3'>Ingreso disponible</TertiaryText>

      <StackedBar state={incomeState} />

      <AddIncomeButton className='absolute top-4 right-4'>
        <PlusIcon className='size-8' />
      </AddIncomeButton>
    </>
  );
}

const styles = create({
  money: {
    color: 'red',
  },
});
