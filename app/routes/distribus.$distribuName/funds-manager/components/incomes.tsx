import { useState } from 'react';
import type { Income } from '@/drizzle/types';
import { IndividualIncome } from './individual-income';
import { SearchBar } from '@/app/components/search-bar';
import { create, props as style } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function Incomes({ incomes }: { incomes: Income[] }) {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar
        styling={styles.searchBar}
        query={query}
        onQueryChange={setQuery}
      />
      <IncomeList
        incomes={incomes}
        filter={query}
      />
    </>
  );
}

// TODO: Make the height of the list dynamic, matching the height of the Chart when it's collapsed
export function IncomeList({ incomes, filter }: IncomeListProps) {
  const filteredIncomes = useFilter(incomes, filter);

  if (filteredIncomes.length === 0) {
    return <p {...style(styles.emptyMessage)}>Aún no hay ingresos</p>;
  }

  return (
    <div {...style(styles.list)}>
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

type IncomeListProps = {
  incomes: Income[];
  filter: string;
};

const styles = create({
  searchBar: {
    margin: '4px 8px',
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
  },
});
