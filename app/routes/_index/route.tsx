import { Outlet } from 'react-router';
import type { Route } from './+types/route';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu UI' },
    { name: 'description', content: 'Working On It' },
  ];
}

export default function DistribuUI() {
  return (
    <>
      <div>Hola</div>
      <Outlet />
    </>
  );
}
