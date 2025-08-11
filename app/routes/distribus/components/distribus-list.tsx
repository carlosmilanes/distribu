import { Link } from 'react-router';
import { create, props as style } from 'stylex';
import { createSlug } from '@/app/utils/slug';
import { PrimaryText } from '@/app/components/text/primary-text';
import { StatusBar } from '@/app/components/status-bar';
import { Money } from '@/app/components/money';
import { Entity } from '@/app/components/core/entity';
import {
  borderRadius,
  colors,
  fixedSizes,
  fontSizes,
} from '@/app/styles/vars.stylex';
import {
  reactiveElevation,
  lightReflection,
} from '@/app/styles/elevations.stylex';
import { SecondaryText } from '@/app/components/text/secondary-text';
import { Heading } from '@/app/components/text/heading';
import { OptionsButton } from '@/app/components/buttons/options-button';
import { OptionsProvider } from '@/app/components/options/options-provider';
import { useOptionsContext } from '@/app/components/options/options-provider';
import { useNavigate } from 'react-router';
import { DeleteOption } from '@/app/components/options/delete-option';
import { EditOption } from '@/app/components/options/edit-option';
import { OptionsModal } from '@/app/components/options/options-modal';
import { OptionsSeparator } from '@/app/components/options/options-separator';

/**
 * DistribusList displays a list of DistribuItem components and a create button.
 *
 * @param distribus - Array of distribus to display
 * @returns Main section with list of distribus and create button
 */
export function DistribusList({ distribus }: { distribus: Distribu[] }) {
  return (
    <main {...style(styles.base)}>
      <Heading>Distribus</Heading>
      <div {...style(styles.list)}>
        {distribus.map((distribu) => (
          <OptionsProvider
            key={distribu.id}
            OptionsModal={DistribuOptions}
          >
            <DistribuItem
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
 * DistribuItem displays a single distribu as a clickable item.
 *
 * @param distribu - Distribu object
 * @returns Link item for the distribu
 */
function DistribuItem({ distribu }: { distribu: Distribu }) {
  const navigate = useNavigate();
  const { optionsRevealed, setOptionsRevealed } = useOptionsContext();

  return (
    <Entity
      onPress={() => navigate(`/distribus/${createSlug(distribu.name)}`)}
      onLongPress={() => setOptionsRevealed(true)}
      styleProps={[
        reactiveElevation.low,
        lightReflection.ofColor(colors.secondaryBackground),
        styles.container,
      ]}
    >
      <PrimaryText styleProps={styles.name}>{distribu.name}</PrimaryText>

      <DistribuStatus distribu={distribu} />

      {!optionsRevealed && (
        <OptionsButton
          onPress={() => setOptionsRevealed(true)}
          styleProps={styles.optionsButton}
        />
      )}
    </Entity>
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

function DistribuOptions() {
  return (
    <OptionsModal>
      <EditOption onSelect={() => {}} />
      <OptionsSeparator />
      <DeleteOption onSelect={() => {}} />
    </OptionsModal>
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
      aria-label="Create new distribu workspace"
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s2,
    padding: fixedSizes.s3,
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.l,
    cursor: 'pointer',
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
