import { Link } from 'react-router';
import { create, props } from 'stylex';
import { createSlug } from '@/app/utils/slug';

/**
 * DistribusGrid displays a grid of DistribuCard components and a create button.
 *
 * @param distribus - Array of distribus to display
 * @returns Main section with grid of distribus and create button
 */
export function DistribusGrid({ distribus }: DistribusGridProps) {
  return (
    <main {...props(styles.container)}>
      <h1 {...props(styles.title)}>Select Distribu</h1>
      <div {...props(styles.grid)}>
        {distribus.map((distribu) => (
          <DistribuCard
            key={distribu.id}
            distribu={distribu}
          />
        ))}
        <CreateDistribuButton />
      </div>
    </main>
  );
}

/**
 * DistribuCard displays a single distribu as a clickable card.
 *
 * @param distribu - Distribu object
 * @returns Link card for the distribu
 */
function DistribuCard({ distribu }: DistribuCardProps) {
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

/**
 * CreateDistribuButton displays a button to create a new distribu.
 *
 * @returns Button element
 */
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

// Types
export type Distribu = {
  id: number;
  name: string;
  totalAmount: number;
  assignedAmount: number;
  usedAmount: number;
  availableAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

type DistribusGridProps = {
  distribus: Distribu[];
};

type DistribuCardProps = {
  distribu: Distribu;
};

// Styles
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
