import type { Route } from './+types/distribu-ui';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu UI' },
    { name: 'description', content: 'Working On It' },
  ];
}

export default function DistribuUI() {
  return <div>Distribu UI</div>;
}
