import type { IncomeData } from '@/data/types';
import { TertiaryText } from '@/components/TertiaryText';
import { StackedBar } from './StackedBar';
import { AddIncomeButton } from './AddIncomeButton.client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Money } from '@/components/Money';

type CompactManagerPartsProps = {
  incomeState: IncomeData['state'];
};

export function CompactManagerParts({ incomeState }: CompactManagerPartsProps) {
  return (
    <>
      <Money
        amount={parseFloat(incomeState.assignable).toString()}
        className='block text-3xl font-semibold text-income'
      />
      <TertiaryText className='mb-3'>Ingreso disponible</TertiaryText>

      <StackedBar state={incomeState} />

      <AddIncomeButton className='absolute top-4 right-4'>
        <PlusIcon className='size-8' />
      </AddIncomeButton>
    </>
  );
}
