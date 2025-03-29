import { ExpandableContainer } from './expandable-container';
import { CompactManagerParts } from './compact-manager-parts';
import { ExpandedManagerParts } from './expanded-manager-parts';
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
