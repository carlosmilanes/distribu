import { Link } from 'react-router';
import { create, props as style } from 'stylex';
import { createSlug } from '@/app/utils/slug';
import { PrimaryText } from '@/app/components/text/primary-text';
import { StatusBar } from '@/app/components/status-bar';
import { Money } from '@/app/components/money';
import { TertiaryText } from '@/app/components/text/tertiary-text';
import {
  borderRadius,
  colors,
  fixedSizes,
  fontSizes,
  fontWeights,
} from '@/app/styles/vars.stylex';
import {
  reactiveElevation,
  lightReflection,
} from '@/app/styles/elevations.stylex';
import { SecondaryText } from '@/app/components/text/secondary-text';

/**
 * DistribusGrid displays a grid of DistribuCard components and a create button.
 *
 * @param distribus - Array of distribus to display
 * @returns Main section with grid of distribus and create button
 */
export function DistribusList({ distribus }: { distribus: Distribu[] }) {
  return (
    <main {...style(styles.base)}>
      <PrimaryText>Distribus</PrimaryText>
      <div {...style(styles.list)}>
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
function DistribuCard({ distribu }: { distribu: Distribu }) {
  return (
    <Link
      to={`/distribus/${createSlug(distribu.name)}`}
      {...style(
        reactiveElevation.low,
        lightReflection.ofColor(colors.secondaryBackground),
        styles.card
      )}
    >
      <PrimaryText styleProps={styles.name}>{distribu.name}</PrimaryText>
      <DistribuStatus distribu={distribu} />
    </Link>
  );
}

function DistribuStatus({ distribu }: { distribu: Distribu }) {
  if (distribu.totalAmount === 0) {
    return (
      <div {...style(styles.fundAvailability)}>
        <SecondaryText>No funds yet</SecondaryText>
      </div>
    );
  }

  return (
    <div>
      <FundAvailability distribu={distribu} />
      <StatusBar
        status={{
          total: distribu.totalAmount,
          assigned: distribu.assignedAmount,
          used: distribu.usedAmount,
        }}
      />
    </div>
  );
}

function FundAvailability({ distribu }: { distribu: Distribu }) {
  return (
    <div {...style(styles.fundAvailability)}>
      <SecondaryText>Unassigned from Total</SecondaryText>
      <div {...style(styles.amounts)}>
        <Money
          amount={distribu.availableAmount}
          styleProps={styles.unassigned}
        />
        <div {...style(styles.separator)} />
        <Money
          amount={distribu.totalAmount}
          styleProps={styles.total}
        />
      </div>
    </div>
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
      {...style(styles.createButton)}
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

// Styles
const styles = create({
  base: {
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s3,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s2,
    padding: fixedSizes.s3,
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.l,
  },
  name: {
    color: colors.text,
    marginBottom: fixedSizes.s3,
  },
  fundAvailability: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s1,
  },
  amounts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: fixedSizes.s1,
    fontSize: fontSizes.xl,
  },
  unassigned: {
    color: colors.income,
  },
  total: {
    color: colors.text,
  },
  separator: {
    width: fixedSizes.s1,
    borderRadius: borderRadius.full,
    height: fixedSizes.m1,
    backgroundColor: colors.gray,
    rotate: '15deg',
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
