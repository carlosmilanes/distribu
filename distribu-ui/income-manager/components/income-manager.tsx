import type { IncomeData } from '@/data/types';
import { FloatingManager } from './floating-manager';

export function IncomeManager({ incomeData }: { incomeData: IncomeData }) {
  return <FloatingManager incomeData={incomeData} />;
}
