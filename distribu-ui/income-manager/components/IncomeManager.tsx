import { mockIncomeData } from '@/data/mock-income-data';
import { ExpandableContainer } from './ExpandableContainer.client';
import { CompactManagerParts } from './CompactManagerParts';
import { ExpandedManagerParts } from './ExpandedManagerParts';
import type { IncomeData } from '@/data/types';

export function IncomeManager({ incomeData }: { incomeData: IncomeData }) {
  return (
    <ExpandableContainer
      colapsedManagerParts={
        <CompactManagerParts incomeState={incomeData.state} />
      }
      expandedManagerParts={<ExpandedManagerParts incomeData={incomeData} />}
    />
  );
}
