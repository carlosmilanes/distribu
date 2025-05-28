import type { Route } from './+types/route';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu' },
    { name: 'description', content: 'Financial management made simple' },
  ];
}

export const clientLoader = () => {
  return redirect('/distribus');
};
