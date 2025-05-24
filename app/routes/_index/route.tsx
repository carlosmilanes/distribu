import type { Route } from './+types/route';
import { FundsManager } from '@/frontend/distribu/funds-manager';
import { getDistribuFundsData } from '@/backend/database/actions/funds';
// import { Picture } from '@/distribu/funds-manager/components/picture';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu UI' },
    { name: 'description', content: 'Working On It' },
  ];
}

export async function loader() {
  const fundsData = await getDistribuFundsData(1);
  return { fundsData };
}

export default function Distribu({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {/* <Picture /> */}
      <FundsManager fundsData={loaderData.fundsData} />
    </>
  );
}
