import type { Route } from './+types/route';
import { FundsManager } from './funds-manager';
import { getDistribuFundsData } from '@/backend/database/actions/funds';
import { slugToSearchName, slugToDisplayName } from '@/app/utils/slug';
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

export async function loader({ params }: Route.LoaderArgs) {
  const searchName = slugToSearchName(params.distribuName);

  // TODO: Fetch distribu by name and verify user access
  // const distribu = await getDistribuByName(searchName);
  // if (!distribu) throw new Response('Not Found', { status: 404 });

  const fundsData = await getDistribuFundsData(1);
  return {
    fundsData,
    distribuName: params.distribuName,
    displayName: slugToDisplayName(params.distribuName),
  };
}

export default function Distribu({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {/* <Picture /> */}
      <FundsManager fundsData={loaderData.fundsData} />
    </>
  );
}
