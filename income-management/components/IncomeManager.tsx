import { mockIncomeData } from "@/data/mock-income-data";
import { ExpandableContainer } from "./ExpandableContainer.client";
import { CompactManagerParts } from "./CompactManagerParts";
import { ExpandedManagerParts } from "./ExpandedManagerParts";

export function IncomeManager() {
  // TODO: replace with income data fetcher
  const incomeData = mockIncomeData;

  return (
    <ExpandableContainer
      colapsedManagerParts={
        <CompactManagerParts incomeState={incomeData.state} />
      }
      expandedManagerParts={<ExpandedManagerParts incomeData={incomeData} />}
    />
  );
}
