import { OptionsProvider } from '@/app/components/options/options-provider';
import { OptionsModal } from '@/app/components/options/options-modal';
import { DeleteOption } from '@/app/components/options/delete-option';
import { Entity } from '@/app/components/core/entity';
import { type Reserve } from '@/data/types';
import { PrimaryText } from '@/app/components/text/primary-text';
import { OptionsButton } from '@/app/components/buttons/options-button';
import { useOptionsContext } from '@/app/components/options/options-provider';
import { useFunds } from '@/app/contexts/funds-context';
import { findBasicPercentage } from '@/app/utils/findBasicPercentage';
import {
  elevation,
  reactiveElevation,
  lightReflection,
} from '@/app/styles/elevations.stylex';
import {
  colors,
  borderRadius,
  fixedSizes,
  dynamicSizes,
  fontSizes,
} from '@/app/styles/vars.stylex';
import { create, props as style } from 'stylex';
import { Money } from '@/app/components/money';
import { Button } from '@/app/components/core/button';
import { subtractMoney } from '@/app/utils/monetary';
import { UseIcon } from '@/app/components/icons';

export function ReservesList({ reserves }: { reserves: Reserve[] }) {
  return (
    <div {...style(styles.reservesList)}>
      {reserves.map((reserve) => (
        <ReserveComponent reserve={reserve} />
      ))}
    </div>
  );
}

function ReserveComponent({ reserve }: { reserve: Reserve }) {
  return (
    <OptionsProvider OptionsModal={ReserveOptions}>
      <ReserveEntity reserve={reserve} />
    </OptionsProvider>
  );
}

function ReserveOptions() {
  return (
    <OptionsModal>
      <DeleteOption onSelect={() => {}} />
    </OptionsModal>
  );
}

function ReserveEntity({ reserve }: { reserve: Reserve }) {
  const { contentRef, optionsRevealed, setOptionsRevealed } =
    useOptionsContext();

  return (
    <Entity
      ref={contentRef}
      onLongPress={() => setOptionsRevealed(true)}
      styleProps={[
        reactiveElevation.low,
        lightReflection.ofColor(colors.secondaryBackground),
        styles.reserve,
      ]}
    >
      <PrimaryText>{reserve.name}</PrimaryText>
      <WeightBar reserve={reserve} />

      <RemainingAmount reserve={reserve} />

      {!optionsRevealed && (
        <OptionsButton
          onPress={() => setOptionsRevealed(true)}
          styleProps={styles.optionsButton}
        />
      )}

      <UseButton />
    </Entity>
  );
}

/**
 * Thin progress bar showing reserve allocation and usage proportions
 *
 * Width represents this reserve's assigned amount as percentage of total assigned funds
 * Shows how much has been used within this reserve's allocation
 *
 * @param reserve - Reserve data including assignedAmount and usedAmount
 */
function WeightBar({ reserve }: { reserve: Reserve }) {
  const funds = useFunds();

  // Bar width is proportional to assigned amount within total assigned funds
  const barWidth = findBasicPercentage(reserve.assignedAmount, funds.assigned);

  // Usage percentage within this reserve's assigned amount
  const usagePercentage = findBasicPercentage(
    reserve.usedAmount,
    reserve.assignedAmount
  );

  return (
    <div {...style(styles.weightBarContainer(barWidth))}>
      {usagePercentage > 0 && (
        <div {...style(styles.usageBar(usagePercentage))} />
      )}
    </div>
  );
}

function RemainingAmount({ reserve }: { reserve: Reserve }) {
  const remainingAmount = subtractMoney(
    reserve.assignedAmount,
    reserve.usedAmount
  );

  return (
    <Money
      amount={remainingAmount}
      styleProps={styles.remainingAmount}
    />
  );
}

function UseButton() {
  return (
    <Button
      onPress={() => {}}
      styleProps={[
        elevation.low,
        lightReflection.ofColor(colors.secondaryBackground),
        styles.useButton,
      ]}
      aria-label="Use reserve"
    >
      <UseIcon {...style(styles.icon)} />
    </Button>
  );
}

const styles = create({
  reservesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: fixedSizes.s3,
  },
  reserve: {
    backgroundColor: colors.secondaryBackground,
    width: fixedSizes.xl1,
    margin: '0 auto',
    borderRadius: borderRadius.l,
    padding: fixedSizes.s3,
  },
  optionsButton: {
    position: 'absolute',
    top: fixedSizes.s3,
    right: fixedSizes.s3,
  },
  weightBarContainer: (width: number) => ({
    backgroundColor: colors.assignedIncome,
    height: '6px',
    width: `${width}%`,
    borderRadius: borderRadius.full,
    position: 'relative',
    marginTop: fixedSizes.s2,
    transition: 'width 300ms ease-in-out',
  }),
  usageBar: (width: number) => ({
    backgroundColor: colors.usedIncome,
    height: '100%',
    width: `${width}%`,
    borderRadius: borderRadius.full,
    transition: 'width 300ms ease-in-out',
    boxShadow: '4px 0 4px rgba(0, 0, 0, 0.1)',
  }),
  remainingAmount: {
    color: colors.assignedIncome,
    fontSize: fontSizes.xl,
    marginTop: fixedSizes.s2,
  },
  useButton: {
    width: fixedSizes.m3,
    height: fixedSizes.m1,

    position: 'absolute',
    bottom: fixedSizes.s3,
    right: fixedSizes.s3,
    backgroundColor: colors.usedIncomeBackground,
    color: colors.usedIncome,
    borderRadius: borderRadius.full,
  },
  icon: {
    width: fixedSizes.s4,
    height: fixedSizes.s4,
    strokeWidth: '3',
  },
});
