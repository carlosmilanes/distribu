import { useState } from 'react';
import type { Income } from '@/data/types';
import { IndividualIncome } from './individual-income';
import { SearchBar } from '@/components/search-bar';
import { create, props } from 'stylex';
import { colors } from '../../../stylex/vars.stylex';

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
        {...props(IncomesStyles.searchBar)}
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
    return <p {...props(IncomesStyles.emptyMessage)}>Aún no hay ingresos</p>;
  }

  return (
    <div {...props(IncomesStyles.list)}>
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

const IncomesStyles = create({
  searchBar: {
    margin: '8px 16px',
  },
  emptyMessage: {
    margin: '24px auto',
    width: 'min-content',
    fontSize: '24px',
    whiteSpace: 'nowrap',
    color: colors.income,
  },
  list: {
    marginTop: '16px',
    height: '100vh',
    overflowY: 'auto',
    border: `2px solid ${colors.alert}`,
  },
});
