import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { FundsData } from '@/data/types';
import { AddIncomeButton } from './add-income-button';
import { StatusBar } from './status-bar';
import { TertiaryText } from '@/components/text/tertiary-text';
import { Money } from '@/components/money';
import { Incomes } from './incomes';
import { Chart } from './chart';
import { Floater } from './floater';
import { ExpandedFloater } from './expanded-floater';
import { create, props as style } from 'stylex';
import { colors, dynamicSizes, fixedSizes } from '@/stylex/vars.stylex';

export function FloatingManager({ fundsData }: { fundsData: FundsData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <ExpandedFloater
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      >
        <AddIncomeButton styling={styles.textIconButton}>
          <PlusIcon {...style(styles.plusIcon)} />
          Añadir
        </AddIncomeButton>

        <Incomes incomes={fundsData.incomes || []} />

        <Chart status={fundsData.status} />
      </ExpandedFloater>
    );
  }

  return (
    <Floater
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    >
      <Money
        amount={fundsData.status.total - fundsData.status.assigned}
        styling={styles.money}
      />
      <TertiaryText styling={styles.label}>Ingreso disponible</TertiaryText>

      <StatusBar status={fundsData.status} />

      <AddIncomeButton styling={styles.iconButton}>
        <PlusIcon {...style(styles.soloIcon)} />
      </AddIncomeButton>
    </Floater>
  );
}

const styles = create({
  money: {
    paddingBottom: '0px',
    color: colors.income,
    fontSize: dynamicSizes.m2,
    fontWeight: '600',
  },
  label: {
    marginTop: dynamicSizes.s2,
    marginBottom: '10px',
    color: colors.text,
  },
  iconButton: {
    position: 'absolute',
    top: '10px',
    right: fixedSizes.s4,
  },
  soloIcon: {
    width: dynamicSizes.m2,
    height: dynamicSizes.m2,
    strokeWidth: '2',
  },
  textIconButton: {
    position: 'absolute',
    top: fixedSizes.s2,
    right: fixedSizes.m3,
    display: 'flex',
    gap: fixedSizes.s1,
    paddingLeft: fixedSizes.s3,
    paddingRight: fixedSizes.s3,
    paddingTop: fixedSizes.s1,
    paddingBottom: fixedSizes.s1,
    fontSize: '18px',
  },
  plusIcon: {
    width: dynamicSizes.m1,
    height: dynamicSizes.m1,
    strokeWidth: '2',
  },
});
