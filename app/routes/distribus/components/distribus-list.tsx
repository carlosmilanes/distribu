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
  shadows,
} from '@/app/styles/vars.stylex';
import {
  elevation,
  reactiveElevation,
  lightReflection,
} from '@/app/styles/elevations.stylex';
import { SecondaryText } from '@/app/components/text/secondary-text';
import { Heading } from '@/app/components/text/heading';
import { OptionsButton } from '@/app/components/buttons/options-button';
import { OptionsProvider } from '@/app/components/options-provider';

/**
 * DistribusGrid displays a grid of DistribuCard components and a create button.
 *
 * @param distribus - Array of distribus to display
 * @returns Main section with grid of distribus and create button
 */
export function DistribusList({ distribus }: { distribus: Distribu[] }) {
  return (
    <main {...style(styles.base)}>
      <Heading>Distribus</Heading>
      <div {...style(styles.list)}>
        {distribus.map((distribu) => (
          <OptionsProvider
            key={distribu.id}
            options={[]}
          >
            <DistribuContainer
              key={distribu.id}
              distribu={distribu}
            />
          </OptionsProvider>
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
function DistribuContainer({ distribu }: { distribu: Distribu }) {
  return (
    <Link
      to={`/distribus/${createSlug(distribu.name)}`}
      {...style(
        reactiveElevation.low,
        lightReflection.ofColor(colors.secondaryBackground),
        styles.item
      )}
    >
      <PrimaryText styleProps={styles.name}>{distribu.name}</PrimaryText>
      <DistribuStatus distribu={distribu} />
      <OptionsButton styleProps={styles.optionsButton} />
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
    paddingLeft: fixedSizes.l2,
    paddingRight: fixedSizes.l2,
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s3,
    maxWidth: fixedSizes.xl2,
    margin: '0 auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s2,
    padding: fixedSizes.s3,
    backgroundColor: colors.secondaryBackground,
    border: `1px solid ${colors.glassyBorder}`,
    borderRadius: borderRadius.l,
  },
  optionsButton: {
    position: 'absolute',
    top: fixedSizes.s3,
    right: fixedSizes.s3,
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
