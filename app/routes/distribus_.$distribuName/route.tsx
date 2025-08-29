import type { Route } from './+types/route';
import { FundsManager } from './funds-manager';
import { slugToDisplayName } from '@/app/utils/slug';
import { mockFundsData, mockReserves } from '@/data/mockData';
import { ReservesList } from './reserves-list';
import { FundsProvider } from '@/app/contexts/funds-context';
import { DistribuHeader } from './distribu-header';

export function meta({ params }: Route.MetaArgs) {
  const displayName = slugToDisplayName(params.distribuName);
  return [
    { title: `${displayName} - Distribu` },
    {
      name: 'description',
      content: `Managing ${displayName} distribu workspace`,
    },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  return {
    distribuName: params.distribuName,
    displayName: slugToDisplayName(params.distribuName),
    fundsData: mockFundsData,
    reserves: mockReserves,
  };
}

export default function Distribu({ loaderData }: Route.ComponentProps) {
  return (
    <FundsProvider fundsStatus={loaderData.fundsData.status}>
      <DistribuHeader distribuName={loaderData.distribuName} />
      <ReservesList reserves={loaderData.reserves} />
      <FundsManager fundsData={loaderData.fundsData} />
    </FundsProvider>
  );
}