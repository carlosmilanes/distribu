import { useState } from 'react';
import { Button } from '@/components/core/button';
import { create, props } from 'stylex';
import { colors } from '../../../stylex/vars.stylex';

type AddIncomeButtonProps = {
  children: React.ReactNode;
};

export function AddIncomeButton({
  children,
  ...otherProps
}: AddIncomeButtonProps) {
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  return (
    <Button
      onPress={() => setIsAddingIncome(true)}
      {...props(AddIncomeButtonStyles.base)}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

const AddIncomeButtonStyles = create({
  base: {
    color: colors.income,
  },
});
