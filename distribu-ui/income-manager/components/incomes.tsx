'use client';

import { useState } from 'react';
import type { Income } from '@/data/types';
import { IndividualIncome } from './individual-income';
import { SearchBar } from '@/components/search-bar';

type IncomesProps = {
  incomes: Income[];
};

export function Incomes({ incomes }: IncomesProps) {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        className='mx-4 my-2'
      />
      <IncomeList
        incomes={incomes}
        filter={query}
      />
    </>
  );
}

type IncomeListProps = {
  incomes: Income[];
  filter: string;
};

// TODO: Make the height of the list dynamic, matching the height of the Chart when it's collapsed
export function IncomeList({ incomes, filter }: IncomeListProps) {
  const filteredIncomes = useFilter(incomes, filter);

  if (filteredIncomes.length === 0) {
    return (
      <p className='mx-auto my-6 w-min text-2xl whitespace-nowrap text-primary-700'>
        Aún no hay ingresos
      </p>
    );
  }

  return (
    <div className='mt-4 h-screen overflow-y-auto border-2 border-alert-500'>
      {filteredIncomes.map((income) => (
        <IndividualIncome
          key={income.id}
          income={income}
          onUpdate={() => {}}
        />
      ))}
    </div>
  );
}

function useFilter(incomes: Income[], filter: string) {
  const lowercasedFilter = filter.toLowerCase();

  const filteredIncomes = incomes.filter((item) =>
    Object.entries(item).some(([key, value]) => {
      // Exclude 'id', check if value is a string
      if (key !== 'id' && typeof value === 'string') {
        return value.toLowerCase().includes(lowercasedFilter);
      }
      // Check if value is a Date
      else if (value instanceof Date) {
        const day = value.getDate();
        return day.toString() === lowercasedFilter; // Match the day only
      }
      return false; // Return false for non-matching types
    })
  );

  return filteredIncomes;
}
