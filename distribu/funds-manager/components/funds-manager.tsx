import type { FundsData } from '../../../backend/types';
import { FloatingManager } from './floating-manager';

export function FundsManager({ fundsData }: { fundsData: FundsData }) {
  // Read from Context and show the FloatingManager on mobile devices and the SidebarManager on desktop
  return <FloatingManager fundsData={fundsData} />;
}
