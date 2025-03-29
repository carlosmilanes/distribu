import { mockIncomeData } from '@/data/mock-income-data';
import { ExpandableContainer } from './components/ExpandableContainer.client';
import { CompactManagerParts } from './components/CompactManagerParts';
import { ExpandedManagerParts } from './components/ExpandedManagerParts';

export default function IncomeManager() {
  // TODO: replace with income data fetcher
  const incomeData = mockIncomeData;

  return (
    <>
      <div>Soy IncomeManager</div>
      <ExpandableContainer
        colapsedManagerParts={
          <CompactManagerParts incomeState={incomeData.state} />
        }
        expandedManagerParts={<ExpandedManagerParts incomeData={incomeData} />}
      />
    </>
  );
}
