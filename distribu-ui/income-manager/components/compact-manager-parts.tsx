import type { IncomeData } from '@/data/types';
import { TertiaryText } from '@/components/tertiary-text';
import { StackedBar } from './stacked-bar';
import { AddIncomeButton } from './add-income-button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Money } from '@/components/money';
import { create, props } from 'stylex';
import { colors } from '../../../stylex/vars.stylex';

type CompactManagerPartsProps = {
  incomeState: IncomeData['state'];
};

export function CompactManagerParts({ incomeState }: CompactManagerPartsProps) {
  return (
    <>
      <Money
        {...props(CompactManagerPartsStyles.money)}
        amount={parseFloat(incomeState.assignable).toString()}
      />
      <TertiaryText {...props(CompactManagerPartsStyles.label)}>
        Ingreso disponible
      </TertiaryText>

      <StackedBar state={incomeState} />

      <AddIncomeButton {...props(CompactManagerPartsStyles.addButton)}>
        <PlusIcon {...props(CompactManagerPartsStyles.plusIcon)} />
      </AddIncomeButton>
    </>
  );
}

const CompactManagerPartsStyles = create({
  money: {
    color: colors.income,
    fontSize: '30px',
    fontWeight: '600',
    display: 'block',
  },
  label: {
    marginBottom: '12px',
  },
  addButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
  plusIcon: {
    width: '32px',
    height: '32px',
  },
});
