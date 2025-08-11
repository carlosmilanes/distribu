import type { Route } from './+types/route';
import { redirect } from 'react-router';
import { useState, useEffect } from 'react';
import { create, props } from 'stylex';
import { createSlug } from '@/app/utils/slug';
import { EmptyManager } from './components/empty-manager';
import { DistribusListPage } from './components/distribus-list';
import type { Distribu } from './components/distribus-list';
import {
  createDistribu,
  getDistribus,
} from '@/data/database/queries/distribus';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribus' },
    { name: 'description', content: 'Manage your distribus' },
  ];
}

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;

  if (!name || !name.trim()) {
    throw new Error('Distribu name is required');
  }

  await createDistribu(name.trim());
  const distribuName = createSlug(name.trim());
  return redirect(`/distribus/${distribuName}`);
}

export async function clientLoader() {
  return await getDistribus();
}

/**
 * Main distribu selection component that allows users to choose or create workspaces
 *
 * @param loaderData - Contains the list of available distribus from the loader
 * @returns JSX element with distribu selection interface
 */
export default function DistribusManager({ loaderData: distribus }: Route.ComponentProps) {
  return (
    <>
      {distribus.length === 0 ? (
        <EmptyManager />
      ) : (
        <DistribusListPage distribus={distribus} />
      )}
    </>
  );
}

const styles = create({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#111827',
  },
});
