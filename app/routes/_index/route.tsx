import type { Route } from './+types/route';
import { FundsManager } from '@/frontend/distribu/funds-manager';
import { mockFundsData } from '@/backend/mockData';
// import { Picture } from '@/distribu/funds-manager/components/picture';

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
      <FundsManager fundsData={mockFundsData} />
    </>
  );
}
