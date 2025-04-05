import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { IncomeData } from '@/data/types';
import { Incomes } from './incomes';
import { Chart } from './chart';
import { AddIncomeButton } from './add-income-button';
import { create, props } from 'stylex';

export function ExpandedManagerParts({
  incomeData,
}: {
  incomeData: IncomeData;
}) {
  const incomeState = incomeData.state;

  return (
    <>
      <AddIncomeButton {...props(ExpandedManagerPartsStyles.addButton)}>
        <PlusIcon {...props(ExpandedManagerPartsStyles.plusIcon)} />
        Añadir
      </AddIncomeButton>

      <Incomes incomes={incomeData.incomes || []} />

      <Chart incomeState={incomeState} />
    </>
  );
}

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
