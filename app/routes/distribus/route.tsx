import type { Route } from './+types/route';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { create, props } from 'stylex';
import { createSlug } from '@/app/utils/slug';
import { mockFundsData } from '@/backend/mockData';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Distribus - Select Workspace' },
    { name: 'description', content: 'Select or create a new distribu' },
  ];
}

export const clientLoader = () => {
  // Use mock distribus from mockData if available, else inline
  const mockDistribu = [
    { id: 1, name: 'Family Budget' },
    { id: 2, name: 'Personal Savings' },
    { id: 3, name: 'Emergency Fund' },
  ];
  return { distribus: mockDistribu };
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
    <main {...props(styles.container)}>
      <h1 {...props(styles.title)}>Select Distribu</h1>

      {isLoading ? (
        <div aria-live='polite'>Loading distribus...</div>
      ) : (
        <>
          <DistribusGrid distribus={distribus} />
          <CreateDistribuButton />
        </>
      )}
    </main>
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

function DistribusGrid({ distribus }: { distribus: Distribu[] }) {
  return (
    <div {...props(styles.grid)}>
      {distribus.map((distribu) => (
        <DistribuCard
          key={distribu.id}
          distribu={distribu}
        />
      ))}
    </div>
  );
}

function DistribuCard({ distribu }: { distribu: Distribu }) {
  const handleCardClick = () => {
    // Analytics or additional logic could go here
  };

  return (
    <Link
      to={`/distribus/${createSlug(distribu.name)}`}
      {...props(styles.card)}
      onClick={handleCardClick}
    >
      <h2 {...props(styles.cardTitle)}>{distribu.name}</h2>
      <p {...props(styles.cardDescription)}>
        Manage your {distribu.name.toLowerCase()} finances
      </p>
    </Link>
  );
}

function CreateDistribuButton() {
  const handleCreateClick = () => {
    // TODO: Implement create distribu modal/form
  };

  return (
    <button
      {...props(styles.createButton)}
      onClick={handleCreateClick}
      aria-label='Create new distribu workspace'
    >
      Create New Distribu
    </button>
  );
}

type Distribu = {
  id: number;
  name: string;
};

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
  grid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(2, 1fr)',
      '@media (min-width: 1024px)': 'repeat(3, 1fr)',
    },
  },
  card: {
    display: 'block',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f9fafb',
    },
    ':focus': {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    },
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  createButton: {
    marginTop: '2rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#2563eb',
    },
    ':focus': {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    },
  },
});
