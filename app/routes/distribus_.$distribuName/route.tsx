import type { Route } from './+types/route';
import { FundsManager } from './funds-manager';
import { slugToDisplayName } from '@/app/utils/slug';
import { mockFundsData, mockReserves } from '@/data/mockData';
import { ReservesList } from './reserves-list';
import { FundsProvider } from '@/app/contexts/funds-context';

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
    fundsData: mockFundsData,
    reserves: mockReserves,
    distribuName: params.distribuName,
    displayName: slugToDisplayName(params.distribuName),
  };
}

export default function Distribu({ loaderData }: Route.ComponentProps) {
  return (
    <FundsProvider fundsStatus={loaderData.fundsData.status}>
      <ReservesList reserves={loaderData.reserves} />
      <FundsManager fundsData={loaderData.fundsData} />
    </FundsProvider>
  );
}