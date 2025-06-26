import type { FundsData } from '@/data/types';
import { FloatingManager } from './floating-manager';

export function FundsManager({ fundsData }: { fundsData: FundsData }) {
  // TODO: Read from Context and show the FloatingManager on mobile devices and the SidebarManager on desktop
  return <FloatingManager fundsData={fundsData} />;
}
