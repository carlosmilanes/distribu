import type { Route } from './+types/route';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribu' },
    { name: 'description', content: 'Financial management made simple' },
  ];
}

export async function loader() {
  // Redirect to distribus hub after authentication
  // TODO: Check authentication status and redirect accordingly
  return redirect('/distribus');
}
