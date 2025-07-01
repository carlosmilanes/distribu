import { useState } from 'react';
import { Button } from '@/app/components/core/button';
import { create, type StyleXStyles } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function AddIncomeButton({
  children,
  styleProps,
}: AddIncomeButtonProps) {
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  return (
    <Button
      styleProps={[styles.base, styleProps]}
      onPress={() => setIsAddingIncome(true)}
    >
      {children}
    </Button>
  );
}

type AddIncomeButtonProps = {
  children: React.ReactNode;
  styleProps?: StyleXStyles;
};

const styles = create({
  base: {
    color: colors.income,
  },
});
