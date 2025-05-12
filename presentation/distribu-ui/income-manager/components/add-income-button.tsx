import { useState } from 'react';
import { Button } from '@/presentation/components/core/button';
import { create, type StyleXStyles } from 'stylex';
import { colors } from '@/presentation/stylex/vars.stylex';

export function AddIncomeButton({
  children,
  styling,
}: AddIncomeButtonProps) {
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  return (
    <Button
      styling={[styles.base, styling]}
      onPress={() => setIsAddingIncome(true)}
    >
      {children}
    </Button>
  );
}

type AddIncomeButtonProps = {
  children: React.ReactNode;
  styling?: StyleXStyles;
};

const styles = create({
  base: {
    color: colors.income,
  },
});
