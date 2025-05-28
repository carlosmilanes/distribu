import type { Route } from './+types/route';
import { FundsManager } from './funds-manager';
import { slugToDisplayName } from '@/app/utils/slug';
import { mockFundsData } from '@/backend/mockData';
// import { Picture } from '@/distribu/funds-manager/components/picture';

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

export const clientLoader = ({ params }: Route.LoaderArgs) => {
  return {
    fundsData: mockFundsData,
    distribuName: params.distribuName,
    displayName: slugToDisplayName(params.distribuName),
  };
};

export default function Distribu({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {/* <Picture /> */}
      <FundsManager fundsData={loaderData.fundsData} />
    </>
  );
}
