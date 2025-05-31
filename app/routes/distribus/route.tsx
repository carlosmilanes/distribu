import type { Route } from './+types/route';
import { Link, redirect, Form } from 'react-router';
import { useState, useEffect } from 'react';
import { create, props } from 'stylex';
import { createSlug } from '@/app/utils/slug';
import { EmptyHub } from './components/empty-hub';
import { DistribusGrid } from './components/distribus-grid';
import type { Distribu } from './components/distribus-grid';
import { createDistribu } from '@/backend/database/actions/distribus';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribus - Select Workspace' },
    { name: 'description', content: 'Select or create a new distribu' },
  ];
}

/**
 * Action handler for creating a new distribu
 *
 * @param request - Form data containing the distribu name
 * @returns Redirect to the newly created distribu page
 */
export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;

  if (!name || !name.trim()) {
    throw new Error('Distribu name is required');
  }

  try {
    const result = await createDistribu(name.trim());
    const slug = createSlug(name.trim());
    return redirect(`/distribus/${slug}`);
  } catch (error) {
    throw new Error(
      'Failed to create distribu: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export const clientLoader = () => {
  // Use mock distribus from mockData if available, else inline
  // const mockDistribu = [
  //   { id: 1, name: 'Family Budget' },
  //   { id: 2, name: 'Personal Savings' },
  //   { id: 3, name: 'Emergency Fund' },
  // ];
  return { distribus: [] };
};

/**
 * Main distribu selection component that allows users to choose or create workspaces
 *
 * @param loaderData - Contains the list of available distribus from the loader
 * @returns JSX element with distribu selection interface
 */
export default function DistribusHub({ loaderData }: Route.ComponentProps) {
  const { distribus, isLoading, hasError } = useDistribusData(
    loaderData.distribus
  );

  if (hasError) {
    return (
      <div {...props(styles.container)}>
        <h1 {...props(styles.title)}>Error Loading Distribus</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div aria-live='polite'>Loading distribus...</div>
      ) : distribus.length === 0 ? (
        <EmptyHub />
      ) : (
        <DistribusGrid distribus={distribus} />
      )}
    </>
  );
}

/**
 * Custom hook for managing distribu data state and loading states
 *
 * @param initialDistribu - Initial list of distribus from server
 * @returns Object containing distribus array, loading state, and error state
 */
function useDistribusData(initialDistribu: Distribu[]): UseDistribusDataReturn {
  const [distribus, setDistribu] = useState<Distribu[]>(initialDistribu);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when new data is provided
    if (initialDistribu.length > 0) {
      setHasError(false);
      setDistribu(initialDistribu);
    }
  }, [initialDistribu]);

  return {
    distribus,
    isLoading,
    hasError,
  };
}

type UseDistribusDataReturn = {
  distribus: Distribu[];
  isLoading: boolean;
  hasError: boolean;
};

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
