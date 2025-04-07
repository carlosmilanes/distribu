import type { Route } from './+types/route';
import { mockIncomeData } from '@/data/mock-income-data';
import { IncomeManager } from '@/distribu-ui/income-manager';
import { Picture } from '@/distribu-ui/income-manager/components/picture';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu UI' },
    { name: 'description', content: 'Working On It' },
  ];
}

// TODO: use "loaderData"
export default function Distribu() {
  return (
    <>
      {/* <Picture /> */}
      <IncomeManager incomeData={mockIncomeData} />
    </>
  );
}
