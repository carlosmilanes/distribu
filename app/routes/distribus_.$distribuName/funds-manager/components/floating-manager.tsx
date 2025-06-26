import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { FundsData } from '@/data/types';
import { AddIncomeButton } from './add-income-button';
import { StatusBar } from './status-bar';
import { Money } from '@/app/components/money';
import { Incomes } from './incomes';
import { Chart } from './chart';
import { Floater } from './floater';
import { ExpandedFloater } from './expanded-floater';
import { create, props as style } from 'stylex';
import {
  colors,
  dynamicSizes,
  fixedSizes,
  fontSizes,
} from '@/app/styles/vars.stylex';
import { SecondaryText } from '@/app/components/text/secondary-text';

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
      <SecondaryText styling={styles.label}>Ingreso disponible</SecondaryText>

      <Money
        amount={fundsData.status.total - fundsData.status.assigned}
        styling={styles.money}
      />

      <StatusBar status={fundsData.status} />

      <AddIncomeButton styling={styles.iconButton}>
        <PlusIcon {...style(styles.soloIcon)} />
      </AddIncomeButton>
    </Floater>
  );
}

const styles = create({
  money: {
    color: colors.income,
    fontSize: fontSizes.xl,
    fontWeight: '500',
    lineHeight: 1,
    marginTop: fixedSizes.s1,
    marginBottom: fixedSizes.s3,
  },
  label: {
    color: colors.gray2,
  },
  iconButton: {
    position: 'absolute',
    top: '10px',
    right: fixedSizes.s4,
  },
  soloIcon: {
    width: dynamicSizes.m2,
    height: dynamicSizes.m2,
    // strokeWidth: '2',
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
