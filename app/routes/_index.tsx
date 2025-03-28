import { Outlet } from 'react-router';
import type { Route } from './+types/_index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu UI' },
    { name: 'description', content: 'Working On It' },
  ];
}

export default function DistribuUI() {
  return <Outlet />;
}
