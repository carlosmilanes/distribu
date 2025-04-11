import type { IncomeData } from '@/data/types';
import { FloatingManager } from './floating-manager';

export function IncomeManager({ incomeData }: { incomeData: IncomeData }) {
  // Read from Context and show the FloatingManager on mobile devices and the SidebarManager on desktop
  return <FloatingManager incomeData={incomeData} />;
}
