'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { IncomeData } from '@/data/types';
import { Incomes } from './Incomes.client';
import { Chart } from './Chart';
import { AddIncomeButton } from './AddIncomeButton.client';

export function ExpandedManagerParts({
  incomeData,
}: {
  incomeData: IncomeData;
}) {
  const incomeState = incomeData.state;

  return (
    <>
      <AddIncomeButton className='absolute top-2 right-12 flex gap-1 px-3 py-1 text-lg'>
        <PlusIcon className='size-6 stroke-2' />
        Añadir
      </AddIncomeButton>

      <Incomes incomes={incomeData.incomes || []} />

      <Chart incomeState={incomeState} />
    </>
  );
}
